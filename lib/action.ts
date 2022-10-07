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
    let d = 'Install '
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
      description: _SubActionDictionary.setScriptDescription({ scriptName }),
      action: () => {
        _SubActionDictionary.setScript({ scriptName, scriptValue })
      },
    }
  },
  setScriptWithInput(
    scriptName: string,
    { inputKey, input }: { inputKey: string; input: GinInput }
  ): GinAction {
    return {
      description: _SubActionDictionary.setScriptDescription({ scriptName }),
      inputs: [input],
      action: (options) => {
        const scriptValue = options[inputKey]
        _SubActionDictionary.setScript({ scriptName, scriptValue })
      },
    }
  },
  execShellScript(shellScript: string): GinAction {
    return {
      description: `Execute shell script: "${shellScript}".`,
      action: () => {
        execSync(shellScript)
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

export const ActionDictionary = {
  shellScript: {
    npmInitY: Action.execShellScript('npm init -y'),
    npmPkgSetTypeModule: Action.execShellScript('npm pkg set type=module'),
    gitInit: Action.execShellScript('git init'),
  },
}

const _SubActionDictionary = {
  setScriptDescription: ({ scriptName }) =>
    `Write package.json script: "${scriptName}".`,
  setScript: ({ scriptName, scriptValue }) =>
    execSync(`npm pkg set scripts."${scriptName}"="${scriptValue}"`),
}
