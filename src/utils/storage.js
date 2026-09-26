const REPORT_KEY = 'yabasafe_reports'
const SESSION_KEY = 'yabasafe_session'

export const defaultReports = [
  {
    id: 1,
    title: 'Suspicious movement near Yabatech gate',
    type: 'Suspicious activity',
    description: 'Two individuals are moving around the ATM area and checking parked vehicles.',
    location: 'Herbert Macaulay Road, Yaba',
    severity: 'High',
    time: '2 mins ago',
    status: 'Investigating',
    submittedAt: '2026-09-12T08:10:00.000Z',
  },
  {
    id: 2,
    title: 'Streetlight outage on Herbert Macaulay Road',
    type: 'Streetlight outage',
    description: 'Several streetlights are off near the bus stop and walkway.',
    location: 'Yaba Market, Lagos',
    severity: 'Medium',
    time: '14 mins ago',
    status: 'Assigned',
    submittedAt: '2026-09-12T08:20:00.000Z',
  },
  {
    id: 3,
    title: 'Traffic obstruction around market junction',
    type: 'Traffic obstruction',
    description: 'A broken-down vehicle is blocking one lane near the market entrance.',
    location: 'Market junction, Yaba',
    severity: 'Low',
    time: '27 mins ago',
    status: 'Resolved',
    submittedAt: '2026-09-12T08:30:00.000Z',
  },
]

export function readReports() {
  if (typeof window === 'undefined') return defaultReports

  try {
    const stored = window.localStorage.getItem(REPORT_KEY)
    if (!stored) return defaultReports
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) && parsed.length ? parsed : defaultReports
  } catch {
    return defaultReports
  }
}

export function saveReports(reports) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(REPORT_KEY, JSON.stringify(reports))
}

export function saveSession(session) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function readSession() {
  if (typeof window === 'undefined') return null

  try {
    const stored = window.localStorage.getItem(SESSION_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function getStatusTone(status) {
  const normalized = String(status || '').toLowerCase()
  if (normalized.includes('resolve') || normalized.includes('safe')) return 'success'
  if (normalized.includes('invest') || normalized.includes('alert')) return 'danger'
  if (normalized.includes('assign') || normalized.includes('route')) return 'primary'
  return 'warning'
}
