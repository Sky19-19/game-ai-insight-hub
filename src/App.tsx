import { useEffect, useMemo, useState } from 'react'
import {
  applicationScenarios,
  backendConfigs,
  capabilityCards,
  metricGroups,
  navItems,
  newsItems,
  reviewItems as initialReviewItems,
  roles,
  roleSubscriptions,
  tags,
} from './data/mockData'
import { filterNews, parseSavedIds, toggleId } from './logic'
import type {
  ApplicationScenario,
  CapabilityCard,
  Difficulty,
  PageId,
  ReviewItem,
  ReviewStatus,
} from './types'

const pageMeta: Record<PageId, { eyebrow: string; title: string; description: string }> = {
  brief: {
    eyebrow: 'DAILY INTELLIGENCE · 07.09',
    title: '今日 AI 研发简报',
    description: '将外部 AI 动态转译为岗位影响、游戏场景与下一步行动。',
  },
  subscriptions: {
    eyebrow: 'ROLE-BASED DELIVERY',
    title: '岗位订阅策略',
    description: '同一条 AI 动态，面向不同岗位提供不同颗粒度与判断维度。',
  },
  capabilities: {
    eyebrow: 'CAPABILITY ARCHIVE',
    title: 'AI 能力卡片库',
    description: '从碎片新闻沉淀稳定能力认知，形成可复用的内部知识资产。',
  },
  scenarios: {
    eyebrow: 'GAME R&D APPLICATIONS',
    title: '游戏研发应用场景',
    description: '从研发提效到游戏内创新，识别价值、风险与验证优先级。',
  },
  review: {
    eyebrow: 'CONTENT OPERATIONS',
    title: '内容审核后台',
    description: '用规则、标签与人工判断保证推送内容可信、相关且可执行。',
  },
  dashboard: {
    eyebrow: 'VALUE MEASUREMENT',
    title: '数据反馈看板',
    description: '不只衡量阅读，更追踪情报是否进入预研、需求与知识沉淀。',
  },
}

const difficultyClass: Record<Difficulty, string> = {
  低: 'easy',
  中: 'medium',
  高: 'hard',
}

function App() {
  const [activePage, setActivePage] = useState<PageId>('brief')
  const [selectedRole, setSelectedRole] = useState('全部岗位')
  const [selectedTag, setSelectedTag] = useState('全部标签')
  const [savedIds, setSavedIds] = useState<Set<string>>(() =>
    parseSavedIds(localStorage.getItem('game-ai-saved')),
  )
  const [usefulCounts, setUsefulCounts] = useState<Record<string, number>>({})
  const [usefulIds, setUsefulIds] = useState<Set<string>>(new Set())
  const [irrelevantIds, setIrrelevantIds] = useState<Set<string>>(new Set())
  const [researchIds, setResearchIds] = useState<Set<string>>(new Set())
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>(initialReviewItems)
  const [toast, setToast] = useState('')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('game-ai-saved', JSON.stringify([...savedIds]))
  }, [savedIds])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 2600)
    return () => window.clearTimeout(timer)
  }, [toast])

  const filteredNews = useMemo(
    () => filterNews(newsItems, selectedRole, selectedTag),
    [selectedRole, selectedTag],
  )

  const navigate = (page: PageId) => {
    setActivePage(page)
    setMobileNavOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const markUseful = (id: string) => {
    if (usefulIds.has(id)) return
    setUsefulIds((current) => toggleId(current, id))
    setUsefulCounts((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }))
  }

  const updateReview = (id: string, status: ReviewStatus) => {
    setReviewItems((items) => items.map((item) => (item.id === id ? { ...item, status } : item)))
  }

  const meta = pageMeta[activePage]

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        isOpen={mobileNavOpen}
        onNavigate={navigate}
        onClose={() => setMobileNavOpen(false)}
      />

      <main className="main-shell">
        <header className="topbar">
          <button
            className="mobile-menu"
            aria-label="打开导航"
            onClick={() => setMobileNavOpen(true)}
          >
            ☰
          </button>
          <div className="brand-mobile">
            <span>GAME AI</span>
            <small>洞见 · 研发</small>
          </div>
          <div className="topbar-date">
            <span className="status-dot" />
            <span>2026 年 7 月 9 日 · 星期四</span>
            <span className="live-label">情报流已更新</span>
          </div>
          <div className="topbar-actions">
            <button className="button ghost" onClick={() => navigate('capabilities')}>
              <span>◇</span> 进入能力卡片库
            </button>
            <button
              className="button primary"
              onClick={() => setToast('今日简报已基于 128 条 AI 信息生成')}
            >
              <span>✦</span> 生成今日简报
            </button>
          </div>
        </header>

        <div className="content">
          <section className="page-heading">
            <div>
              <p className="eyebrow">{meta.eyebrow}</p>
              <h1>{meta.title}</h1>
              <p>{meta.description}</p>
            </div>
            <div className="seal" aria-hidden="true">智<br />鉴</div>
          </section>

          {activePage === 'brief' && (
            <BriefPage
              filteredNews={filteredNews}
              selectedRole={selectedRole}
              selectedTag={selectedTag}
              savedIds={savedIds}
              usefulIds={usefulIds}
              usefulCounts={usefulCounts}
              irrelevantIds={irrelevantIds}
              researchIds={researchIds}
              onRoleChange={setSelectedRole}
              onTagChange={setSelectedTag}
              onSave={(id) => setSavedIds((current) => toggleId(current, id))}
              onUseful={markUseful}
              onIrrelevant={(id) => setIrrelevantIds((current) => toggleId(current, id))}
              onResearch={(id) => setResearchIds((current) => toggleId(current, id))}
              onClear={() => {
                setSelectedRole('全部岗位')
                setSelectedTag('全部标签')
              }}
            />
          )}
          {activePage === 'subscriptions' && <SubscriptionsPage />}
          {activePage === 'capabilities' && <CapabilitiesPage />}
          {activePage === 'scenarios' && <ScenariosPage />}
          {activePage === 'review' && (
            <ReviewPage reviewItems={reviewItems} onUpdate={updateReview} />
          )}
          {activePage === 'dashboard' && <DashboardPage />}
        </div>
      </main>

      {toast && (
        <div className="toast" role="status">
          <span className="toast-icon">✓</span>
          <div><strong>生成完成</strong><small>{toast}</small></div>
        </div>
      )}
    </div>
  )
}

interface SidebarProps {
  activePage: PageId
  isOpen: boolean
  onNavigate: (page: PageId) => void
  onClose: () => void
}

function Sidebar({ activePage, isOpen, onNavigate, onClose }: SidebarProps) {
  return (
    <>
      <div className={`nav-overlay ${isOpen ? 'show' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><span>G</span></div>
          <div>
            <strong>Game AI</strong>
            <span>Insight Hub</span>
          </div>
        </div>
        <div className="brand-subtitle">游戏研发 AI 情报与应用启发系统</div>
        <nav aria-label="主导航">
          <p className="nav-label">情报工作台</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={activePage === item.id ? 'active' : ''}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.id === 'brief' && <span className="nav-count">8</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-insight">
          <span className="sidebar-insight-label">今日洞察</span>
          <strong>不是追逐每一条 AI 新闻</strong>
          <p>而是判断它是否值得进入游戏研发的下一步。</p>
        </div>
        <div className="sidebar-footer">
          <span className="avatar">林</span>
          <div><strong>内容运营台</strong><small>领域编辑 · 在线</small></div>
          <span>•••</span>
        </div>
      </aside>
    </>
  )
}

interface BriefPageProps {
  filteredNews: typeof newsItems
  selectedRole: string
  selectedTag: string
  savedIds: Set<string>
  usefulIds: Set<string>
  usefulCounts: Record<string, number>
  irrelevantIds: Set<string>
  researchIds: Set<string>
  onRoleChange: (value: string) => void
  onTagChange: (value: string) => void
  onSave: (id: string) => void
  onUseful: (id: string) => void
  onIrrelevant: (id: string) => void
  onResearch: (id: string) => void
  onClear: () => void
}

function BriefPage(props: BriefPageProps) {
  return (
    <>
      <section className="insight-banner">
        <div className="banner-intro">
          <span className="banner-kicker">从信息到行动</span>
          <h2>外部 AI 动态，如何进入游戏研发？</h2>
          <p>系统完成相关性判断、岗位映射与行动建议，让团队少看新闻，多做判断。</p>
        </div>
        <div className="value-flow" aria-label="情报加工流程">
          <div><span>01</span><strong>AI 新动态</strong><small>模型 · 工具 · 案例</small></div>
          <i>→</i>
          <div><span>02</span><strong>研发启发</strong><small>岗位 · 场景 · 价值</small></div>
          <i>→</i>
          <div><span>03</span><strong>推荐动作</strong><small>关注 · 分享 · 预研</small></div>
        </div>
      </section>

      <section className="stat-grid">
        <StatCard index="壹" value="128" label="今日抓取内容" detail="来自 24 个信息源" trend="+12%" />
        <StatCard index="贰" value="8" label="入选今日简报" detail="精选率 6.25%" trend="高相关" />
        <StatCard index="叁" value="86" label="平均游戏相关性" detail="较昨日提升 4 分" trend="↑ 4" />
        <StatCard index="肆" value="3" label="建议转为预研" detail="2 项技术 · 1 项产品" trend="待评估" />
      </section>

      <section className="filter-panel">
        <div className="filter-group">
          <span className="filter-title">按岗位筛选</span>
          <div className="chip-row">
            {roles.map((role) => (
              <button
                key={role}
                className={`filter-chip ${props.selectedRole === role ? 'active' : ''}`}
                onClick={() => props.onRoleChange(role)}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group tag-filter">
          <label htmlFor="tag-select">内容标签</label>
          <select
            id="tag-select"
            value={props.selectedTag}
            onChange={(event) => props.onTagChange(event.target.value)}
          >
            {tags.map((tag) => <option key={tag}>{tag}</option>)}
          </select>
        </div>
      </section>

      <div className="section-title-row">
        <div><h2>今日精选情报</h2><span>{props.filteredNews.length} 条与当前筛选相关</span></div>
        <span className="update-time">最后更新于 10:24</span>
      </div>

      {props.filteredNews.length ? (
        <section className="news-list">
          {props.filteredNews.map((item, index) => (
            <article className="news-card" key={item.id}>
              <div className="news-rank">{String(index + 1).padStart(2, '0')}</div>
              <div className="news-main">
                <div className="news-source-row">
                  <span>{item.source}</span><i />
                  <time>{item.publishedAt}</time>
                </div>
                <h3>{item.title}</h3>
                <p className="news-summary">{item.summary}</p>
                <div className="relation-box">
                  <span className="relation-icon">研</span>
                  <div><strong>和游戏研发的关系</strong><p>{item.gameRelation}</p></div>
                </div>
                <div className="news-taxonomy">
                  <div>
                    <span className="taxonomy-label">影响岗位</span>
                    {item.roles.map((role) => <span className="tag role-tag" key={role}>{role}</span>)}
                  </div>
                  <div>
                    <span className="taxonomy-label">内容标签</span>
                    {item.tags.map((tag) => <span className="tag content-tag" key={tag}>{tag}</span>)}
                  </div>
                </div>
                <div className="news-actions">
                  <button
                    className={props.usefulIds.has(item.id) ? 'selected' : ''}
                    onClick={() => props.onUseful(item.id)}
                  >
                    ♡ {props.usefulIds.has(item.id) ? '已反馈' : '有用'} · {item.usefulCount + (props.usefulCounts[item.id] ?? 0)}
                  </button>
                  <button
                    className={props.savedIds.has(item.id) ? 'selected' : ''}
                    onClick={() => props.onSave(item.id)}
                  >
                    ☆ {props.savedIds.has(item.id) ? '已收藏' : '收藏'}
                  </button>
                  <button
                    className={props.irrelevantIds.has(item.id) ? 'muted-selected' : ''}
                    onClick={() => props.onIrrelevant(item.id)}
                  >
                    ⊘ {props.irrelevantIds.has(item.id) ? '已标记' : '不相关'}
                  </button>
                  <button
                    className={`research-button ${props.researchIds.has(item.id) ? 'selected' : ''}`}
                    onClick={() => props.onResearch(item.id)}
                  >
                    ↗ {props.researchIds.has(item.id) ? '已转预研' : '转为预研'}
                  </button>
                </div>
              </div>
              <aside className="news-evaluation">
                <div className="score-ring" style={{ '--score': `${item.relevance * 3.6}deg` } as React.CSSProperties}>
                  <div><strong>{item.relevance}</strong><span>/ 100</span></div>
                </div>
                <span className="score-label">游戏相关性</span>
                <div className="eval-divider" />
                <small>落地难度</small>
                <span className={`difficulty ${difficultyClass[item.difficulty]}`}>{item.difficulty}</span>
                <small>推荐动作</small>
                <strong className="recommendation">{item.action}</strong>
              </aside>
            </article>
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <span>⌁</span><h3>当前组合暂无情报</h3>
          <p>换一个岗位或标签，看看其他研发启发。</p>
          <button className="button primary" onClick={props.onClear}>清除筛选</button>
        </section>
      )}
    </>
  )
}

function StatCard({ index, value, label, detail, trend }: {
  index: string; value: string; label: string; detail: string; trend: string
}) {
  return (
    <article className="stat-card">
      <span className="stat-index">{index}</span>
      <div><strong>{value}</strong><span>{label}</span><small>{detail}</small></div>
      <em>{trend}</em>
    </article>
  )
}

function SubscriptionsPage() {
  return (
    <>
      <section className="page-callout">
        <div><span className="callout-symbol">岗</span></div>
        <div><strong>从“统一推送”转向“岗位相关”</strong><p>策划需要玩法启发，程序需要工程参数，美术需要管线适配；相关性来自对岗位决策语境的理解。</p></div>
        <span className="callout-badge">5 类岗位策略</span>
      </section>
      <section className="subscription-grid">
        {roleSubscriptions.map((item) => (
          <article className="subscription-card" key={item.role}>
            <div className="role-card-head">
              <span className="role-code">{item.code}</span>
              <div><h2>{item.role}</h2><p>{item.description}</p></div>
              <span className="subscribed">● 已订阅</span>
            </div>
            <div className="card-section">
              <span className="mini-label">重点关注方向</span>
              <div className="tag-cloud">{item.focus.map((focus) => <span key={focus}>{focus}</span>)}</div>
            </div>
            <div className="role-meta">
              <div><span>推荐推送频率</span><strong>{item.frequency}</strong></div>
              <div><span>推荐内容类型</span><strong>{item.contentTypes.join(' · ')}</strong></div>
            </div>
            <div className="push-example">
              <span>示例推送</span>
              <p>“{item.example}”</p>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

function CapabilitiesPage() {
  const [expanded, setExpanded] = useState<string | null>('cap-npc')
  return (
    <>
      <section className="capability-overview">
        <div><span>6</span><p>已沉淀<br />能力卡片</p></div>
        <i />
        <div><span>4</span><p>建议进入<br />原型验证</p></div>
        <i />
        <div><span>2</span><p>需要持续<br />观察演进</p></div>
        <p>能力卡片不是工具清单，而是团队对“能做什么、代价是什么、如何验证”的共同认知。</p>
      </section>
      <section className="capability-grid">
        {capabilityCards.map((card, index) => (
          <CapabilityItem
            key={card.id}
            card={card}
            index={index}
            expanded={expanded === card.id}
            onToggle={() => setExpanded(expanded === card.id ? null : card.id)}
          />
        ))}
      </section>
    </>
  )
}

function CapabilityItem({ card, index, expanded, onToggle }: {
  card: CapabilityCard; index: number; expanded: boolean; onToggle: () => void
}) {
  return (
    <article className={`capability-card ${expanded ? 'expanded' : ''}`}>
      <div className="cap-number">{String(index + 1).padStart(2, '0')}</div>
      <div className="cap-title-row">
        <div><span className={`difficulty ${difficultyClass[card.difficulty]}`}>难度 · {card.difficulty}</span><h2>{card.name}</h2></div>
        <div className="maturity"><strong>{card.maturity}%</strong><span>能力成熟度</span></div>
      </div>
      <p className="cap-description">{card.description}</p>
      <div className="cap-section"><span>技术基础</span><p>{card.technology}</p></div>
      <div className="cap-section"><span>游戏应用场景</span><div className="tag-cloud">{card.scenarios.map((item) => <span key={item}>{item}</span>)}</div></div>
      <div className="cap-section"><span>适用岗位</span><p>{card.roles.join(' · ')}</p></div>
      {expanded && (
        <div className="cap-expanded">
          <div><span>主要风险</span><ul>{card.risks.map((risk) => <li key={risk}>{risk}</li>)}</ul></div>
          <div className="cap-action"><span>推荐动作</span><p>{card.action}</p></div>
          <div><span>参考案例</span><p>{card.caseStudy}</p></div>
        </div>
      )}
      <button className="cap-toggle" onClick={onToggle}>{expanded ? '收起详情 ↑' : '查看完整判断 ↓'}</button>
    </article>
  )
}

function ScenariosPage() {
  const [category, setCategory] = useState<ApplicationScenario['category']>('研发流程提效')
  const items = applicationScenarios.filter((item) => item.category === category)
  return (
    <>
      <div className="scenario-tabs">
        {(['研发流程提效', '游戏内能力嵌入'] as const).map((item) => (
          <button className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item}>
            <span>{item === '研发流程提效' ? '器' : '游'}</span>
            <div><strong>{item}</strong><small>{item === '研发流程提效' ? '缩短生产周期，降低重复劳动' : '创造新的交互、内容与体验'}</small></div>
          </button>
        ))}
      </div>
      <section className="scenario-grid">
        {items.map((item, index) => (
          <article className="scenario-card" key={item.id}>
            <div className="scenario-head">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span className={`priority ${item.priority.toLowerCase()}`}>{item.priority} 优先级</span>
            </div>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <div className="scenario-roles"><span>适用岗位</span><strong>{item.roles.join(' · ')}</strong></div>
            <div className="value-risk">
              <div><span>价值</span><p>{item.value}</p></div>
              <div><span>风险</span><p>{item.risk}</p></div>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

function ReviewPage({ reviewItems, onUpdate }: {
  reviewItems: ReviewItem[]
  onUpdate: (id: string, status: ReviewStatus) => void
}) {
  const pending = reviewItems.filter((item) => item.status === '待审核').length
  return (
    <>
      <section className="review-summary">
        <div><span>待审核</span><strong>{pending}</strong><small>等待领域编辑判断</small></div>
        <div><span>今日已通过</span><strong>{reviewItems.filter((item) => item.status === '已通过').length}</strong><small>可进入岗位推送</small></div>
        <div><span>需修改</span><strong>{reviewItems.filter((item) => item.status === '需修改').length}</strong><small>摘要或标签需调整</small></div>
        <div><span>不推送</span><strong>{reviewItems.filter((item) => item.status === '不推送').length}</strong><small>相关性或可信度不足</small></div>
      </section>
      <section className="panel review-panel">
        <div className="panel-title"><div><h2>内容审核列表</h2><p>AI 完成初筛，领域编辑负责最终推送判断。</p></div><span>{reviewItems.length} 条记录</span></div>
        <div className="table-scroll">
          <table>
            <thead><tr><th>内容标题</th><th>摘要状态 / 标签</th><th>相关性</th><th>审核状态</th><th>推送对象</th><th>操作</th></tr></thead>
            <tbody>
              {reviewItems.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.title}</strong><small>{item.source}</small></td>
                  <td><span className="summary-state">{item.summaryStatus}</span><div className="table-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></td>
                  <td><strong className="table-score">{item.relevance}</strong><small>/ 100</small></td>
                  <td><StatusBadge status={item.status} /></td>
                  <td>{item.audience.join('、')}</td>
                  <td>
                    <div className="table-actions">
                      <button title="通过" onClick={() => onUpdate(item.id, '已通过')}>✓</button>
                      <button title="需修改" onClick={() => onUpdate(item.id, '需修改')}>修</button>
                      <button title="不推送" onClick={() => onUpdate(item.id, '不推送')}>×</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <div className="section-title-row config-title"><div><h2>后台配置</h2><span>让内容生产从人工经验变成可管理规则</span></div></div>
      <section className="config-grid">
        {backendConfigs.map((item) => (
          <article key={item.title}><span>{item.icon}</span><div><h3>{item.title}</h3><strong>{item.value}</strong><p>{item.description}</p></div><button aria-label={`配置${item.title}`}>›</button></article>
        ))}
      </section>
    </>
  )
}

function StatusBadge({ status }: { status: ReviewStatus }) {
  const classes: Record<ReviewStatus, string> = {
    待审核: 'pending', 已通过: 'approved', 需修改: 'revision', 不推送: 'rejected',
  }
  return <span className={`status-badge ${classes[status]}`}>{status}</span>
}

function DashboardPage() {
  return (
    <>
      <section className="dashboard-hero">
        <div><span className="banner-kicker">今日系统成效</span><h2>从 128 条信息中，筛出 8 条真正值得团队关注的研发启发</h2><p>核心价值不在“推送了多少”，而在“有多少进入了下一步行动”。</p></div>
        <div className="dashboard-date"><span>统计周期</span><strong>2026.07.09</strong><small>较昨日实时更新</small></div>
      </section>
      <section className="dashboard-stat-grid">
        <DashboardStat value="128" unit="条" label="今日抓取内容" delta="+12%" />
        <DashboardStat value="8" unit="条" label="入选今日简报" delta="精选 6.25%" />
        <DashboardStat value="86" unit="分" label="平均游戏相关性" delta="+4 分" />
        <DashboardStat value="72" unit="%" label="有用反馈率" delta="+6%" />
        <DashboardStat value="3" unit="条" label="转为预研" delta="+1" />
        <DashboardStat value="4.5" unit="h / 天" label="节省人工整理时间" delta="约 1.5 人日 / 周" />
      </section>
      <section className="metric-grid">
        {metricGroups.map((group, groupIndex) => (
          <article className="metric-card" key={group.title}>
            <div className="metric-title">
              <span>{['质', '用', '值'][groupIndex]}</span>
              <div><h2>{group.title}</h2><p>{group.description}</p></div>
            </div>
            <div className="metric-list">
              {group.metrics.map((metric) => (
                <div key={metric.label}>
                  <div><span>{metric.label}</span><strong>{metric.display}</strong></div>
                  <div className="progress-track"><i style={{ width: `${metric.value}%` }} /></div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
      <section className="value-chain">
        <div className="panel-title"><div><h2>情报价值链路</h2><p>系统持续追踪内容如何从“被看到”转化为“被使用”。</p></div></div>
        <div className="chain-row">
          <div><span>128</span><strong>外部信息</strong><small>抓取与去重</small></div><i>›</i>
          <div><span>8</span><strong>精选简报</strong><small>相关性判断</small></div><i>›</i>
          <div><span>31</span><strong>收藏 / 有用</strong><small>用户反馈</small></div><i>›</i>
          <div><span>3</span><strong>转为预研</strong><small>进入行动</small></div><i>›</i>
          <div><span>6</span><strong>能力沉淀</strong><small>组织知识</small></div>
        </div>
      </section>
    </>
  )
}

function DashboardStat({ value, unit, label, delta }: {
  value: string; unit: string; label: string; delta: string
}) {
  return <article><div><strong>{value}</strong><span>{unit}</span></div><p>{label}</p><small>{delta}</small></article>
}

export default App
