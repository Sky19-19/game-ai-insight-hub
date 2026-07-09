import type { NewsItem } from './types'

export function filterNews(news: NewsItem[], role: string, tag: string) {
  return news.filter((item) => {
    const roleMatches = role === '全部岗位' || item.roles.includes(role)
    const tagMatches = tag === '全部标签' || item.tags.includes(tag)
    return roleMatches && tagMatches
  })
}

export function toggleId(current: Set<string>, id: string) {
  const next = new Set(current)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  return next
}

export function parseSavedIds(raw: string | null) {
  if (!raw) return new Set<string>()
  try {
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed)
      ? new Set(parsed.filter((item): item is string => typeof item === 'string'))
      : new Set<string>()
  } catch {
    return new Set<string>()
  }
}
