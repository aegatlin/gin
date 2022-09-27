import { execSync } from 'child_process'
import { GinCommand } from './types.js'

export const git: GinCommand = {
  name: 'git',
  description: 'git generators',
  subCommands: [
    {
      name: 'init',
      options: [
        {
          flags: '--name <value>',
          description: 'Name of directory',
        },
      ],
      actions: [
        {
          description: 'mkdir and initialize empty git',
          action: ({ name }) => {
            execSync(`mkdir ${name} && cd ${name} && git init`)
          },
        },
      ],
    },
  ],
}
