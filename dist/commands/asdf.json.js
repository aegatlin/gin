import { Action } from '../action.js';
export const asdf = {
    name: 'asdf',
    description: 'asdf generators',
    subCommands: [
        {
            name: 'node16',
            actions: [
                Action.execShellScript('asdf install nodejs latest:16'),
                Action.execShellScript('asdf local nodejs latest:16'),
            ],
        },
        {
            name: 'node18',
            actions: [
                Action.execShellScript('asdf install nodejs latest:18'),
                Action.execShellScript('asdf local nodejs latest:18'),
            ],
        },
    ],
};
