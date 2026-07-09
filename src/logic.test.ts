import { describe, expect, it } from 'vitest'
import { filterNews, parseSavedIds, toggleId } from './logic'
import type { NewsItem } from './types'

const sampleNews = [
  { id: 'npc', roles: ['策划', '程序'], tags: ['AI NPC'] },
  { id: 'art', roles: ['美术 / TA'], tags: ['3D资产'] },
] as NewsItem[]

describe('filterNews', () => {
  it('同时按岗位和标签筛选新闻', () => {
    expect(filterNews(sampleNews, '策划', 'AI NPC')).toEqual([sampleNews[0]])
    expect(filterNews(sampleNews, '美术 / TA', 'AI NPC')).toEqual([])
  })

  it('全部条件保留所有新闻', () => {
    expect(filterNews(sampleNews, '全部岗位', '全部标签')).toEqual(sampleNews)
  })
})

describe('toggleId', () => {
  it('切换集合中的项目状态', () => {
    expect(toggleId(new Set(['npc']), 'npc')).toEqual(new Set())
    expect(toggleId(new Set(), 'npc')).toEqual(new Set(['npc']))
  })
})

describe('parseSavedIds', () => {
  it('恢复合法收藏并忽略损坏数据', () => {
    expect(parseSavedIds('["npc","art"]')).toEqual(new Set(['npc', 'art']))
    expect(parseSavedIds('{broken')).toEqual(new Set())
  })
})
