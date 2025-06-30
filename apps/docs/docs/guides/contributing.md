---
sidebar_position: 2
---

# 贡献指南

感谢你对 NX libs 项目的关注！我们欢迎社区成员参与贡献，无论是修复 bug、改进文档还是添加新功能。

## 开发准备

### 环境要求

- Node.js 16.x 或更高版本
- pnpm 8.x 或更高版本 (我们使用 pnpm 作为包管理器)
- Git (用于版本控制)

### 获取代码

```bash
# 克隆仓库
git clone https://github.com/nx-libs/nx-libs.git
cd nx-libs

# 安装依赖
pnpm install
```

## 开发工作流

### 分支策略

- `main` - 稳定分支，用于发布 (当前活跃分支)
- `feature/*` - 功能分支，从 `main` 创建，用于开发新功能
- `fix/*` - 修复分支，从 `main` 创建，用于修复 bug
- `docs/*` - 文档分支，用于文档更新

### 开发流程

1. 从 `main` 分支创建新分支

```bash
git checkout main
git pull
git checkout -b feature/your-feature-name
```

2. 进行开发和测试

```bash
# 安装依赖（如需要）
pnpm install

# 构建所有包
pnpm build

# 运行测试
pnpm test

# 运行 lint 检查
pnpm lint

# 运行类型检查
pnpm typecheck

# 启动文档开发服务器（如果修改文档）
cd apps/docs && pnpm dev
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

我们使用 [Changesets](https://github.com/changesets/changesets) 进行版本管理和发布：

1. **生成 changeset**
```bash
pnpm changeset
```

2. **版本更新和 CHANGELOG 生成**
```bash
pnpm changeset version
```

3. **发布到 npm**
```bash
pnpm changeset publish
```

### 发布前检查清单

- [ ] 所有测试通过 (`pnpm test`)
- [ ] 类型检查通过 (`pnpm typecheck`) 
- [ ] 代码规范检查通过 (`pnpm lint`)
- [ ] 构建成功 (`pnpm build`)
- [ ] 文档已更新
- [ ] Changeset 已创建

## 代码规范

- **TypeScript 优先** - 所有代码使用 TypeScript 编写
- **严格类型检查** - 启用 TypeScript 严格模式
- **代码风格** - 必须通过 ESLint 和 Prettier 检查
- **测试覆盖** - 核心功能必须包含单元测试
- **向后兼容** - 避免破坏性变更，遵循语义化版本
- **提交规范** - 遵循 Conventional Commits 规范
- **文档同步** - 代码变更时同步更新相关文档

## 常见问题

### 如何调试测试？

我们使用 Vitest 作为测试框架，可以这样调试：

```bash
# 调试单个测试文件
pnpm test --reporter=verbose formatNumber.test.ts

# 在监听模式下运行测试
pnpm test --watch

# 生成覆盖率报告
pnpm test --coverage
```

### 如何在本地测试包？

可以使用多种方式本地测试包：

#### 方法 1: 使用 pnpm link

```bash
# 在包目录下创建全局链接
cd packages/format
pnpm link --global

# 在测试项目中使用链接
cd /path/to/test-project
pnpm link --global @nxlibs/format
```

#### 方法 2: 使用 pnpm pack 和本地安装

```bash
# 在包目录下打包
cd packages/format
pnpm pack

# 在测试项目中安装本地包
cd /path/to/test-project
pnpm add /path/to/nx-libs/packages/format/nxlibs-format-1.0.1.tgz
```

#### 方法 3: 使用相对路径 (推荐)

```bash
# 直接在测试项目中使用文件路径
cd /path/to/test-project
pnpm add file:../nx-libs/packages/format
```

### 常见开发问题

#### 类型定义问题

如果遇到类型定义问题：

```bash
# 重新生成类型定义
pnpm build

# 检查 TypeScript 配置
pnpm typecheck
```

#### 依赖版本冲突

```bash
# 清理依赖重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 查看依赖树
pnpm ls --depth=2
```

## 💡 开发技巧

### 使用 Turbo 加速开发

```bash
# 并行构建所有包
pnpm turbo run build

# 只构建变更的包
pnpm turbo run build --filter=...[HEAD^1]

# 强制重新构建（忽略缓存）
pnpm turbo run build --force
```

### 包之间的依赖开发

如果你在开发一个依赖其他本地包的包：

```bash
# 在根目录安装所有依赖
pnpm install

# 构建依赖包
pnpm turbo run build --filter=@nxlibs/format

# 开发模式（自动重构建）
pnpm turbo run dev --filter=@nxlibs/format --parallel
```

## 📚 学习资源

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Changesets 文档](https://github.com/changesets/changesets)
- [Turbo 文档](https://turbo.build/)
- [pnpm 工作区](https://pnpm.io/workspaces)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)

感谢你的贡献！🎉
