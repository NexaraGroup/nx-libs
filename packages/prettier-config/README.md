# @nx-utils/prettier-config

共享的 Prettier 配置，用于在项目中保持一致的代码格式。

## 安装

```bash
npm install --save-dev @nx-utils/prettier-config prettier
# 或者
pnpm add -D @nx-utils/prettier-config prettier
```

## 使用方法

在你的项目中，有几种方式可以使用这个配置：

### 方法一：在 package.json 中引用

最简单的方式是在 `package.json` 中添加：

```json
{
  "prettier": "@nx-utils/prettier-config"
}
```

### 方法二：在 .prettierrc.js 中引用

如果你想要扩展配置，可以在 `.prettierrc.js` 中引用：

```js
module.exports = {
  ...require('@nx-utils/prettier-config'),
  // 在这里可以添加自定义配置来覆盖默认设置
  semi: true
};
```

## 配置详情

这个配置包含了以下规则：

- 使用单引号
- 对象属性名如果有引号则保留
- 使用尾逗号
- 一行最多100个字符
- 使用制表符缩进（与.editorconfig保持一致）
- 不使用分号
- 箭头函数参数始终使用括号
- 导入排序

## 包含的插件

- [@ianvs/prettier-plugin-sort-imports](https://github.com/ianvs/prettier-plugin-sort-imports) - 用于排序导入语句
- [prettier-plugin-packagejson](https://github.com/matzkoh/prettier-plugin-packagejson) - 用于格式化package.json文件 