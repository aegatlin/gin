import { Action, ActionDictionary, Actions } from '../action.js'
import { GinCommand } from '../types.js'
import { refPath } from '../utils.js'
import { react } from './react.json.js'

const initCommand = {
  name: 'init',
  actions: [
    ActionDictionary.shellScript.npmInitY,
    Action.setScript('dev', 'next dev'),
    Action.setScript('build', 'next build'),
    Action.setScript('start', 'next start'),
    Action.setScript('lint', 'next lint'),
    Action.installDeps(['next', 'react', 'react-dom']),
    Action.installDeps(['typescript', '@types/node', '@types/react'], {
      dev: true,
    }),
    Action.writeFile('./.gitignore', refPath('next/init/git-ignore')),
    Action.writeFile('./pages/index.tsx', refPath('next/init/pages-index.tsx')),
    ...Actions.fromCommand(react, { subCommand: 'core' }),
  ],
}

const tailwindCommand = {
  name: 'tailwind',
  actions: [
    Action.installDeps(
      ['tailwindcss', 'postcss', 'autoprefixer', 'prettier-plugin-tailwindcss'],
      {
        dev: true,
      }
    ),
    Action.writeFile(
      './postcss.config.js',
      refPath('next/tailwind/postcss.config.js')
    ),
    Action.writeFile(
      './tailwind.config.js',
      refPath('next/tailwind/tailwind-config.js')
    ),
    Action.writeFile(
      './src/styles.css',
      refPath('next/tailwind/src-styles.css')
    ),
    Action.writeFile(
      './pages/_app.tsx',
      refPath('next/tailwind/pages-_app.tsx')
    ),
  ],
}

export const next: GinCommand = {
  name: 'next',
  description: 'Nextjs generators.',
  subCommands: [
    {
      name: 'bootstrap',
      actions: [
        ...Actions.fromCommand(initCommand),
        ...Actions.fromCommand(tailwindCommand),
        Action.writeFile(
          './pages/index.tsx',
          refPath('next/bootstrap/pages-index.tsx')
        ),
        ...Actions.fromCommand(react, { subCommand: 'core' }),
      ],
    },
    initCommand,
    tailwindCommand,
  ],
}
