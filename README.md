# @nxlibs

## libs 发布流程说明（Changesets + 手动发布）

下面是一套典型的 `libs` 使用 `Changesets` 完成版本管理、日志生成、*Git Tag* 和 `npm` 发布的流程

### 1. 构建产物
> 在发布前，先把所有包的产物编译到 `dist/`（或其它输出目录），确保发布的代码是最新的
```bash
pnpm turbo run build    # 默认命令，可定制，这里仅做示意
```

### 2. 生成变更集（Changeset）
> 交互式地选择要发布的包、*升级级别（patch/minor/major）*和变更描述（这个可以考虑想办法让 ai 做，TODO）
> 注意 ↑↑↑ 说的选择，是选择本次修改的包，`changeset` 帮忙做其他关联包的升级检测
> 默认一般推荐 `workspace:*`，这代表所有关联包都会调整并发布，这个是比较好的实践，也有 *~、^* 的方式，不展开讨论了
> 变更集文件会记录在 `.changeset/` 目录下
```bash
pnpm changeset
```

### 3. 提交代码 + 变更集
> 把 `.changeset` 下的新文件以及相关源码/配置一起提交到分支：
```bash
git add .changeset packages/**/package.json
git commit -m "chore: 添加 changeset 发布提案"
git push origin <feature-branch>
```

### 4. 版本 bump、生成 CHANGELOG 和打 Git Tag
> 在主分支或 CI 上，执行：
```bash
pnpm changeset version
```
- **自动更新** 各包 `package.json` 的版本号  
- **自动合并/新增** 根目录 `CHANGELOG.md`  
- 需要**手动**提交上述改动
- *版本 tag* 是自动打的，会根据子包名称和版本打，但是推送动作，需要*手动 push*

### 5. 推送代码与 Tag
```bash
git push origin main --follow-tags
```
> 将 version 步骤生成的 commit 和所有新 Tag 一次性推到远程

### 6. 发布到 npm
> 最后一步，Changesets 会自动检测哪些包版本变更并发布：
```bash
pnpm changeset publish
```
- 对有变更的包依次执行 `npm publish`  
- 发布完毕后，npm 库即可看到新版本
需要注意的是，需要本地运行 `npm login` 完成登陆，并且确保 `publishConfig` 正确。如果有**部分包发布失败**，也没关系，调整后可以提交 *git commit*（不是功能的调整，所以不需要重新走流程），完成重新发布（`changeset` 会查询 `npm view 包名称 version`，来决定补发布动作）

---

## Memo

### 目录结构

- apps  
  多包项目中，可能存在的真实项目。如果针对 `libs` 的话，通常是放官网、项目文档类型的应用  

- packages  
  共享的工具包。针对 `libs` 来说，就是要被发布的单包  
  `eslint-config`、`typescript-config` 等也放在项目里是最佳实践，属于这个项目的校验规则(可以不发布)  
  ~~`ui`，一层目录来定义 UI 组件，里面具体的发布后缀，可以在 `package.json` 单独定制~~

### 依赖管理最佳实践

- **工具与配置分离**  
  核心工具(`eslint`, `typescript`, `prettier` 等)只安装在根目录 `package.json`  
  配置文件放在专门的子包中(如 `eslint-config`)  
  业务包只依赖配置包，无需重复安装工具

- **配置包的依赖声明**  
  配置包应将对应工具声明为 `peerDependencies`，例如：

    ```json
    // packages/typescript-config/package.json
    "peerDependencies": {
      "typescript": ">=5.0.0"
    }
    ```

    表明"此配置需与特定版本工具一起使用"

- **类型定义位置**  
  即使实际库是 `peerDependencies`，其类型定义应放在 `devDependencies`：
    ```json
    "peerDependencies": {
      "big.js": "^6.0.0"
    },
    "devDependencies": {
      "@types/big.js": "^6.0.0"
    }
    ```
    类型只在开发时使用，最终会被编译到 `.d.ts` 文件中

### peerDependencies

`peerDependencies`，三大包管理器，趋同于如果版本（2、3位）不匹配发出警告，但是不打断，**使用者来保证版本**

### eslint

```
parserOptions: {
    ecmaVersion: "latest", // 这个只校验语法
    // 默认值是不设置，这个不用开，类型交给 ts 相关的东西去检查，不需要 eslint 来，vscode 和第三方编译工具，都能做这个事情
    project: false,
}

env: {
    es2024: true, // 这个只校验 api
}

// 以下是：plugin:import/typescript 最佳配置
settings: {
    "import/resolver": {
        typescript: {
            alwaysTryTypes: true, // 只需要引入类型的情况（虽然几乎不会）
        },
        node: true, // nodejs 包，需要被识别导入的情况
    },
}
```

### jsdoc 类型补全

```
xxx.cjs
/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  ignorePatterns: [".eslintrc.cjs"],
  extends: ["@repo/eslint-config/index.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
```

上述的代码意思是：是 `cjs` 文件，不是 `ts`，但是，又想要在**编辑器级别**，能探测到类型，所以使用这种 `jsdoc` 的方式。是最佳实践，以后可以尝试

### tsconfig

#### 主要是 typescript-config 过程中遇到的一些问题

- "noEmit": true  
  在工程项目的配置中，目前都是配合第三方打包器，所以不需要 `tsc` 来产生实际 `js` 代码，`libs` 则需要产生代码  

- "declaration": true  
  生成 `*.d.ts` 文件，`tsc` 会读这个配置，但是主流的打包工具都**不会**读这个配置  
  举例来说：`"build": "tsup src/index.ts --format esm,cjs --dts"`，`tsup` 需要显示的申明 `--dts`，而不会去读 `declaration`  

- ~"module": "NodeNext"~
  ~这个有点类似于自动选择~
    ~1. 如果是 `*.mts`，则输出成 `*.mjs`~
    ~2. 若果是 `*.cts` ，则输出 `*.cjs`~
    ~3. 如果单纯是 `*.ts`，则看 `package.json` 里的配置，默认是 `commonjs`~
    ~4. 另外，这个其实适合有混合 `commonjs` 和 `es module` 的场景~
    ~现代的 `libs` 一般都是需要指定**双格式输出**~
`nodenext` 是需要补后缀名的。另外：
> 双输出的包，`package.json` 的 *"type": "module"*, 这个**不要**写，通过 `export` 等字段来引导
> `tsconfig` 里的 `module` 也不用写，通过写 `target`，来自动命中通过后续具体的如 `tsup` 等打包器来处理双输出

- "lib": ["ESNext"]
  这个，我看下来，我还是准备用保留的 es2019，因为 `target` 实际只转化**语法**，如果 `esNext` 提示了有最新的 api，但是实际环境又没有，这个就很糟糕  
  大部分都项目都不会主动 *include node_modules* 的文件，来做转化，所以这个行为是很不安全的。

### 关于 dayjs 和 momentjs

主要是 `tree shaking` 的支持。`momentjs` 用 `commonjs` 设计，`require` 仅仅是**普通函数变量申明**。而不是像 `import` 这种语法层面的词法  
所以 `require` **不能作为可靠标记**，进一步说就不能确认完整的上下文链路，然后决定哪些该被舍弃  
*动态 import* 的动态部分虽然也不能被 `tree shaking`，但是 `import` 是**可靠标记**，所以静态的上下文分析是可靠的，至少动态部分忽略就可以了

### exports 的定义问题
```
"exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  },
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
```

上面两组看似重复，实际是为了兼容问题。_node v12_ 后才支持 `exports` 字段

### turbo 相关

> `turbo` 最核心的优势是：**多包的、基于任务级别的增量构建**

`lerna`、`pnpm` 的增量构建比较繁琐，需要手动指定、额外脚本  
`webpack`、`rollup` 的增量针对单包设计  
而且，其他的框架**没有任务的概念**。_比如：cicd、lint_  
这些，`turbo` 都是可以单独指定任务，触发缓存的

```
"docs:dev": {
  "cache": false,    // 这是一个 dev 任务，不会产生特定的输出结果（如文件），turbo 不需要缓存
  "persistent": true // 如果有依赖这个任务的，不需要等待这个任务完成，因为这个是持续性任务
}
```

> 关于 turbo 的构建实践

**最佳实践：**

1. 在根目录执行 `pnpm turbo run build` 或 `turbo run build`，Turbo 会自动扫描工作区中所有定义了 `build` 脚本的包，并行执行构建
2. 对于源码、依赖、配置均未变化的包，Turbo 会直接从缓存中恢复之前的 `dist/**`，跳过实际构建，大幅加速本地和 CI 构建
3. 如需单包构建，可使用过滤器：`pnpm turbo run build --filter=packages/format` 或按包名过滤

> Turborepo 任务关键配置解释

- **dependsOn**: 用于声明任务依赖。`"^build"` 表示当前包在执行 `build` 前，会先执行所有上游依赖包的 `build`，保证依赖包先产出最新产物
- **inputs**: 定义任务输入文件集合，用于生成输入哈希。`["$TURBO_DEFAULT$", ".env*"]` 包含源码、配置文件、锁文件、依赖版本等，只有输入变化时才触发重新执行
- **outputs**: 定义任务产出文件路径，用于缓存和还原。`["dist/**"]` 表示将 `dist` 目录下的所有文件作为缓存目标，下次输入哈希相同则直接从缓存恢复，无需重新构建

> 关于上面3条，我自己测的表现。总体和上面3条表述的是一样的
1. `turbo run build`，它会去找命名空间下所有一级 `package.json` 的 `build` 命令，这是默认表现
2. 然后回产生全部的运行结果（所有 `build` 命令都执行，然后产生**实体文件**和 `.turbo` 缓存文件夹）
3. 这个时候，如果一个项目的产出是 `build` 文件夹，不和 `outputs` 的配置一样，如果删除了这个文件夹，即使输入没变，也不会触发还原（这个可以看看，实际基本上会避免这种情况）

---

## 测试
| 类型 | 关注点 | 工具举例 | 典型场景 |
|--------------|------------------|---------------------------------|-------------------------------|
| 单元测试 | 函数/方法 | Vitest、Jest | 工具函数、算法 |
| 组件测试 | UI 组件 | Vitest+Testing Library、Jest | React/Vue 组件 |
| 集成测试 | 多模块协作 | Vitest、Jest、Supertest | 组件+API、模块间数据流 |
| 端到端测试 | 整体业务流程 | Playwright、Cypress | 用户完整操作、页面跳转 |
| 快照测试 | 输出快照 | Jest、Vitest | 组件渲染、API 返回 |
| 视觉回归测试 | UI 视觉一致性 | Percy、Loki、Chromatic | 设计系统、UI 变更 |
| 性能测试 | 性能指标 | Lighthouse、Jest、Benchmark.js | 页面加载、函数性能 |

> 上面是 AI 归纳的测试类型
- `集成测试`、`视觉回归测试` 是完全没有用的
- `快照测试` 主要作用在实际场景中用处不大，可以不用管
- `性能测试` 有用，但是对于前端的场景来说，用处不大
- `端到端测试` 比 `集成测试` 简洁、有用，不需要关注代码实现，只需要关注用户行为和部分链路，如果是业务代码的话，可以写一写
- `组件测试` 有用，而且写起来关联度不大，代价小
- `单元测试` 需要实现

结论：需要接 `单元测试`，`组件测试` 有 UI 场景可以接入。测试的整体目的是作为参考，不作为 CICD 的一部分。

### 实操
1. 这里在根目录下的 `package.json` 单独配置了，*test 脚本*，这个脚本，会自动取找 `workspace` 下的所有子包的 **.test.ts*，并且执行测试
2. 这里放弃了 *turbo task*，直接根目录是负担最小，收益最高的
3. 关于覆盖率，目前看，最佳实践是：*自动针对仅仅针对设计测试用例的项目，或者使用 includes 来指定范围*，这个是最佳实践。我这里是采用自动匹配测试用例的方式：
```
coverage: {
  all: false,
  reporter: ['text', 'html'],
  reportsDirectory: './coverage',
},
```
4. 关于 `coverage`，这个完全可以忽略掉，不用上传 *git*，可以通过 cicd 的方式来部署在别的位置，作为参考和监控

---

## TODO
1. test case
2. turbo 的 "lint": {}, lint 任务检查，还没搞
3. git cicd
4. ai changelog
5. cicd 官网

---
## Git提交规范

项目使用 `husky` 和 `commitlint` 强制执行 *Git 提交规范*：

- **提交格式**:  
  `<type>(<scope>): <subject>`  
  例如: `feat(format): 添加数字格式化功能`

- **类型(type)**:
    - `feat`: 新功能
    - `fix`: 修复Bug
    - `docs`: 文档更新
    - `style`: 代码格式调整
    - `refactor`: 重构
    - `perf`: 性能优化
    - `test`: 测试相关
    - `chore`: 构建/工具相关
    - `revert`: 代码回退

- **范围(scope)**:  
  可选，表示影响的包或模块，如 `docs`, `format`, `eslint-config` 等

- **预提交检查**:  
  提交前会自动运行 *lint 检查*
