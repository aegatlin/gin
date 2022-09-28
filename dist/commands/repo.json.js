import { Actions } from '../action.js';
import { github } from './github.json.js';
import { next } from './next.json.js';
import { playwright } from './playwright.json.js';
import { prettier } from './prettier.json.js';
import { skooh } from './skooh.json.js';
import { vscode } from './vscode.json.js';
export const repo = {
    name: 'repo',
    description: 'Repository generators.',
    subCommands: [
        {
            name: 'next',
            description: 'Generate an initial, fully functional nextjs repository.',
            actions: [
                ...Actions.fromCommand(next, { subCommand: 'init' }),
                ...Actions.fromCommand(next, { subCommand: 'tailwind' }),
                ...Actions.fromCommand(prettier),
                ...Actions.fromCommand(playwright),
                ...Actions.fromCommand(github, { subCommand: 'cicd' }),
                ...Actions.fromCommand(vscode, { subCommand: 'tasks' }),
                ...Actions.fromCommand(skooh),
            ],
        },
    ],
};
