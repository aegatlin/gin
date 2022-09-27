import { mkdirSync, writeFileSync } from 'fs';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { parse } from 'path';
export const Action = {
    installDeps: (names, opts) => {
        return {
            description: `install${(opts === null || opts === void 0 ? void 0 : opts.dev) ? ' dev' : (opts === null || opts === void 0 ? void 0 : opts.global) ? ' global' : ''} ${names.length > 1 ? 'dependencies' : 'dependency'}: ${names.join(' ')}`,
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
    writeFile: (defaultFilePath, { optionName, referenceFilePath, }) => {
        return {
            description: `write default file: ${defaultFilePath}`,
            action: (options) => {
                let filePath = options[optionName] || defaultFilePath;
                const { dir } = parse(filePath);
                mkdirSync(dir, { recursive: true });
                writeFileSync(filePath, readFileSync(referenceFilePath));
            },
        };
    },
    setScript: (scriptName, { optionName, defaultScript, }) => {
        return {
            description: `write npm script: ${scriptName}${defaultScript ? `: ${defaultScript}` : ''}`,
            action: (options) => {
                const script = options[optionName] || defaultScript || '';
                execSync(`npm set-script "${scriptName}" "${script}"`);
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
