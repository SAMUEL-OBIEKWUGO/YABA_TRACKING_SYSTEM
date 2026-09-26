function AlertList({ reports, selectedId, setSelectedId, selectedReport }) {
  return (
    <div className="alert-list">
      {reports.length ? (
        reports.map((incident) => (
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
  )
}

export default AlertList
