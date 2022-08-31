#!/usr/bin/env node

import { program } from 'commander'
import { exec } from 'node:child_process'
import { writeFileSync } from 'node:fs'

program.name('gin').description('A code generator')

program
  .command('prettier')
  .description(
    'install prettier as a dev dependency and create .prettierrc file'
  )
  .action(() => {
    message('installing prettier...')
    exec('npm i -D prettier')

    message('overwriting .prettierrc...')
    const prettier = JSON.stringify({ semi: false, singleQuote: true }, null, 2)
    writeFileSync('.prettierrc', `${prettier}\n`)

    message('process complete!')
  })

program.parse()

function message(msg) {
  console.log(`\ngin: ${msg}...`)
}
