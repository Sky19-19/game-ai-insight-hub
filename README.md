# Game AI Insight Hub

游戏研发 AI 情报与应用启发系统。该项目是用于产品经理线下面试展示的高保真网页 Demo，演示如何将外部 AI 新闻、模型更新、开源项目与行业案例，转译为面向游戏研发团队的结构化洞察。

它不是普通的 AI 新闻日报。系统更关注：

- 这条 AI 动态与游戏研发有什么关系；
- 会影响策划、程序、美术、测试或项目管理中的哪些岗位；
- 能用于游戏内玩法，还是研发流程提效；
- 是否值得关注、分享、技术预研或沉淀为内部能力卡片。

## 核心功能

- 今日 AI 简报：8 条游戏研发相关 AI 情报，包含摘要、岗位影响、应用关系、相关性评分、落地难度与推荐动作。
- 岗位订阅：针对策划、程序、美术 / TA、测试 / QA、产品 / 项目管理配置差异化内容策略。
- AI 能力卡片库：沉淀 AI NPC、动态剧情、关卡草图、3D 资产、自动化测试、玩家反馈聚类等能力。
- 游戏研发应用场景：覆盖研发流程提效和游戏内能力嵌入。
- 内容审核后台：模拟 AI 摘要、标签、评分、推送对象和审核状态管理。
- 数据反馈看板：衡量内容质量、用户反馈与业务价值。
- 本地交互：岗位/标签筛选、收藏、有用反馈、转预研、审核状态更新和生成简报提示。

## 技术栈

- Vite
- React
- TypeScript
- 原生 CSS
- 本地 Mock Data

## 本地运行

需要 Node.js 20.19+ 或 22.12+。

```bash
npm install
npm run dev
```

根据终端提示打开本地地址，通常为 `http://localhost:5173`。

## 构建与预览

```bash
npm run build
npm run preview
```

构建产物位于 `dist` 目录。项目使用 `base: './'`，可以部署在 GitHub Pages 的仓库子路径下。

## 部署到 GitHub Pages

### 方式一：手动部署 `dist`

1. 执行生产构建：

   ```bash
   npm run build
   ```

2. 将 `dist` 目录内容发布到仓库的 `gh-pages` 分支。
3. 在 GitHub 仓库进入 `Settings → Pages`。
4. 将 Source 设为 `Deploy from a branch`，选择 `gh-pages` 分支根目录。
5. 保存后等待 GitHub Pages 生成访问地址。

也可以使用 `gh-pages` 工具：

```bash
npm install --save-dev gh-pages
npx gh-pages -d dist
```

### 方式二：GitHub Actions

在 `Settings → Pages` 中将 Source 设置为 `GitHub Actions`，使用官方 Pages Workflow：安装依赖、执行 `npm run build`，再上传并部署 `dist` 目录。

## 面试展示建议

建议用 5–7 分钟按以下顺序演示：

1. 在“今日 AI 简报”说明产品不是聚合新闻，而是将动态转为研发关系、岗位影响和推荐动作。
2. 使用岗位与标签筛选，展示不同职能获得不同情报。
3. 收藏一条情报并将其“转为预研”，说明反馈如何进入下一步流程。
4. 进入“AI 能力卡片库”，解释如何把碎片新闻沉淀为组织知识。
5. 在“内容审核后台”修改审核状态，体现中后台和内容治理思维。
6. 最后打开“数据反馈看板”，强调产品衡量的是预研、需求引用与节省时间，而不只是打开率。

## 项目结构

```text
game-ai-insight-hub/
├─ package.json
├─ vite.config.ts
├─ index.html
├─ README.md
└─ src/
   ├─ main.tsx
   ├─ App.tsx
   ├─ logic.ts
   ├─ types.ts
   ├─ data/
   │  └─ mockData.ts
   └─ styles.css
```
