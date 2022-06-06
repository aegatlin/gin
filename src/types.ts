export type KV = [key: string, value: string]

export interface GinSpec {
  name: string
  props: {
    [propsName: string]: {
      [prop: string]: string
    }
  }
  metaProps: {
    [metaPropsName: string]: string[]
  }
  variants: {
    [variantName: string]: {
      props: string
      metaProps?: string
    }
  }
}
