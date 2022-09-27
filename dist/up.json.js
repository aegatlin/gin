import { execSync } from 'child_process';
import { Action } from './action.js';
export const up = {
    name: 'up',
    actions: [
        Action.installDeps(['@aegatlin/gin@latest'], { global: true }),
        {
            description: 'Report global gin version.',
            action: () => {
                const x = execSync('npm ls -g --depth 0 | grep @aegatlin/gin');
                console.log(x.toString('utf8'));
            },
        },
    ],
};
