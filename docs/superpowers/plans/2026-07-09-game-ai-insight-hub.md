# Game AI Insight Hub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个可部署到 GitHub Pages、用于面试展示的游戏研发 AI 情报与应用启发系统。

**Architecture:** 使用 Vite + React + TypeScript 构建纯前端单页应用。`mockData.ts` 提供全部内容数据，`App.tsx` 负责页面编排与本地交互状态，`styles.css` 提供“宣纸朱砂 × 现代研发工作台”的响应式设计系统。

**Tech Stack:** Vite 7、React 19、TypeScript 5、原生 CSS、localStorage

---

## 文件结构

- `package.json`：依赖和运行脚本。
- `vite.config.ts`：GitHub Pages 相对路径构建配置。
- `tsconfig.json`、`tsconfig.app.json`、`tsconfig.node.json`：TypeScript 配置。
- `index.html`：应用入口与页面元数据。
- `src/main.tsx`：React 挂载入口。
- `src/types.ts`：领域类型。
- `src/data/mockData.ts`：新闻、订阅、能力、场景、审核和指标数据。
- `src/App.tsx`：六个页面、导航与交互。
- `src/styles.css`：设计令牌、布局、组件和响应式样式。
- `README.md`：运行、构建、部署和面试演示说明。

### Task 1: 创建可构建的 Vite 工程

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `src/main.tsx`

- [ ] **Step 1: 创建工程配置**

配置 `dev`、`build`、`preview` 脚本，使用 React、React DOM、Vite React 插件与 TypeScript；在 Vite 中设置 `base: './'`。

- [ ] **Step 2: 安装依赖**

Run: `npm install`
Expected: 依赖安装成功并生成 `package-lock.json`。

- [ ] **Step 3: 创建最小 React 入口**

`main.tsx` 引入 `App` 与 `styles.css`，挂载到 `#root`。

- [ ] **Step 4: 验证工程骨架**

Run: `npm run build`
Expected: 生成 `dist`，无 TypeScript 或 Vite 错误。

### Task 2: 定义领域模型与完整 Mock 数据

**Files:**
- Create: `src/types.ts`
- Create: `src/data/mockData.ts`

- [ ] **Step 1: 定义类型**

定义 `NewsItem`、`RoleSubscription`、`CapabilityCard`、`ApplicationScenario`、`ReviewItem`、`MetricGroup`、`Difficulty`、`ReviewStatus` 等类型，确保页面不使用隐式 `any`。

- [ ] **Step 2: 创建八条新闻**

覆盖 AI NPC、多模态、3D 资产、自动化测试、开源小模型、剧情任务生成、玩家反馈聚类和 AI 概念探索，并为每条补齐研发关系、岗位、标签、评分、难度与推荐动作。

- [ ] **Step 3: 创建其余页面数据**

补齐五个岗位订阅、六张能力卡片、两组至少十五个应用场景、审核列表、后台配置项与三组数据指标。

- [ ] **Step 4: 类型检查**

Run: `npx tsc -b`
Expected: 无类型错误。

### Task 3: 实现应用壳层和今日简报

**Files:**
- Create: `src/App.tsx`
- Create: `src/styles.css`

- [ ] **Step 1: 实现应用壳层**

创建 Header、Sidebar、PageHeader、Toast 等结构；六个导航项通过 `activePage` 状态切换。

- [ ] **Step 2: 实现首屏洞察总览**

展示“外部 AI 动态 → 游戏研发启发 → 推荐动作”的定位文案，以及 128 条抓取、8 条入选、86 平均相关性、3 条转预研等指标。

- [ ] **Step 3: 实现岗位与标签筛选**

使用 `selectedRole` 和 `selectedTag` 过滤新闻；无结果时显示空状态和“清除筛选”按钮。

- [ ] **Step 4: 实现新闻卡片交互**

实现有用计数、收藏、不相关和转为预研状态。收藏集合从 `localStorage` 初始化，并在变化时写回。

- [ ] **Step 5: 实现顶部操作**

“生成今日简报”显示“今日简报已基于 128 条 AI 信息生成”Toast；“进入能力卡片库”切换页面。

### Task 4: 实现五个辅助页面

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: 岗位订阅页面**

以五张角色卡片展示关注方向、推送频率、内容类型和示例推送。

- [ ] **Step 2: 能力卡片库页面**

以六张卡片完整展示说明、技术基础、应用场景、岗位、难度、风险、动作和案例。

- [ ] **Step 3: 应用场景页面**

使用两个分组展示研发流程提效和游戏内能力嵌入，场景卡包含价值、风险和优先级。

- [ ] **Step 4: 内容审核页面**

使用表格展示审核数据；“通过”“需修改”“不推送”更新对应记录状态。增加六个后台配置卡片。

- [ ] **Step 5: 数据反馈看板**

展示六个业务摘要指标，并用进度条表现内容质量、用户使用和业务价值指标。

### Task 5: 完成视觉系统与响应式布局

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: 建立设计令牌**

使用宣纸色背景、墨黑侧栏、朱砂主色和旧金辅助色；标题采用 `KaiTi, STKaiti, serif`，正文采用系统无衬线字体。

- [ ] **Step 2: 完善组件视觉**

为卡片、标签、评分、难度、状态、按钮、进度条和表格设置清晰层级、焦点态与悬停态。

- [ ] **Step 3: 添加克制材质细节**

使用纯 CSS 细微纸张渐变、边框与角标，不依赖外部图片或字体资源。

- [ ] **Step 4: 响应式适配**

在 1100px 以下压缩网格，在 760px 以下将侧栏改为横向导航、卡片单列、表格横向滚动。

### Task 6: 文档与发布验证

**Files:**
- Create: `README.md`
- Create: `.gitignore`

- [ ] **Step 1: 编写 README**

包含项目定位、核心功能、`npm install`、`npm run dev`、`npm run build`、`npm run preview`、GitHub Pages 手动部署和 GitHub Actions 可选方案。

- [ ] **Step 2: 创建忽略规则**

忽略 `node_modules`、`dist`、本地编辑器文件和 `.superpowers/`。

- [ ] **Step 3: 执行生产构建**

Run: `npm run build`
Expected: `dist/index.html` 和静态资源生成成功，无错误。

- [ ] **Step 4: 浏览器验收**

运行预览服务，依次检查六个页面、筛选、收藏、有用计数、审核状态、Toast、桌面布局和窄屏布局。

- [ ] **Step 5: 检查 GitHub Pages 资源路径**

确认 `dist/index.html` 中资源地址以 `./assets/` 开头，直接从仓库子路径加载正常。
