#!/usr/bin/env node

import { Option, program } from 'commander'
import { commands, message } from './commands.js'

function commanderJsAdapter(command, data) {
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

program.name('gin').description('A code generator')

commands.forEach((commandData) => {
  const programCommand = program.command(commandData.name)
  commanderJsAdapter(programCommand, commandData)
})

program.parse()
