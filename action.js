import { mkdirSync, writeFileSync } from 'fs'
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { parse } from 'path'

export const Action = {
  installDeps: (names, opts = {}) => {
    return {
      description: `install ${opts.dev ? 'dev' : opts.global ? 'global' : ''} ${
        names.length > 1 ? 'dependencies' : 'dependency'
      }: ${names.join(' ')}`,
      action: () => {
        let install = 'i'
        if (opts?.dev) install += ' -D'
        if (opts?.global) install += ' -g'

        execSync(`npm ${install} ${names.join(' ')}`)
      },
    }
  },
  writeFile: (filePath, referenceFilePath) => {
    return {
      description: `write default file: ${filePath}`,
      action: ({ path } = { path: filePath }) => {
        const { dir } = parse(path)
        mkdirSync(dir, { recursive: true })
        writeFileSync(path, readFileSync(referenceFilePath))
      },
    }
  },
}
