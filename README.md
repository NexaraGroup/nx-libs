# `Turborepo` Vite starter

This is a community-maintained example. If you experience a problem, please submit a pull request with a fix. GitHub Issues will be closed.

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e with-vite-react
```

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `web`: react [vite](https://vitejs.dev) ts app
- `@repo/ui`: a stub component library shared by `web` application
- `@repo/eslint-config`: shared `eslint` configurations
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Memo

### 目录结构
- apps
多包项目中，可能存在的真实项目。如果针对 `libs` 的话，通常是放官网、项目文档类型的应用。

- packages
共享的工具包。针对 `libs` 来说，就是要被发布的单包。
`eslint-config`、`typescript-config` 是最佳实践，属于这个项目的校验规则(可以不发布)。
~~`ui`，一层目录来定义 UI 组件，里面具体的发布后缀，可以在 `package.json` 单独定制。~~

### peerDependencies
目前看对于 `peerDependencies`，三大包管理器，趋同于如果版本（2、3位）不匹配发出警告，但是不打断暗转个，使用者来保证版本。