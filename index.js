#!/usr/bin/env node

import { program } from 'commander'
import { exec } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

program.name('gin').description('A code generator')

program
  .command('prettier')
  .description(
    'installs prettier as a dev dependency, writes .prettierrc file, and writes initial "format" script.'
  )
  .option('--write-path <value>', 'set the write path', '.')
  .action((options) => {
    message('installing prettier...')
    exec('npm i -D prettier')

    message('overwriting .prettierrc...')
    const prettier = JSON.stringify({ semi: false, singleQuote: true }, null, 2)
    writeFileSync('.prettierrc', `${prettier}\n`)

    const writePath = options.writePath
    message(`writing package.json "format" script. Write path: ${writePath}`)
    exec(`npm set-script format "prettier --write ${writePath}"`)

    message('process complete!')
  })

program
  .command('skooh')
  .description(
    'installs skooh as a dev dependency, writes the "prepare": "skooh" script, and writes initial hooks block.'
  )
  .option('--pre-commit <value>', 'pre-commit hook value', 'npm run format')
  .action((options) => {
    message('installing skooh...')
    exec('npm i -D skooh')

    message('writing prepare script to package.json...')
    exec('npm set-script prepare skooh')

    const preCommit = options.preCommit
    message(`writing pre-commit hook to package.json: ${preCommit}...`)
    const pkg = JSON.parse(readFileSync('./package.json'))
    pkg.hooks = {
      'pre-commit': preCommit,
    }
    const newPkg = JSON.stringify(pkg, null, 2)
    writeFileSync('./package.json', `${newPkg}\n`)

    message('process complete!')
  })

program
  .command('next')
  .description(
    'install next, react, react-dom, typescript, @types/node, @types/react.'
  )
  .action(() => {
    message('installing dependencies: next, react, react-dom...')
    exec('npm i next react react-dom')

    message(
      'installing dev dependencies: typescript, @types/node, @types/react...'
    )
    exec('npm i -D typescript @types/node @types/react')
  })

program.parse()

function message(msg) {
  console.log(`\ngin: ${msg}`)
}
