#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs';
import { argv } from 'node:process';
import { camelCase, pascalCase } from 'change-case';
function gin() {
    const command = argv[2];
    if (command && command == 'barrel') {
        const barrelName = argv[3];
        if (barrelName) {
            buildBarrel(barrelName);
        }
    }
}
const indexTsFile = (name) => {
    const cName = pascalCase(name);
    const fName = camelCase(name);
    const content = `import { ${cName} } from './${fName}'

export default ${cName}
`;
    writeFileSync(`${fName}/index.ts`, content);
};
const componentTsxFile = (name) => {
    const fName = camelCase(name);
    const cName = pascalCase(name);
    const pName = `${pascalCase(name)}Props`;
    const content = `interface ${pName} {
  
}

export function ${cName}(props: ${pName}) {
  return <div>${name}</div>
}
`;
    writeFileSync(`${fName}/${fName}.tsx`, content);
};
function buildBarrel(name) {
    mkdirSync(camelCase(name));
    indexTsFile(name);
    componentTsxFile(name);
}
gin();
