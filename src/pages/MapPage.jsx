import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const filterOptions = ['All', 'High', 'Medium', 'Low']

function MapPage({ reports = [] }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  const filteredReports = useMemo(() => {
    const term = search.trim().toLowerCase()
    return reports.filter((report) => {
      const matchesFilter = activeFilter === 'All' || report.severity === activeFilter
      const matchesSearch =
        !term ||
        report.title.toLowerCase().includes(term) ||
        report.location.toLowerCase().includes(term) ||
        report.type.toLowerCase().includes(term)

      return matchesFilter && matchesSearch
    })
  }, [activeFilter, reports, search])

  useEffect(() => {
    if (!filteredReports.length) {
      setSelectedId(null)
      return
    }

    if (!selectedId || !filteredReports.some((report) => report.id === selectedId)) {
      setSelectedId(filteredReports[0].id)
    }
  }, [filteredReports, selectedId])

  const selectedReport = filteredReports.find((report) => report.id === selectedId) || filteredReports[0]

  return (
    <div className="map-page-shell container-fluid px-3 px-md-4">
      <header className="map-header">
        <div className="brand">
          <div className="brand__mark">Y</div>
          <span className="brand__name">YabaSafe</span>
        </div>

        <div className="map-header__controls">
          <input
            type="search"
            className="search-pill"
            placeholder="Filter by area"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Filter map alerts"
          />
          <Link className="btn btn--primary" to="/report">
            Report issue
          </Link>
        </div>
      </header>

      <main className="map-content">
        <section className="map-panel">
          <div className="map-panel__header">
            <div>
              <span className="eyebrow">Live security map</span>
              <h1>Yaba neighborhood overview</h1>
            </div>
            <span className="status-badge status-badge--green">All systems online</span>
          </div>

          <div className="map-filter-row" aria-label="Incident filters">
            {filterOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={activeFilter === option ? 'map-filter is-active' : 'map-filter'}
                onClick={() => setActiveFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="map-canvas" aria-label="Security map">
            <span className="map-tag map-tag--one">Market</span>
            <span className="map-tag map-tag--two">School</span>
            <span className="map-tag map-tag--three">Central</span>
            <span className="marker marker--one" />
            <span className="marker marker--two" />
            <span className="marker marker--three" />
            <span className="marker marker--four" />
            <span className="route-line route-line--one" />
            <span className="route-line route-line--two" />
          </div>
        </section>

        <aside className="map-sidebar panel">
          <div className="panel-header">
            <h2>Active alerts</h2>
            <span>{filteredReports.length}</span>
          </div>

          <div className="alert-list">
            {filteredReports.length ? (
              filteredReports.map((incident) => (
                <button
                  key={incident.id || incident.title}
                  type="button"
                  className={selectedReport && selectedReport.id === incident.id ? 'alert-item is-selected' : 'alert-item'}
                  onClick={() => setSelectedId(incident.id)}
                >
                  <div className={`alert-icon alert-icon--${incident.severity.toLowerCase()}`} />
                  <div className="alert-copy">
                    <strong>{incident.location}</strong>
                    <span>{incident.type}</span>
                    <small>{incident.time || 'Just now'}</small>
                  </div>
                  <span className={`severity severity--${incident.severity.toLowerCase()}`}>
                    {incident.severity}
                  </span>
                </button>
              ))
            ) : (
              <div className="empty-state">No alerts match this view.</div>
            )}
          </div>

          {selectedReport && (
            <div className="map-detail">
              <span className="eyebrow">Selected incident</span>
              <h3>{selectedReport.title}</h3>
              <p>{selectedReport.description}</p>
              <div className="map-detail__meta">
                <span>{selectedReport.location}</span>
                <span>{selectedReport.status}</span>
              </div>
            </div>
          )}
        </aside>
      </main>
    </div>
  )
}

export default MapPage
