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