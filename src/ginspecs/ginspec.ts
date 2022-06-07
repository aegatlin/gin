import { pascalCase } from 'change-case'
import { GinSpec } from '../types'

export function ginSpecMaker(name: string): GinSpec {
  const propsName = `${pascalCase(name)}Props`
  return {
    name,
    props: {
      [propsName]: {},
    },
    variants: {
      Main: {
        props: `${propsName}`,
      },
    },
  }
}
