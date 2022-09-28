import { execSync } from 'child_process'
import { Action } from '../action.js'
import { GinCommand } from '../types.js'
import { refPath } from '../utils.js'

export const github: GinCommand = {
  name: 'github',
  description: 'Github generators.',
  subCommands: [
    {
      name: 'cicd',
      description:
        'Write a github actions workflow for cicd. Presumes playwright.',
      actions: [
        Action.writeFile(
          './.github/workflows/cicd.yml',
          refPath('/github/cicd/cicd.yml')
        ),
      ],
    },
    {
      name: 'create-repo',
      actions: [
        {
          description:
            'Creates a repo via gh. Will create as child of current directory',
          inputs: [
            {
              flags: '--name',
              description: 'name of the repo',
            },
          ],
          action: ({ name }) => {
            execSync(`gh repo create ${name} --public --clone`)
          },
        },
      ],
    },
  ],
}
