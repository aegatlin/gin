import { execSync } from 'child_process'
import { Action } from './action.js'
import { GinAction, GinCommand } from './types.js'

const reportAction: GinAction = {
  description: 'Report current global gin version',
  action: () => {
    const outBuffer = execSync('npm ls -g --depth 0 | grep @aegatlin/gin')
    console.log(outBuffer.toString('utf8'))
  },
}

export const up: GinCommand = {
  name: 'up',
  actions: [
    reportAction,
    Action.installDeps(['@aegatlin/gin@latest'], { global: true }),
    reportAction,
  ],
}
