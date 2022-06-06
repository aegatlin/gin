import { GinSpec } from '../types'

export const avatar: GinSpec = {
  name: 'Avatar',
  props: {
    TextProps: {
      text: 'string',
    },
    ImageProps: {
      imgSrc: 'string',
    },
  },
  metaProps: {
    Size: ['Large', 'Small'],
  },
  variants: {
    Text: {
      props: 'TextProps',
      metaProps: 'Size',
    },
    Image: {
      props: 'ImageProps',
      metaProps: 'Size',
    },
  },
}
