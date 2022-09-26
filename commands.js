import { writeFileSync } from 'fs'
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'path'
import { Action } from './action.js'

export function message(msg) {
  console.log(`\ngin: ${msg}`)
}

function refPath(filePath) {
  const rootPath = path.dirname(fileURLToPath(import.meta.url))
  return path.join(rootPath, 'ref', filePath)
}

export const commands = [
  {
    name: 'up',
    actions: [Action.installDeps(['@aegatlin/gin@latest'], { global: true })],
  },
  {
    name: 'prettier',
    options: [
      {
        flags: '--write-glob <value>',
        description:
          'Set the glob value of the write call, e.g., prettier --write [glob]',
        default: '.',
      },
    ],
    actions: [
      Action.installDeps(['prettier'], { dev: true }),
      Action.writeFile('./.prettierrc', refPath('prettier/.prettierrc')),
      {
        description: 'write package.json script: "format"',
        action: ({ writeGlob }) => {
          execSync(`npm set-script "format: prettier --write ${writeGlob}"`)
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
      Action.installDeps(['skooh'], { dev: true }),
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
          Action.installDeps(['next', 'react', 'react-dom']),
          Action.installDeps(['typescript', '@types/node', '@types/react'], {
            dev: true,
          }),
          Action.writeFile(
            './pages/index.tsx',
            refPath('next/init/pages-index.tsx')
          ),
        ],
      },
      {
        name: 'tailwind',
        actions: [
          Action.installDeps(['tailwindcss', 'postcss', 'autoprefixer'], {
            dev: true,
          }),
          Action.writeFile(
            './postcss.config.js',
            refPath('next/tailwind/postcss.config.js')
          ),
          Action.writeFile(
            './tailwind.config.js',
            refPath('next/tailwind/tailwind.config.js')
          ),
          Action.writeFile(
            './src/styles.css',
            refPath('next/tailwind/src-styles.css')
          ),
          Action.writeFile(
            './pages/_app.tsx',
            refPath('next/tailwind/pages-_app.tsx')
          ),
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
          Action.writeFile(
            './.vscode/tasks.json',
            refPath('vscode/tasks.json')
          ),
        ],
      },
    ],
  },
  {
    name: 'react',
    description:
      'React code generator. All code assumes TypeScript and Tailwind.',
    subCommands: [
      {
        name: 'core',
        actions: [
          Action.writeFile(
            './components/core/Card.tsx',
            refPath('react/core/Card.tsx')
          ),
          Action.writeFile(
            './components/core/Header.tsx',
            refPath('react/core/Header.tsx')
          ),
          Action.writeFile(
            './components/core/Page.tsx',
            refPath('react/core/Page.tsx')
          ),
        ],
      },
      {
        name: 'card',
        options: [
          {
            flags: '--path <value>',
            description:
              'path to file (including name, e.g., ./custom/path/my-card.tsx',
            default: './components/core/Card.tsx',
          },
        ],
        actions: [
          Action.writeFile(
            './components/core/Card.tsx',
            refPath('react/core/Card.tsx')
          ),
        ],
      },
      {
        name: 'page',
        options: [
          {
            flags: '--path <value>',
            description:
              'path to file (including name, e.g., ./custom/path/my-page.tsx',
            default: './components/core/Page.tsx',
          },
        ],
        actions: [
          Action.writeFile(
            './components/core/Page.tsx',
            refPath('react/core/Page.tsx')
          ),
        ],
      },
    ],
  },
]
