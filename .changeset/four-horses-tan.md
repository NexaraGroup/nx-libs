---
'@nxlibs/eslint-config': patch
'@nxlibs/typescript-config': patch
---

1. 在 eslint-config 中，将 next eslint 版本从 14.x 升级到 15.x
2. 在 eslint-config 中，新增了 next/typescript 相关的约束配置
3. 在 typescript-config 中，移除了 base 配置中的 dist 排除路径
4. 在 typescript-config 中，去除了 next 默认的别名及相关路径配置
