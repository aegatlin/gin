import { execSync } from 'child_process';
import { Action } from './action.js';
import { refPath } from './utils.js';
export const github = {
    name: 'github',
    description: 'github generators',
    subCommands: [
        {
            name: 'cicd',
            description: 'Writes a github actions workflow for cicd. Presumes playwright.',
            actions: [
                Action.writeFile('./.github/workflows/cicd.yml', {
                    referenceFilePath: refPath('/github/cicd/cicd.yml'),
                }),
            ],
        },
        {
            name: 'create-repo',
            options: [
                {
                    flags: '--name',
                    description: 'name of the repo',
                },
            ],
            actions: [
                {
                    description: 'Creates a repo via gh. Will create as child of current directory',
                    action: ({ name }) => {
                        execSync(`gh repo create ${name} --public --clone`);
                    },
                },
            ],
        },
    ],
};
