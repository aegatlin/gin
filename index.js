#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs';
import { argv } from 'node:process';
function gin() {
    const command = argv[2];
    if (command && command == 'barrel') {
        const barrelName = argv[3];
        if (barrelName) {
            buildBarrel(barrelName);
        }
    }
}
function buildBarrel(name) {
    mkdirSync(name);
    writeFileSync(`${name}/index.ts`, `import { ${name} } from './${name}'

export default ${name}
`);
    writeFileSync(`${name}/${name}.tsx`, `interface ${name}Props {}

export function ${name}(props: ${name}Props) {
  return <div>${name}</div>
}
`);
}
gin();
