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
  writeFile: (defaultFilePath, referenceFilePath, optionName) => {
    return {
      description: `write default file: ${defaultFilePath}`,
      action: (options) => {
        let filePath = options[optionName] || defaultFilePath
        const { dir } = parse(filePath)
        mkdirSync(dir, { recursive: true })
        writeFileSync(filePath, readFileSync(referenceFilePath))
      },
    }
  },
  setScript: (scriptName, { optionName, defaultScript }) => {
    return {
      description: `write npm script: ${scriptName}${
        defaultScript ? `: ${defaultScript}` : ''
      }`,
      action: (options) => {
        const script = options[optionName] || defaultScript || ''
        execSync(`npm set-script "${scriptName}" "${script}"`)
      },
    }
  },
}
