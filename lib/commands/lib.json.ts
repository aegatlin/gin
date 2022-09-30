import { Action, ActionDictionary, Actions } from '../action.js'
import { GinCommand } from '../types.js'
import { refPath } from '../utils.js'
import { asdf } from './asdf.json.js'
import { prettier } from './prettier.json.js'
import { skooh } from './skooh.json.js'

export const lib: GinCommand = {
  name: 'lib',
  actions: [
    ActionDictionary.shellScript.npmInitY,
    ...Actions.fromCommand(asdf, { subCommand: 'node18' }),
    Action.installDeps(['typescript'], { dev: true }),
    ...Actions.fromCommand(prettier),
    ...Actions.fromCommand(skooh),
    Action.execShellScript('mkdir lib && touch lib/index.ts'),
    Action.writeFile('./tsconfig.json', refPath('lib/tsconfig.json')),
    Action.writeFile('./.gitignore', refPath('lib/git-ignore')),
    ActionDictionary.shellScript.gitInit,
    Action.setScript('ppp', 'npm version patch && git push && npm publish'),
    Action.setScript('build', 'tsc'),
    Action.setScript('watch', 'tsc --watch'),
  ],
}
