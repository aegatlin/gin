import { avatar } from './ginspecs/avatar.gin.json'
import { mkdir } from '../src/helpers'
import { GinSpec } from '../src/types'
import { createComponentFile } from './componentFile'
import { createIndexFile } from './indexFile'
import { ginSpecMaker } from './ginspecs/ginspec'

export function gin(command: string, commandVal: string) {
  if (command == 'barrel') {
    const barrelName = commandVal
    const isGinSpec = (name: string) => name.includes('.gin.')
    if (barrelName) {
      if (isGinSpec(barrelName)) {
        buildBarrel(avatar)
      } else {
        const g = ginSpecMaker(barrelName)
        buildBarrel(g)
      }
    }
  }
}

function buildBarrel(g: GinSpec) {
  const dirname = mkdir(g.name)
  createIndexFile(g, dirname)
  createComponentFile(g, dirname)
}
