import { camelCase, pascalCase } from 'change-case'
import {
  mkfile,
  sFunction,
  sImports,
  sReactComponent,
  sSwitchCase,
} from './helpers'
import { GinSpec, Param } from './types'

export function createComponentFile(g: GinSpec, dirname: string) {
  mkfile(dirname, camelCase(g.name), 'tsx', content(g))
}

function content(g: GinSpec): string {
  if (g.metaProps) {
    const imports = sImports([
      ['index', [...Object.keys(g.props), 'MetaProps']],
    ])
    return [imports, sBuilder(g)].join('\n\n')
  } else {
    const imports = sImports([
      ['index', [...Object.keys(g.props)]],
    ])
    return [imports, sVariants(g)].join('\n\n')
  }
}

function sVariants(g: GinSpec): string {
  return Object.entries(g.variants)
    .map(([variantName, variantThings]) =>
      sReactComponent(pascalCase(variantName), [['props', variantThings.props]])
    )
    .join('\n')
}

function sBuilder(g: GinSpec) {
  const propInterfaces = Object.keys(g.props)
  const params: Param[] = [
    ['props', `${propInterfaces.join(' | ')}`],
    ['metaProps', 'MetaProps'],
  ]
  const builderContent = sSwitchCase('metaProps.type', [['One', 'hey']])
  return sFunction('builder', params, '', { shouldExport: true })
}
