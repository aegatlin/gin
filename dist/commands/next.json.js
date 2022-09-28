import { Action, Actions } from '../action.js';
import { react } from './react.json.js';
import { refPath } from '../utils.js';
export const next = {
    name: 'next',
    description: 'Nextjs generators.',
    subCommands: [
        {
            name: 'init',
            actions: [
                Action.setScript('dev', 'next dev'),
                Action.setScript('build', 'next build'),
                Action.setScript('start', 'next start'),
                Action.installDeps(['next', 'react', 'react-dom']),
                Action.installDeps(['typescript', '@types/node', '@types/react'], {
                    dev: true,
                }),
                Action.writeFile('./.gitignore', refPath('next/init/git-ignore')),
                Action.writeFile('./pages/index.tsx', refPath('next/init/pages-index.tsx')),
                ...Actions.fromCommand(react, { subCommand: 'core' }),
            ],
        },
        {
            name: 'tailwind',
            actions: [
                Action.installDeps(['tailwindcss', 'postcss', 'autoprefixer'], {
                    dev: true,
                }),
                Action.writeFile('./postcss.config.js', refPath('next/tailwind/postcss.config.js')),
                Action.writeFile('./tailwind.config.js', refPath('next/tailwind/tailwind-config.js')),
                Action.writeFile('./src/styles.css', refPath('next/tailwind/src-styles.css')),
                Action.writeFile('./pages/_app.tsx', refPath('next/tailwind/pages-_app.tsx')),
            ],
        },
    ],
};
