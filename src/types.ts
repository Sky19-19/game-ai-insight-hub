export type Difficulty = '低' | '中' | '高'
export type ReviewStatus = '待审核' | '已通过' | '需修改' | '不推送'
export type Priority = 'P0' | 'P1' | 'P2'
export type PageId = 'brief' | 'subscriptions' | 'capabilities' | 'scenarios' | 'review' | 'dashboard'

export interface NewsItem {
  id: string
  title: string
  source: string
  publishedAt: string
  summary: string
  gameRelation: string
  roles: string[]
  tags: string[]
  relevance: number
  difficulty: Difficulty
  action: string
  usefulCount: number
}

export interface RoleSubscription {
  role: string
  code: string
  description: string
  focus: string[]
  frequency: string
  contentTypes: string[]
  example: string
}

export interface CapabilityCard {
  id: string
  name: string
  description: string
  technology: string
  scenarios: string[]
  roles: string[]
  difficulty: Difficulty
  risks: string[]
  action: string
  caseStudy: string
  maturity: number
}

export interface ApplicationScenario {
  id: string
  category: '研发流程提效' | '游戏内能力嵌入'
  name: string
  description: string
  roles: string[]
  value: string
  risk: string
  priority: Priority
}

export interface ReviewItem {
  id: string
  title: string
  source: string
  summaryStatus: string
  tags: string[]
  relevance: number
  status: ReviewStatus
  audience: string[]
}

export interface Metric {
  label: string
  value: number
  display: string
}

export interface MetricGroup {
  title: string
  description: string
  metrics: Metric[]
}
