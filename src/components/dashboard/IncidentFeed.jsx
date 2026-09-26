function IncidentFeed({ visibleReports }) {
  return (
    <article className="panel panel--wide">
      <div className="panel-header">
        <h2>Live incident feed</h2>
        <a href="/map">Open map</a>
      </div>

      <div className="incident-list">
        {visibleReports.length ? (
          visibleReports.slice(0, 5).map((incident) => (
            <div key={incident.id ?? `${incident.title}-${incident.time}`} className="incident-item">
              <div className={`incident-icon incident-icon--${incident.severity.toLowerCase()}`} />
              <div className="incident-copy">
                <strong>{incident.title}</strong>
                <span>
                  {incident.time ||
                    new Date(incident.submittedAt).toLocaleTimeString([], {
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                </span>
              </div>
              <span className={`severity severity--${incident.severity.toLowerCase()}`}>
                {incident.severity}
              </span>
            </div>
          ))
        ) : (
          <div className="empty-state">No incidents match your search.</div>
        )}
      </div>
    </article>
  )
}

export default IncidentFeed
