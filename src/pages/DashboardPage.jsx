import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SidebarNav from '../components/dashboard/SidebarNav'
import IncidentFeed from '../components/dashboard/IncidentFeed'
import MapOverviewCard from '../components/dashboard/MapOverviewCard'
import ResponseTeams from '../components/dashboard/ResponseTeams'
import SafetyTrend from '../components/dashboard/SafetyTrend'

function DashboardPage({ reports = [], user = { name: 'Ada Okafor' }, metrics, onLogout }) {
  const [query, setQuery] = useState('')

  const visibleReports = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return reports
    return reports.filter(
      (report) =>
        report.title.toLowerCase().includes(term) ||
        report.location.toLowerCase().includes(term) ||
        report.type.toLowerCase().includes(term),
    )
  }, [query, reports])

  const summary = useMemo(() => {
    const counts = { High: 0, Medium: 0, Low: 0 }
    reports.forEach((report) => {
      if (counts[report.severity] !== undefined) {
        counts[report.severity] += 1
      }
    })

    return [
      counts.High * 18 + 8,
      counts.Medium * 16 + 12,
      counts.Low * 14 + 18,
      counts.High * 12 + 26,
      counts.Medium * 14 + 20,
      counts.Low * 18 + 16,
    ]
  }, [reports])

  const stats = [
    { label: 'Open incidents', value: String(metrics?.open ?? visibleReports.length), tone: 'accent' },
    { label: 'Resolved today', value: String(metrics?.resolved ?? 0), tone: 'success' },
    { label: 'Avg. response', value: '8 min', tone: 'warning' },
    { label: 'High alerts', value: String(metrics?.alerts ?? 0), tone: 'neutral' },
  ]

  return (
    <div className="app-shell container-fluid px-3 px-md-4">
      <SidebarNav onLogout={onLogout} />

      <main className="content-area">
        <header className="content-header">
          <div>
            <span className="eyebrow">Resident dashboard</span>
            <h1>{metrics?.statusLabel ?? 'Good evening'}, {user?.name?.split(' ')[0] ?? 'Ada'}.</h1>
          </div>

          <div className="header-actions">
            <input
              type="search"
              className="search-pill"
              value={query}
              placeholder="Search incidents"
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search incidents"
            />
            <Link to="/account" className="profile-pill" aria-label="Open account settings">
              {(user?.name || 'AD').slice(0, 2).toUpperCase()}
            </Link>
          </div>
        </header>

        <section className="stats-grid">
          {stats.map((stat) => (
            <article key={stat.label} className={`mini-stat mini-stat--${stat.tone}`}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </section>

        <section className="dashboard-grid">
          <IncidentFeed visibleReports={visibleReports} />
          <MapOverviewCard />
        </section>

        <section className="bottom-grid">
          <ResponseTeams />
          <SafetyTrend summary={summary} />
        </section>
      </main>
    </div>
  )
}

export default DashboardPage
