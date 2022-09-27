import { readFileSync, writeFileSync } from 'fs';
import { Action } from './action.js';
import { message } from './utils.js';
export const skooh = {
    name: 'skooh',
    options: [
        {
            flags: '--pre-commit-hook <value>',
            description: 'pre-commit hook value, e.g., hooks["pre-commit"] = "npm run format"',
            default: 'npm run format',
        },
    ],
    actions: [
        Action.installDeps(['skooh'], { dev: true }),
        Action.setScript('prepare', { defaultScript: 'skooh' }),
        {
            description: 'write package.json "hooks" block',
            action: ({ preCommitHook }) => {
                message(`detected git pre-commit hook: ${preCommitHook}`);
                const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
                pkg.hooks = {
                    'pre-commit': preCommitHook,
                };
                const newPkg = JSON.stringify(pkg, null, 2);
                writeFileSync('./package.json', `${newPkg}\n`);
            },
        },
    ],
};
