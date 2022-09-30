import { execSync } from 'child_process'
import { ActionDictionary } from '../action.js'
import { GinCommand } from '../types.js'

export const git: GinCommand = {
  name: 'git',
  description: 'Git generators.',
  subCommands: [
    {
      name: 'init',
      actions: [
        {
          description: 'mkdir and initialize empty git',
          inputs: [
            { flags: '--name <value>', description: 'name of directory' },
          ],
          action: ({ name }) => {
            execSync(`mkdir ${name} && cd ${name}`)
          },
        },
        ActionDictionary.shellScript.gitInit,
      ],
    },
  ],
}
