import { Action, ActionDictionary, Actions } from '../action.js';
import { refPath } from '../utils.js';
import { asdf } from './asdf.json.js';
import { prettier } from './prettier.json.js';
import { skooh } from './skooh.json.js';
export const lib = {
    name: 'lib',
    actions: [
        ActionDictionary.shellScript.npmInitY,
        ...Actions.fromCommand(asdf, { subCommand: 'node18' }),
        Action.installDeps(['typescript'], { dev: true }),
        ...Actions.fromCommand(prettier),
        ...Actions.fromCommand(skooh),
        Action.execShellScript('mkdir lib'),
        Action.execShellScript('touch lib/index.ts'),
        Action.writeFile('./tsconfig.json', refPath('lib/tsconfig.json')),
        Action.writeFile('./.gitignore', refPath('lib/git-ignore')),
        ActionDictionary.shellScript.gitInit,
        Action.setScript('ppp', 'npm version patch && git push && npm publish'),
        Action.setScript('build', 'tsc'),
        Action.setScript('watch', 'tsc --watch'),
        Action.setScript('test', 'node --test'),
        Action.execShellScript('touch test.js'),
    ],
};
