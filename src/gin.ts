import { avatar } from './ginspecs/avatar.gin.json'
import { mkdir } from '../src/helpers'
import { GinSpec } from '../src/types'
import { createComponentFile } from './componentFile'
import { createIndexFile } from './indexFile'

export function gin(command: string, commandVal: string) {
  if (command == 'barrel') {
    const barrelName = commandVal
    if (barrelName) buildBarrel(avatar)
  }
}

function buildBarrel(g: GinSpec) {
  const dirname = mkdir(g.name)
  createIndexFile(g, dirname)
  createComponentFile(g, dirname)
}
