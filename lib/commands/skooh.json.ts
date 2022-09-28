import { readFileSync, writeFileSync } from 'fs'
import { Action } from '../action.js'
import { GinCommand } from '../types.js'
import { message } from '../utils.js'

export const skooh: GinCommand = {
  name: 'skooh',
  actions: [
    Action.installDeps(['skooh'], { dev: true }),
    Action.setScript('prepare', 'skooh'),
    {
      description: 'write package.json "hooks" block',
      inputs: [
        {
          flags: '--pre-commit-hook <value>',
          description: 'Set custom pre-commit hook.',
          default: 'npm run format',
        },
      ],
      action: ({ preCommitHook }) => {
        message(`detected git pre-commit hook: ${preCommitHook}`)
        const pkg = JSON.parse(readFileSync('./package.json', 'utf8'))
        pkg.hooks = {
          'pre-commit': preCommitHook,
        }
        const newPkg = JSON.stringify(pkg, null, 2)
        writeFileSync('./package.json', `${newPkg}\n`)
      },
    },
  ],
}
