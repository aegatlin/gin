import { mkdirSync, writeFileSync } from 'fs';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { parse } from 'path';
export const Action = {
    installDeps(names, opts) {
        let d = 'Install ';
        d += (opts === null || opts === void 0 ? void 0 : opts.dev) ? 'dev ' : '';
        d += (opts === null || opts === void 0 ? void 0 : opts.global) ? 'global ' : '';
        d += names.length > 1 ? 'dependencies: ' : 'dependency: ';
        d += names.join(' ');
        d += '.';
        return {
            description: d,
            action: () => {
                let install = 'i';
                if (opts === null || opts === void 0 ? void 0 : opts.dev)
                    install += ' -D';
                if (opts === null || opts === void 0 ? void 0 : opts.global)
                    install += ' -g';
                execSync(`npm ${install} ${names.join(' ')}`);
            },
        };
    },
    writeFile(filePath, referenceFilePath) {
        return {
            description: `Write file: "${filePath}".`,
            action: () => {
                const { dir } = parse(filePath);
                mkdirSync(dir, { recursive: true });
                writeFileSync(filePath, readFileSync(referenceFilePath));
            },
        };
    },
    writeFileWithInput({ inputKey, input, }, referenceFilePath) {
        return {
            description: `Write file based on "${input.flags}". Defaults to: "${input.default}".`,
            inputs: [input],
            action: (options) => {
                const filePath = options[inputKey];
                const { dir } = parse(filePath);
                mkdirSync(dir, { recursive: true });
                writeFileSync(filePath, readFileSync(referenceFilePath));
            },
        };
    },
    setScript(scriptName, scriptValue) {
        return {
            description: _SubActionDictionary.setScriptDescription({ scriptName }),
            action: () => {
                _SubActionDictionary.setScript({ scriptName, scriptValue });
            },
        };
    },
    setScriptWithInput(scriptName, { inputKey, input }) {
        return {
            description: _SubActionDictionary.setScriptDescription({ scriptName }),
            inputs: [input],
            action: (options) => {
                const scriptValue = options[inputKey];
                _SubActionDictionary.setScript({ scriptName, scriptValue });
            },
        };
    },
    execShellScript(shellScript) {
        return {
            description: `Execute shell script: "${shellScript}".`,
            action: () => {
                execSync(shellScript);
            },
        };
    },
};
export const Actions = {
    fromCommand: (command, opts) => {
        if (!(opts === null || opts === void 0 ? void 0 : opts.subCommand)) {
            return command.actions;
        }
        else {
            return command.subCommands.find((c) => c.name == opts.subCommand).actions;
        }
    },
};
export const ActionDictionary = {
    shellScript: {
        npmInitY: Action.execShellScript('npm init -y'),
        npmPkgSetTypeModule: Action.execShellScript('npm pkg set type=module'),
        gitInit: Action.execShellScript('git init'),
    },
};
const _SubActionDictionary = {
    setScriptDescription: ({ scriptName }) => `Write package.json script: "${scriptName}".`,
    setScript: ({ scriptName, scriptValue }) => execSync(`npm pkg set scripts."${scriptName}"="${scriptValue}"`),
};
