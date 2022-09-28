import { Action } from '../action.js';
import { refPath } from '../utils.js';
export const prettier = {
    name: 'prettier',
    actions: [
        Action.installDeps(['prettier'], { dev: true }),
        Action.writeFile('./.prettierrc', refPath('prettier/.prettierrc')),
        Action.setScriptWithInput('format', {
            inputKey: 'formatScript',
            input: {
                flags: '--format-script <value>',
                description: 'Set custom format script.',
                default: 'prettier --write .',
            },
        }),
    ],
};
