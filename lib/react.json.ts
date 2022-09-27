import { Action } from './action.js'
import { GinCommand } from './types.js'
import { refPath } from './utils.js'

export const react: GinCommand = {
  name: 'react',
  description:
    'React code generator. All code assumes TypeScript and Tailwind.',
  subCommands: [
    {
      name: 'core',
      actions: [
        Action.writeFile('./src/core/Card.tsx', {
          referenceFilePath: refPath('react/core/Card.tsx'),
        }),
        Action.writeFile('./src/core/Header.tsx', {
          referenceFilePath: refPath('react/core/Header.tsx'),
        }),
        Action.writeFile('./src/core/Page.tsx', {
          referenceFilePath: refPath('react/core/Page.tsx'),
        }),
      ],
    },
    {
      name: 'card',
      options: [
        {
          flags: '--path <value>',
          description:
            'path to file (including name, e.g., ./custom/path/my-card.tsx',
          default: './src/core/Card.tsx',
        },
      ],
      actions: [
        Action.writeFile('./src/core/Card.tsx', {
          referenceFilePath: refPath('react/core/Card.tsx'),
          optionName: 'path',
        }),
      ],
    },
    {
      name: 'page',
      options: [
        {
          flags: '--path <value>',
          description:
            'path to file (including name, e.g., ./custom/path/my-page.tsx',
          default: './src/core/Page.tsx',
        },
      ],
      actions: [
        Action.writeFile('./src/core/Page.tsx', {
          referenceFilePath: refPath('react/core/Page.tsx'),
          optionName: 'path',
        }),
      ],
    },
  ],
}
