---
sidebar_position: 2
---

# 贡献指南

感谢你对 NX Utils 项目的关注！我们欢迎社区成员参与贡献，无论是修复 bug、改进文档还是添加新功能。

## 开发准备

### 环境要求

- Node.js 14.x 或更高版本
- pnpm 8.x 或更高版本 (我们使用 pnpm 作为包管理器)

### 获取代码

```bash
# 克隆仓库
git clone https://github.com/nx-utils/nx-utils.git
cd nx-utils

# 安装依赖
pnpm install
```

## 开发工作流

### 分支策略

- `main` - 稳定分支，用于发布
- `develop` - 开发分支，所有功能开发都基于此分支
- `feature/*` - 功能分支，用于开发新功能
- `fix/*` - 修复分支，用于修复 bug

### 开发流程

1. 从 `develop` 分支创建新分支
```bash
git checkout develop
git pull
git checkout -b feature/your-feature-name
```

2. 进行开发和测试
```bash
# 启动开发服务
pnpm dev

# 运行测试
pnpm test

# 运行 lint 检查
pnpm lint
```

3. 提交修改
```bash
git add .
git commit -m "feat: add your feature description"
```

4. 推送分支并创建 Pull Request
```bash
git push origin feature/your-feature-name
```

## 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范来格式化提交信息：

- `feat:` - 新功能
- `fix:` - 修复 bug
- `docs:` - 文档修改
- `style:` - 代码风格修改（不影响代码逻辑）
- `refactor:` - 代码重构
- `perf:` - 性能优化
- `test:` - 测试相关
- `chore:` - 构建过程或辅助工具的变动

示例：
```
feat: 添加数字格式化支持千分位分隔符
fix: 修复日期格式化在Safari浏览器的兼容性问题
docs: 更新 README 文件的安装说明
```

## 发布流程

1. 确保所有测试通过
2. 更新 CHANGELOG.md
3. 更新版本号
4. 创建发布标签
5. 发布到 npm

## 代码规范

- 遵循 TypeScript 最佳实践
- 所有代码必须通过 ESLint 和 Prettier 检查
- 所有新功能必须包含单元测试
- 保持向后兼容性
- 遵循语义化版本控制原则

## 常见问题

### 如何调试测试？

可以使用 `--inspect-brk` 参数启动 Node.js 调试器：

```bash
node --inspect-brk ./node_modules/.bin/jest --runInBand
```

### 如何在本地测试包？

可以使用 `pnpm link` 来本地测试包：

```bash
# 在包目录下
cd packages/format
pnpm link --global

# 在测试项目中
pnpm link --global @nx-utils/format
```