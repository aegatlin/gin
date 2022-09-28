import { mkdirSync, writeFileSync } from 'fs'
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { parse } from 'path'
import { GinAction, GinCommand, GinInput } from './types.js'

export const Action = {
  installDeps(
    names: string[],
    opts?: { dev?: boolean; global?: boolean }
  ): GinAction {
    let d = 'install '
    d += opts?.dev ? 'dev ' : ''
    d += opts?.global ? 'global ' : ''
    d += names.length > 1 ? 'dependencies: ' : 'dependency: '
    d += names.join(' ')
    d += '.'

    return {
      description: d,
      action: () => {
        let install = 'i'
        if (opts?.dev) install += ' -D'
        if (opts?.global) install += ' -g'

        execSync(`npm ${install} ${names.join(' ')}`)
      },
    }
  },
  writeFile(filePath: string, referenceFilePath: string): GinAction {
    return {
      description: `Write file: "${filePath}".`,
      action: () => {
        const { dir } = parse(filePath)
        mkdirSync(dir, { recursive: true })
        writeFileSync(filePath, readFileSync(referenceFilePath))
      },
    }
  },
  writeFileWithInput(
    {
      inputKey,
      input,
    }: {
      inputKey: string
      input: GinInput
    },
    referenceFilePath: string
  ): GinAction {
    return {
      description: `Write file based on "${input.flags}". Defaults to: "${input.default}".`,
      inputs: [input],
      action: (options) => {
        const filePath = options[inputKey]
        const { dir } = parse(filePath)
        mkdirSync(dir, { recursive: true })
        writeFileSync(filePath, readFileSync(referenceFilePath))
      },
    }
  },
  setScript(scriptName: string, scriptValue: string): GinAction {
    return {
      description: `Write package.json script: "${scriptName}".`,
      action: () => {
        execSync(`npm set-script "${scriptName}" "${scriptValue}"`)
      },
    }
  },
  setScriptWithInput(
    scriptName: string,
    { inputKey, input }: { inputKey: string; input: GinInput }
  ): GinAction {
    return {
      description: `Write package.json script: "${scriptName}".`,
      inputs: [input],
      action: (options) => {
        const scriptValue = options[inputKey]
        execSync(`npm set-script "${scriptName}" "${scriptValue}"`)
      },
    }
  },
}

export const Actions = {
  fromCommand: (
    command: GinCommand,
    opts?: { subCommand?: string }
  ): GinAction[] => {
    if (!opts?.subCommand) {
      return command.actions
    } else {
      return command.subCommands.find((c) => c.name == opts.subCommand).actions
    }
  },
}
