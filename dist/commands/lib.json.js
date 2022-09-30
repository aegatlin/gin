import { Action, ActionDictionary, Actions } from '../action.js';
import { refPath } from '../utils.js';
import { asdf } from './asdf.json.js';
import { prettier } from './prettier.json.js';
export const lib = {
    name: 'lib',
    actions: [
        ActionDictionary.shellScript.npmInitY,
        ...Actions.fromCommand(asdf, { subCommand: 'node18' }),
        ...Actions.fromCommand(prettier),
        Action.execShellScript('mkdir lib && touch lib/index.ts'),
        Action.writeFile('./tsconfig.json', refPath('lib/tsconfig.json')),
        Action.writeFile('./.gitignore', refPath('lib/git-ignore')),
        ActionDictionary.shellScript.gitInit,
    ],
};
