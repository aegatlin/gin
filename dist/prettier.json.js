import { Action } from './action.js';
import { refPath } from './utils.js';
export const prettier = {
    name: 'prettier',
    options: [
        {
            flags: '--format-script <value>',
            description: 'Set the format script',
            default: 'prettier --write .',
        },
    ],
    actions: [
        Action.installDeps(['prettier'], { dev: true }),
        Action.writeFile('./.prettierrc', {
            referenceFilePath: refPath('prettier/.prettierrc'),
        }),
        Action.setScript('format', {
            optionName: 'formatScript',
            defaultScript: 'prettier --write .',
        }),
    ],
};
