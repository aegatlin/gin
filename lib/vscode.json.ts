import { Action } from './action.js'
import { GinCommand } from './types.js'
import { refPath } from './utils.js'

export const vscode: GinCommand = {
  name: 'vscode',
  description: 'code generators for vscode',
  subCommands: [
    {
      name: 'tasks',
      actions: [
        Action.writeFile('./.vscode/tasks.json', {
          referenceFilePath: refPath('vscode/tasks.json'),
        }),
      ],
    },
  ],
}
