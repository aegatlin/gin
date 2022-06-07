import { camelCase } from 'change-case'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { Import, KV, Param } from './types'

interface Opts {
  shouldExport?: boolean
}

export function sInterface(
  name: string,
  entries: KV[],
  { shouldExport = true }: Opts = { shouldExport: true }
): string {
  return [
    `${shouldExport && 'export '}interface ${name} {`,
    ...entries.map(([key, value]) => `  ${key}: ${value}`),
    `}`,
  ].join(entries.length > 0 ? '\n' : '')
}

export function sEnum(
  name: string,
  entries: string[],
  { shouldExport = true }: Opts = { shouldExport: true }
): string {
  return [
    `${shouldExport && 'export '}enum ${name} {`,
    ...entries.map((v) => `  ${v},`),
    `}`,
  ].join('\n')
}

export function sImports(imports: Import[]): string {
  return imports.map((i) => sImport(i)).join('\n')
}

function sImport([file, objects]): string {
  return `import { ${objects.join(', ')} } from './${file}'`
}

export function mkdir(name: string): string {
  const dirname = camelCase(name)
  if (!existsSync(dirname)) mkdirSync(dirname)
  return dirname
}

export function mkfile(
  dirname: string,
  filename: string,
  ext: string,
  content: string
) {
  const dir = camelCase(dirname)
  if (!existsSync(dir)) mkdirSync(dirname)
  writeFileSync(`${dir}/${camelCase(filename)}.${ext}`, content)
}

export function sReactComponent(
  name: string,
  params: Param[],
  opts: Opts = { shouldExport: true }
): string {
  return sFunction(name, params, `return <div>${name}</div>`, opts)
}

export function sFunction(
  name: string,
  params: Param[],
  content: string,
  { shouldExport }: Opts
) {
  const sParams = params.map(([n, t]) => `${n}: ${t}`).join(', ')
  return [
    `${shouldExport ? 'export ' : ''}function ${name}(${sParams}) {`,
    indent(content),
    `}`,
  ].join('\n')
}

export function sSwitchCase(switchOn: string, cases: [string, string][]): string {
  return [
    `switch (${switchOn}) {`,
    cases.map(([name, content]) => `  case (${name}): {\n  ${content}\n}`).join('\n'),
    `}`,
  ].join('\n')
}

function indent(content: string): string {
  return content
    .split('\n')
    .map((c) => `  ${c}`)
    .join('\n')
}
