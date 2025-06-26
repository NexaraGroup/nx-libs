---
sidebar_position: 3
---

# 质量保证与测试

NX libs 采用严格的质量保证流程，确保每个包的稳定性和可靠性。本文档介绍我们的测试策略、代码质量标准和发布流程。

## 🧪 测试策略

### 测试类型和覆盖范围

我们采用分层测试策略，确保代码质量：

| 测试类型 | 覆盖范围 | 工具 | 目标 |
|----------|----------|------|------|
| **单元测试** | 核心函数和工具 | Vitest | 功能正确性 |
| **类型测试** | TypeScript 类型定义 | tsc | 类型安全性 |
| **配置测试** | ESLint/Prettier/TS 配置 | 实际项目验证 | 配置正确性 |
| **集成测试** | 包之间的协作 | 手动测试 | 整体一致性 |

### 测试框架选择

我们选择了现代且高效的测试工具：

```json
// 根目录 package.json - 测试配置
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

**为什么选择 Vitest：**

- ⚡ 极快的测试执行速度
- 🔧 零配置，开箱即用
- 🎯 专为 TypeScript 和 ESM 优化
- 📊 内置覆盖率报告
- 🔄 与构建工具 (Vite/Turbo) 生态集成

### 覆盖率策略

我们采用智能覆盖率策略：

```js
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      all: false, // 仅针对有测试用例的文件
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      // 智能匹配：只包含实际测试的代码
      include: ['packages/*/src/**/*.ts'],
      exclude: ['**/*.d.ts', '**/*.test.ts']
    }
  }
});
```

**最佳实践：**
- 🎯 专注于实际功能的测试覆盖
- 📈 自动生成覆盖率报告
- 🚫 不强制 100% 覆盖率，重质量而非数量
- ✅ 关键功能必须有测试

## 📦 包级别测试

### @nxlibs/format 测试实例

格式化包包含完整的单元测试：

```typescript
// packages/format/src/__tests__/formatNumber.test.ts
import { describe, expect, it } from 'vitest';
import { formatNumber } from '../formatNumber';

describe('formatNumber', () => {
  it('应该正确格式化数字', () => {
    expect(formatNumber(1234.56)).toBe('1,234.56');
  });

  it('应该处理精度问题', () => {
    expect(formatNumber(0.1 + 0.2)).toBe('0.3');
  });

  it('应该处理无效输入', () => {
    expect(formatNumber('invalid')).toBe('-');
    expect(formatNumber(NaN)).toBe('-');
  });
});
```

### 配置包的验证测试

配置包通过实际项目验证：

```bash
# 创建测试项目验证配置
mkdir test-project
cd test-project

# 测试 TypeScript 配置
npm init -y
npm install -D @nxlibs/typescript-config typescript
echo '{"extends": "@nxlibs/typescript-config/base.json"}' > tsconfig.json
npx tsc --noEmit # 验证配置正确性

# 测试 ESLint 配置
npm install -D @nxlibs/eslint-config eslint
echo 'module.exports = {extends: ["@nxlibs/eslint-config"]}' > .eslintrc.js
npx eslint --print-config index.js # 验证规则加载
```

## 🔍 代码质量标准

### 静态分析工具

我们使用多层静态分析确保代码质量：

```bash
# TypeScript 类型检查
pnpm turbo run typecheck

# ESLint 代码规范检查  
pnpm turbo run lint

# Prettier 代码格式检查
pnpm turbo run format:check
```

### 提交前检查 (Pre-commit Hooks)

使用 Husky + Commitlint 确保提交质量：

```json
// .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# 运行 lint 检查
pnpm lint

# 运行类型检查
pnpm typecheck

# 运行测试（快速）
pnpm test --run
```

### 提交信息规范

遵循 [Conventional Commits](https://conventionalcommits.org/) 规范：

```bash
# 功能添加
feat(format): 新增货币格式化功能

# 错误修复
fix(eslint-config): 修复 React hooks 规则冲突

# 文档更新
docs: 更新安装指南，添加版本信息

# 重构
refactor(typescript-config): 优化配置继承结构

# 测试
test(format): 增加边界值测试用例
```

## 🚀 发布流程与质量保证

### Changesets 版本管理

我们使用 Changesets 进行版本管理和 CHANGELOG 生成：

```bash
# 1. 开发功能后，生成 changeset
pnpm changeset

# 2. 生成版本和 CHANGELOG
pnpm changeset version

# 3. 发布到 npm
pnpm changeset publish
```

### 发布前检查清单

每次发布前必须通过的检查：

- [ ] ✅ 所有测试通过 (`pnpm test`)
- [ ] ✅ 类型检查通过 (`pnpm typecheck`)
- [ ] ✅ 代码规范检查通过 (`pnpm lint`)
- [ ] ✅ 构建成功 (`pnpm build`)
- [ ] ✅ 版本号符合语义化版本规范
- [ ] ✅ CHANGELOG 已更新
- [ ] ✅ 文档已同步更新

### 自动化 CI/CD (规划中)

未来将集成的自动化流程：

```yaml
# .github/workflows/quality-check.yml (示例)
name: Quality Check
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: pnpm install
      - run: pnpm test
      - run: pnpm typecheck
      - run: pnpm lint
      - run: pnpm build
```

## 📊 质量指标追踪

### 当前质量状态

| 包名 | 测试覆盖率 | 类型安全 | 规范检查 | 构建状态 |
|------|------------|----------|----------|----------|
| `@nxlibs/format` | ✅ 完整 | ✅ 严格 | ✅ 通过 | ✅ 成功 |
| `@nxlibs/typescript-config` | ✅ 验证 | ✅ 严格 | ✅ 通过 | ✅ 成功 |
| `@nxlibs/eslint-config` | ✅ 验证 | ✅ 严格 | ✅ 通过 | ✅ 成功 |
| `@nxlibs/prettier-config` | ✅ 验证 | ✅ 严格 | ✅ 通过 | ✅ 成功 |

### 质量改进历程

**v1.0.1 改进：**
- ✅ 为 `@nxlibs/format` 新增完整单元测试
- ✅ 提升代码覆盖率和测试覆盖度
- ✅ 优化实现逻辑，提升性能

**v1.0.2 改进：**
- ✅ 升级 ESLint 配置支持 Next.js 15.x
- ✅ 增强 TypeScript 集成
- ✅ 优化规则配置

**v1.0.3 改进：**
- ✅ 修正 TypeScript 配置包名称
- ✅ 提升配置一致性

## 🎯 用户质量保证

### 如何验证包的质量

作为用户，你可以通过以下方式验证包的质量：

1. **类型定义检查**
```bash
# 安装包后，检查类型定义
npm install @nxlibs/format
npx tsc --noEmit --skipLibCheck false
```

2. **ESLint 规则验证**
```bash
# 测试 ESLint 配置
npx eslint --print-config .eslintrc.js
```

3. **实际功能测试**
```typescript
// 测试格式化功能
import { formatNumber } from '@nxlibs/format';
console.log(formatNumber(1234.56)); // 应该输出 "1,234.56"
```

### 问题反馈渠道

如果发现质量问题，请通过以下渠道反馈：

1. **GitHub Issues**: [提交 Bug 报告](https://github.com/NexaraGroup/nx-libs/issues)
2. **功能请求**: [提交功能建议](https://github.com/NexaraGroup/nx-libs/issues)
3. **安全问题**: 请私信项目维护者

## 📈 持续改进

我们的质量保证是一个持续改进的过程：

### 近期计划

- 🔄 **自动化测试增强** - 增加更多边界情况测试
- 📊 **质量指标面板** - 建立实时质量监控
- 🤖 **CI/CD 集成** - 自动化测试和发布流程
- 📝 **文档测试** - 确保文档示例代码的正确性

### 长期目标

- 🎯 **零缺陷发布** - 通过完善的测试确保发布质量
- 🚀 **性能基准测试** - 建立性能回归测试
- 🔒 **安全扫描** - 集成安全漏洞扫描
- 🌍 **社区驱动测试** - 建立社区测试反馈机制

---

**我们相信高质量的代码是优秀开发体验的基础。** 通过严格的质量保证流程，我们确保 NX libs 始终为你提供可靠、稳定的工具。 