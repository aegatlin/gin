import { camelCase, pascalCase } from 'change-case'
import { mkfile, sEnum, sInterface } from './helpers'
import { GinSpec, KV } from './types'

export function createIndexFile(g: GinSpec, dirname: string) {
  const indexContent = makeIndexFileContent(g)
  mkfile(dirname, 'index', 'ts', indexContent)
}

function makeIndexFileContent(g: GinSpec): string {
  let content = `import { builder } from './${camelCase(g.name)}'\n`
  content += '\n'
  content += sProps(g)
  content += '\n'
  content += sMetaProps(g)
  content += '\n'
  content += sBarrelComponent(g)
  return content
}

function sProps(g: GinSpec): string {
  return Object.entries(g.props)
    .map(([name, props]): [string, [string, string][]] => [
      name,
      Object.entries(props),
    ])
    .map(([name, entries]) => sInterface(name, entries))
    .join('\n')
}

function sMetaProps(g: GinSpec): string {
  const enums = Object.entries(g.metaProps)
    .map(([name, values]) => sEnum(name, values))
    .join('\n')

  const name = 'MetaProps'
  const entries: KV[] = Object.keys(g.metaProps).map((k) => [
    camelCase(k),
    pascalCase(k),
  ])
  const iface = sInterface(name, entries)

  return enums + '\n' + iface
}

function sBarrelComponent(g: GinSpec) {
  const name = pascalCase(g.name)
  return [
    `const ${name} = {`,
    ...Object.entries(g.variants).map(([vName, { props, metaProps }]) => {
      if (!metaProps) return `  ${vName}: (props: ${props}) => builder(props),`
      else {
        const metaPropsKeyName = camelCase(metaProps)
        const subvariants = g.metaProps[metaProps]
        return [
          `  ${vName}: {`,
          ...subvariants.map(
            (subv) =>
              `    ${subv}: (props: ${props}) => builder(props, { ${metaPropsKeyName}: ${metaProps}.${subv} }),`
          ),
          '  },',
        ].join('\n')
      }
    }),
    '}\n',
    `export default ${name}`,
  ].join('\n')
}
