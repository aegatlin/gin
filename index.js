#!/usr/bin/env node

import { program } from 'commander'
import { execSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'path'

let actions = []
program.name('gin').description('A code generator')

actions = [
  'install dev dependency: prettier',
  'write default config file: .prettierrc',
  'write package.json script: "format"',
]
program
  .command('prettier')
  .description(actions.join('; '))
  .option('--write-path <value>', 'set the write path', '.')
  .action((options) => {
    messageAction(actions[0])
    execSync('npm i -D prettier')

    messageAction(actions[1])
    const prettier = JSON.stringify({ semi: false, singleQuote: true }, null, 2)
    writeFileSync('.prettierrc', `${prettier}\n`)

    messageAction(actions[2])
    const writePath = options.writePath
    message(`detected write path: ${writePath}`)
    execSync(`npm set-script format "prettier --write ${writePath}"`)

    message('process complete!')
  })

actions = [
  'install dev dependency: skooh',
  'write package.json script: "prepare"',
  'write package.json "hooks" block',
]
program
  .command('skooh')
  .description(actions.join('; '))
  .option('--pre-commit <value>', 'pre-commit hook value', 'npm run format')
  .action((options) => {
    messageAction(actions[0])
    execSync('npm i -D skooh')

    messageAction(actions[1])
    execSync('npm set-script prepare skooh')

    messageAction(actions[2])
    const preCommit = options.preCommit
    message(`detected git pre-commit hook: ${preCommit}`)
    const pkg = JSON.parse(readFileSync('./package.json'))
    pkg.hooks = {
      'pre-commit': preCommit,
    }
    const newPkg = JSON.stringify(pkg, null, 2)
    writeFileSync('./package.json', `${newPkg}\n`)

    message('process complete!')
  })

const next = program
  .command('next')
  .description('code generators for nextjs applications')

actions = [
  'install dependencies: next, react, react-dom',
  'install dev dependencies: typescript, @types/node, @types/react',
  'write default file: pages/index.tsx',
]
next
  .command('init')
  .description(actions.join('; '))
  .action(() => {
    messageAction(actions[0])
    execSync('npm i next react react-dom')

    messageAction(actions[1])
    execSync('npm i -D typescript @types/node @types/react')

    messageAction(actions[2])
    mkdirSync('./pages', { recursive: true })
    const content = readFileSync(refPath('next.pages.index.tsx'))
    writeFileSync('./pages/index.tsx', content)

    message('process complete!')
  })

actions = [
  'install dev dependencies: tailwindcss, postcss, and autoprefixer',
  'write default config files: postcss.config.js and tailwind.config.js',
  'write default files: src/styles.css and pages/_app.tsx',
]
next
  .command('tailwind')
  .description(actions.join('; '))
  .action(() => {
    messageAction(actions[0])
    execSync('npm i -D tailwindcss postcss autoprefixer')

    messageAction(actions[1])
    const postcssContent = readFileSync(
      refPath('next.tailwind/postcss.config.js')
    )
    const tailwindContent = readFileSync(
      refPath('next.tailwind/tailwind.config.js')
    )
    writeFileSync('./postcss.config.js', postcssContent)
    writeFileSync('./tailwind.config.js', tailwindContent)

    messageAction(actions[2])
    const stylesContent = readFileSync(refPath('next.tailwind/styles.css'))
    const _appContent = readFileSync(refPath('next.tailwind/pages._app.tsx'))
    writeFileSync('./src/styles.css', stylesContent)
    writeFileSync('./pages/_app.tsx', _appContent)

    message('process complete!')
  })

const rootPath = path.dirname(fileURLToPath(import.meta.url))
const refPath = (filePath) => path.join(rootPath, 'ref', filePath)

program.parse()

function message(msg) {
  console.log(`\ngin: ${msg}`)
}

function messageAction(msgAction) {
  message(`action: ${msgAction}...`)
}
