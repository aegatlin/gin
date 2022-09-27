#!/usr/bin/env node

import { program } from 'commander'
import { commanderJsAdapter } from './commanderJsAdapter.js'
import { git } from './git.json.js'
import { github } from './github.json.js'
import { next } from './next.json.js'
import { playwright } from './playwright.json.js'
import { prettier } from './prettier.json.js'
import { react } from './react.json.js'
import { repo } from './repo.json.js'
import { skooh } from './skooh.json.js'
import { up } from './up.json.js'
import { vscode } from './vscode.json.js'

program.name('gin').description('A code generator')

const commands = [
  git,
  github,
  next,
  playwright,
  prettier,
  react,
  repo,
  skooh,
  up,
  vscode,
]

commands.forEach((commandData) => {
  const programCommand = program.command(commandData.name)
  commanderJsAdapter(programCommand, commandData)
})

program.parse()
