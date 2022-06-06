import { camelCase } from 'change-case'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { KV } from './types'

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
    `}\n`,
  ].join('\n')
}

export function sEnum(
  name: string,
  entries: string[],
  { shouldExport = true }: Opts = { shouldExport: true }
): string {
  return [
    `${shouldExport && 'export '}enum ${name} {`,
    ...entries.map((v) => `  ${v},`),
    `}\n`,
  ].join('\n')
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
