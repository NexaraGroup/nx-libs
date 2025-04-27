---
sidebar_position: 3
---

# ESLint 配置

`@nx-utils/eslint-config` 包提供了一组预配置的 ESLint 规则，帮助你在项目中维持代码质量和一致性。

## 安装

```bash
# npm
npm install -D @nx-utils/eslint-config eslint

# yarn
yarn add -D @nx-utils/eslint-config eslint

# pnpm
pnpm add -D @nx-utils/eslint-config eslint
```

## 特性

- ✅ **多环境支持** - 针对不同类型的项目提供专用配置
- ✅ **TypeScript 集成** - 完全支持 TypeScript 的 lint 规则
- ✅ **React 最佳实践** - 包含 React/JSX 相关的规则
- ✅ **自动修复** - 大多数规则支持自动修复
- ✅ **与 Prettier 兼容** - 避免与 Prettier 的规则冲突

## 可用配置

本包提供以下几种预设配置：

| 配置文件 | 用途 |
|---------|------|
| `base` | 基础配置，适用于一般 TypeScript 项目 |
| `react` | React 项目的配置，包含 React 相关规则 |
| `next` | Next.js 项目的配置 |

## 使用方法

在项目根目录创建 `.eslintrc.js` 文件，并扩展所需的配置：

### 基础配置

```js
module.exports = {
  extends: ['@nx-utils/eslint-config/base'],
  // 自定义规则...
  rules: {
    // 自定义规则...
  }
};
```

### React 配置

```js
module.exports = {
  extends: ['@nx-utils/eslint-config/react'],
  // 自定义规则...
  rules: {
    // 自定义规则...
  }
};
```

### Next.js 配置

```js
module.exports = {
  extends: ['@nx-utils/eslint-config/next'],
  // 自定义规则...
  rules: {
    // 自定义规则...
  }
};
```

## 配置详情

### 基础配置 (base)

基础配置包含以下规则和插件：

- TypeScript ESLint 规则
- 导入/导出规则
- 错误预防规则
- 代码风格规则（与 Prettier 兼容）

例如：

```js
// @nx-utils/eslint-config/base/index.js
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier'
  ],
  rules: {
    // 类型相关
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    
    // 导入相关
    'import/order': [
      'error',
      {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        'alphabetize': { order: 'asc', caseInsensitive: true }
      }
    ],
    
    // 其他规则...
  }
};
```

### React 配置 (react)

React 配置扩展了基础配置，并添加了以下内容：

- React 和 JSX 相关规则
- React Hooks 规则
- 可访问性规则

例如：

```js
// @nx-utils/eslint-config/react/index.js
module.exports = {
  extends: [
    '../base',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    // React 相关规则
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    
    // Hooks 相关规则
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // 其他规则...
  }
};
```

## 与其他工具集成

### 与 Prettier 一起使用

ESLint 配置已经包含了与 Prettier 的兼容性设置，但你需要安装并配置 Prettier：

```bash
pnpm add -D prettier @nx-utils/prettier-config
```

然后创建 `.prettierrc.js`：

```js
module.exports = require('@nx-utils/prettier-config');
```

### 与 VS Code 集成

在 VS Code 中安装 ESLint 扩展，并添加以下设置以启用自动修复：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

## 常见问题

### 如何禁用特定规则？

在你的 `.eslintrc.js` 文件中，使用 `rules` 字段覆盖规则：

```js
module.exports = {
  extends: ['@nx-utils/eslint-config/base'],
  rules: {
    // 禁用规则
    '@typescript-eslint/no-explicit-any': 'off',
    
    // 修改规则严重程度
    'no-console': 'warn',
    
    // 自定义规则配置
    'max-len': ['error', { code: 100, ignoreComments: true }]
  }
};
```

### 如何为特定文件禁用规则？

使用 ESLint 的注释来禁用特定行或文件的规则：

```typescript
// eslint-disable-next-line no-console
console.log('调试信息');

/* eslint-disable @typescript-eslint/no-explicit-any */
// 这个文件的一部分将不检查 any 类型
/* eslint-enable @typescript-eslint/no-explicit-any */
```

### 如何自定义解析器选项？

修改 `parserOptions` 字段：

```js
module.exports = {
  extends: ['@nx-utils/eslint-config/base'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2021
  }
};
``` 