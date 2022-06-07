# gin

Gin is a generator. You can execute the generator remotely

```sh
npx @aegatlin/gin[@latest] barrel Button
```

or as a local dependency after installing it

```sh
npm i -D @aegatlin/gin
npx gin barrel Button
```

## Barrel

- Camel-cased (camelCased) file names are preferred over pascal-cased (PascalCased) because capitalizing the first letter causes a warning with tsconfig setting [forceConsistentCasingInFileNames](https://www.typescriptlang.org/tsconfig#forceConsistentCasingInFileNames) when on macos since macos is **not** case-sensitive. Working around this is possible, but ease of operation is desired, and so being accommodating dictates we should respect the tsconfig setting.

## Notes

Say I knew I wanted to make an Avatar component with two size, which could be either a text avatar or image avatar. What would I type in to the cli?

```sh
npx gin barrel Avatar { TextProps: {  }} { Text: { Large: ['text:string'], Small: ['text:string'] }, Image: { Large: ['imgSrc:string'], Small: ['imgSrc:string'] } }
```

or maybe a spec file?

```sh
npx gin barrel Avatar --spec-file Avatar.gin.ts
```

```ts
// Avatar.gin.ts
interface TextProps {
  text: string
}

interface ImageProps {
  imgSrc: string
}

const Avatar: {
  Text: {

  }
}
```

```json
// Avatar.gin.ts v2
{
  name: 'Avatar',
  props: {
    TextProps: {
      text: 'string'
    },
    ImageProps: {
      imgSrc: 'string'
    }
  },
  variants: {
    Text: {
      props: 'TextProps',
      metaProps: 'Size'
    },
    Image: {
      props: 'ImageProps',
      metaProps: ['Size']
    }
  },
  metaProps: {
    Size: ['Large', 'Small']
  }
}
```


What would it generate?

```ts
// index.ts
interface TextProps {
  text: string
}

interface ImageProps {
  imgSrc: string
}

const Avatar = {
  Text: {
    Large: (props: TextProps) => builder(props, AvatarVariant.Text, TextVariant)
  }
}
```
