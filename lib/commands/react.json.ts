import { Action } from '../action.js'
import { GinCommand } from '../types.js'
import { refPath } from '../utils.js'

const cardAction = Action.writeFileWithInput(
  {
    inputKey: 'cardPath',
    input: {
      flags: '--card-path',
      description: 'Path for Card.tsx',
      default: './src/core/Card.tsx',
    },
  },
  refPath('react/core/Card.tsx')
)

const pageAction = Action.writeFileWithInput(
  {
    inputKey: 'pagePath',
    input: {
      flags: '--page-path',
      description: 'Path for Page.tsx',
      default: './src/core/Page.tsx',
    },
  },
  refPath('react/core/Page.tsx')
)

const headerAction = Action.writeFileWithInput(
  {
    inputKey: 'headerPath',
    input: {
      flags: '--header-path',
      description: 'Path for Header.tsx',
      default: './src/core/Header.tsx',
    },
  },
  refPath('react/core/Header.tsx')
)

export const react: GinCommand = {
  name: 'react',
  description:
    'React generators. Currently, all code assumes TypeScript and Tailwind.',
  subCommands: [
    {
      name: 'core',
      actions: [cardAction, headerAction, pageAction],
    },
    {
      name: 'card',
      actions: [cardAction],
    },
    {
      name: 'page',
      actions: [pageAction],
    },
    {
      name: 'header',
      actions: [headerAction],
    },
  ],
}
