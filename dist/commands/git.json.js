import { execSync } from 'child_process';
export const git = {
    name: 'git',
    description: 'Git generators.',
    subCommands: [
        {
            name: 'init',
            actions: [
                {
                    description: 'mkdir and initialize empty git',
                    inputs: [
                        { flags: '--name <value>', description: 'name of directory' },
                    ],
                    action: ({ name }) => {
                        execSync(`mkdir ${name} && cd ${name} && git init`);
                    },
                },
            ],
        },
    ],
};
