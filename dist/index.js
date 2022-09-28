#!/usr/bin/env node
import { program } from 'commander';
import { commanderJsAdapter } from './commanderJsAdapter.js';
import { git } from './commands/git.json.js';
import { github } from './commands/github.json.js';
import { next } from './commands/next.json.js';
import { playwright } from './commands/playwright.json.js';
import { prettier } from './commands/prettier.json.js';
import { react } from './commands/react.json.js';
import { repo } from './commands/repo.json.js';
import { skooh } from './commands/skooh.json.js';
import { up } from './commands/up.json.js';
import { vscode } from './commands/vscode.json.js';
const commands = [
    git,
    github,
    next,
    playwright,
    prettier,
    react,
    repo,
    skooh,
    up,
    vscode,
];
commanderJsAdapter(program, commands);
