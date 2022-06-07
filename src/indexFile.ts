import { camelCase, pascalCase } from 'change-case'
import { mkfile, sEnum, sImports, sInterface } from './helpers'
import { GinSpec, Import, KV } from './types'

export function createIndexFile(g: GinSpec, dirname: string) {
  const indexContent = makeIndexFileContent(g)
  mkfile(dirname, 'index', 'ts', indexContent)
}

function makeIndexFileContent(g: GinSpec): string {
  const imports: Import[] = g.metaProps
    ? [[camelCase(g.name), ['builder']]]
    : [[camelCase(g.name), Object.keys(g.variants)]]
  const exprt = `export default ${pascalCase(g.name)}`

  return (
    [sImports(imports), sProps(g), sMetaProps(g), sBarrelComponent(g), exprt]
      .filter((x) => !!x)
      .join('\n\n') + '\n'
  )
}

function sProps(g: GinSpec): string {
  return Object.entries(g.props)
    .map(([name, props]): [string, [string, string][]] => [
      name,
      Object.entries(props),
    ])
    .map(([name, entries]) => sInterface(name, entries))
    .join('\n\n')
}

function sMetaProps(g: GinSpec): string {
  if (!g.metaProps) return

  const enums = Object.entries(g.metaProps)
    .map(([name, values]) => sEnum(name, values))
    .join('\n')

  const name = 'MetaProps'
  const entries: KV[] = Object.keys(g.metaProps).map((k) => [
    camelCase(k),
    pascalCase(k),
  ])
  const iface = sInterface(name, entries)

  return enums + '\n\n' + iface
}

function sBarrelComponent(g: GinSpec): string {
  const name = pascalCase(g.name)
  if (g.metaProps) {
    return [
      `const ${name} = {`,
      ...Object.entries(g.variants).map(([vName, { props, metaProps }]) => {
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
      }),
      '}',
    ].join('\n')
  } else {
    return [
      `const ${name} = {`,
      ...Object.keys(g.variants).map((v) => `  ${v},`),
      `}`,
    ].join('\n')
  }
}
