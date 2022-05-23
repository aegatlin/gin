import { mkdirSync, writeFileSync } from 'node:fs'
import { argv } from 'node:process'

function gin() {
  const command = argv[2]

  if (command && command == 'gin') {
    const subcommand = argv[3]

    if (subcommand && subcommand == 'barrel') {
      const barrelName = argv[4]

      if (barrelName) {
        mkdirSync(barrelName)
        writeFileSync(
          `${barrelName}/index.ts`,
          `import { ${barrelName} } from './${barrelName}'

export default ${barrelName}
`
        )
        writeFileSync(
          `${barrelName}/${barrelName}.tsx`,
          `interface ${barrelName}Props {}

export function ${barrelName}(props: ${barrelName}Props) {
  return <div>${barrelName}</div>
}
`
        )
      }
    }
  }
}

gin()
