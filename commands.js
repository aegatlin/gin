import { Option } from 'commander'
import { writeFileSync } from 'fs'
import { execSync } from 'node:child_process'
import { mkdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'path'

const actionBuilder = {
  installDependencies: (names, opts = {}) => {
    return {
      description: `install ${opts.dev ? 'dev' : opts.global ? 'global' : ''} ${
        names.length > 1 ? 'dependencies' : 'dependency'
      }: ${names.join(' ')}`,
      action: () => {
        let install = 'i'
        if (opts?.dev) install += ' -D'
        if (opts?.global) install += ' -g'

        execSync(`npm ${install} ${names.join(' ')}`)
      },
    }
  },
}

export const commands = [
  {
    name: 'up',
    actions: [
      actionBuilder.installDependencies(['@aegatlin/gin'], { global: true }),
    ],
  },
  {
    name: 'prettier',
    options: [
      { flags: '--writePath <value>', description: 'set the write path' },
    ],
    actions: [
      actionBuilder.installDependencies(['prettier'], { dev: true }),
      {
        description: 'write default config file: .prettierrc',
        action: () => {
          const prettierrcContent = JSON.stringify(
            { semi: false, singleQuote: true },
            null,
            2
          )
          writeFileSync('.prettierrc', `${prettierrcContent}\n`)
        },
      },
      {
        description: 'write package.json script: "format"',
        action: ({ writePath }) => {
          execSync(`npm set-script "format: prettier --write ${writePath}"`)
        },
      },
    ],
  },
  {
    name: 'skooh',
    options: [
      {
        flags: '--pre-commit <value>',
        description: 'pre-commit hook value',
        default: 'npm run format',
      },
    ],
    actions: [
      actionBuilder.installDependencies(['skooh'], { dev: true }),
      {
        description: 'npm set-script "prepare: skooh"',
        action: () => {
          execSync(`npm set-script prepare skooh`)
        },
      },
      {
        description: 'write package.json "hooks" block',
        action: ({ preCommit }) => {
          message(`detected git pre-commit hook: ${preCommit}`)
          const pkg = JSON.parse(readFileSync('./package.json'))
          pkg.hooks = {
            'pre-commit': preCommit,
          }
          const newPkg = JSON.stringify(pkg, null, 2)
          writeFileSync('./package.json', `${newPkg}\n`)
        },
      },
    ],
  },
  {
    name: 'next',
    description: 'code generators for nextjs applications',
    subCommands: [
      {
        name: 'init',
        actions: [
          actionBuilder.installDependencies(['next', 'react', 'react-dom']),
          actionBuilder.installDependencies(
            ['typescript', '@types/node', '@types/react'],
            { dev: true }
          ),
          {
            description: 'write default file: pages/index.tsx',
            action: () => {
              mkdirSync('./pages', { recursive: true })
              const content = readFileSync(refPath('next.pages.index.tsx'))
              writeFileSync('./pages/index.tsx', content)
            },
          },
        ],
      },
      {
        name: 'tailwind',
        actions: [
          actionBuilder.installDependencies(
            ['tailwindcss', 'postcss', 'autoprefixer'],
            { dev: true }
          ),
          {
            description:
              'write default config files: postcss.config.js and tailwind.config.js',
            action: () => {
              const postcssContent = readFileSync(
                refPath('next.tailwind/postcss.config.js')
              )
              const tailwindContent = readFileSync(
                refPath('next.tailwind/tailwind.config.js')
              )
              writeFileSync('./postcss.config.js', postcssContent)
              writeFileSync('./tailwind.config.js', tailwindContent)
            },
          },
          {
            description:
              'write default files: src/styles.css and pages/_app.tsx',
            action: () => {
              const stylesContent = readFileSync(
                refPath('next.tailwind/styles.css')
              )
              const _appContent = readFileSync(
                refPath('next.tailwind/pages._app.tsx')
              )
              writeFileSync('./src/styles.css', stylesContent)
              writeFileSync('./pages/_app.tsx', _appContent)
            },
          },
        ],
      },
    ],
  },
  {
    name: 'vscode',
    description: 'code generators for vscode',
    subCommands: [
      {
        name: 'tasks',
        options: [],
        actions: [
          {
            description: 'write .vscode/tasks.json file',
            action: () => {
              const tasksContent = readFileSync(refPath('vscode/tasks.json'))
              mkdirSync('./.vscode', { recursive: true })
              writeFileSync('./.vscode/tasks.json', tasksContent)
            },
          },
        ],
      },
    ],
  },
]

export function commanderJsAdapter(command, data) {
  const { name, description, subCommands } = data

  if (subCommands) {
    subCommands.forEach((subCommand) => {
      const subC = command.command(subCommand.name)
      commanderJsAdapter(subC, subCommand)
    })
  }

  if (description) {
    command.description(description)
  } else {
    command.description(data.actions.map((a) => a.description).join('\n'))
  }

  if (data.options) {
    data.options.forEach((o) => {
      command.addOption(new Option(o.flags, o.description))
    })
  }

  if (data.actions) {
    command.action((options) => {
      data.actions.forEach((a) => {
        message(`action: ${a.description}`)
        a.action(options)
      })
    })
  }
}

function message(msg) {
  console.log(`\ngin: ${msg}`)
}

const rootPath = path.dirname(fileURLToPath(import.meta.url))
const refPath = (filePath) => path.join(rootPath, 'ref', filePath)
