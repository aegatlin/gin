import { Action } from './action.js';
import { refPath } from './utils.js';
export const next = {
    name: 'next',
    description: 'code generators for nextjs applications',
    subCommands: [
        {
            name: 'init',
            actions: [
                Action.installDeps(['next', 'react', 'react-dom']),
                Action.installDeps(['typescript', '@types/node', '@types/react'], {
                    dev: true,
                }),
                Action.writeFile('./pages/index.tsx', {
                    referenceFilePath: refPath('next/init/pages-index.tsx'),
                }),
                Action.setScript('dev', { defaultScript: 'next dev' }),
                Action.setScript('build', { defaultScript: 'next build' }),
                Action.setScript('start', { defaultScript: 'next start' }),
            ],
        },
        {
            name: 'tailwind',
            actions: [
                Action.installDeps(['tailwindcss', 'postcss', 'autoprefixer'], {
                    dev: true,
                }),
                Action.writeFile('./postcss.config.js', {
                    referenceFilePath: refPath('next/tailwind/postcss.config.js'),
                }),
                Action.writeFile('./tailwind.config.js', {
                    referenceFilePath: refPath('next/tailwind/tailwind-config.js'),
                }),
                Action.writeFile('./src/styles.css', {
                    referenceFilePath: refPath('next/tailwind/src-styles.css'),
                }),
                Action.writeFile('./pages/_app.tsx', {
                    referenceFilePath: refPath('next/tailwind/pages-_app.tsx'),
                }),
            ],
        },
    ],
};
