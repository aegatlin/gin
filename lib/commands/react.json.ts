import axios from 'axios'
import { writeFileSync } from 'fs'
import { GinCommand } from '../types.js'

export const react: GinCommand = {
  name: 'react',
  description:
    'React generators. Currently, all code assumes TypeScript and Tailwind.',
  subCommands: [
    {
      name: 'core',
      actions: [
        {
          description: 'Fetch core component from aegatlin/core.',
          inputs: [
            {
              flags: '--name <value>',
              description: 'Name of the component you want to clone.',
              default: 'Button',
            },
            {
              flags: '--path <value>',
              description: 'Path you want to write the component to',
              default: './src/core/Button.tsx',
            },
          ],
          action: ({ name, path }) => {
            const urlPath =
              'https://raw.githubusercontent.com/aegatlin/core/main/src/core'
            const url = `${urlPath}/${name}.tsx`
            axios.get(url).then((res) => {
              writeFileSync(path, res.data)
            })
          },
        },
      ],
    },
  ],
}
