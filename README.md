# gin

`gin` is a code generator.

```
npm i -g @aegatlin/gin
```

`gin` is a command line tool using [commander](https://github.com/tj/commander.js/). Once installed, run `gin` to see the help documentation, which also explains what steps are involved in each command.

## Captain's Log

- (2023.03.06) I considered making a top-level tailwindcss command because I'm using Vite and the workflow is similar to the `gin next tailwind` workflow. But, event though major portions of the setup is universal, there are enough little things to prevent it from being a good idea, I think. The two most important parts being where you put the CSS `@tailwind` directives, and what file blobs go in to `tailwindConfig.content`. It's tempting to break the generator down into smaller steps, to isolate the universal bits. But, the tailwind config file feels important to the universal bits but is _not_ universal, since it points to the content of the file.
