import { GinSpec } from '../types'

const button: GinSpec = {
  name: 'Button',
  props: {
    CloseProps: {
      onClick: '() => void',
    },
    ButtonProps: {
      with: 'CloseProps',
      disabled: 'boolean',
      children: 'ReactNode',
    },
  },
  metaProps: {
    Size: ['Large', 'Small'],
  },
  variants: {
    Primary: {
      props: 'ButtonProps',
      metaProps: 'Size',
    },
    Secondary: {
      props: 'ButtonProps',
      metaProps: 'Size',
    },
    Tertiary: {
      props: 'ButtonProps',
    },
    Close: {
      props: 'CloseProps',
    },
  },
}
