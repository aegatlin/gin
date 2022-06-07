export type KV = [key: string, value: string]
export type Import = [file: string, objects: string[]]
export type Param = [paramName: string, paramType: string]
export interface Opts {
  shouldExport?: boolean
}

export interface GinSpec {
  name: string
  props: {
    [propsName: string]: {
      [prop: string]: string
    }
  }
  metaProps?: {
    [metaPropsName: string]: string[]
  }
  variants: {
    [variantName: string]: {
      props: string
      metaProps?: string
    }
  }
}
