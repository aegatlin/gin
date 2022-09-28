import { Action } from '../action.js';
import { refPath } from '../utils.js';
export const vscode = {
    name: 'vscode',
    description: 'VSCode generators.',
    subCommands: [
        {
            name: 'tasks',
            actions: [
                Action.writeFile('./.vscode/tasks.json', refPath('vscode/tasks.json')),
            ],
        },
    ],
};
