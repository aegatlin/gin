import { camelCase } from 'change-case'
import { mkfile } from './helpers'
import { GinSpec } from './types'

export function createComponentFile(g: GinSpec, dirname: string) {
  mkfile(dirname, camelCase(g.name), 'tsx', '')
}

function makeCompFileContent(g: GinSpec): string {
  const propInterfaces = Object.keys(g.props)
  const imports = [
    `import { `,
    propInterfaces.join(', '),
    `, MetaProps } from './'`,
    '\n',
  ].join('')

  const builder = [
    `export function builder(props: ${propInterfaces.join(
      ' | '
    )}, metaProps?: MetaProps) {`,
    '',
    '}',
  ].join('')

  return [imports, builder].join('\n')
}
