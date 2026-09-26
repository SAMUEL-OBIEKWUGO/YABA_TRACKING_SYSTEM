function WorkflowBoard({ cards }) {
  return (
    <section className="workflow-board">
      {cards.map((card) => (
        <article
          key={card.id}
          className={`workflow-card workflow-card--${card.accent} workflow-card--${card.type}`}
        >
          <div className="card-header">
            <span className="step-badge">{String(card.id).padStart(2, '0')}</span>
            <span className="card-title">{card.title}</span>
          </div>

          {card.type === 'landing' && (
            <div className="card-body card-body--landing">
              <div className="landing-hero">
                <div className="mini-card mini-card--nav">Landing Page</div>
                <div className="hero-art" />
                <div className="hero-panel">
                  <span className="hero-label">YabaSafe</span>
                  <h4>Making Yaba safer, together.</h4>
                </div>
              </div>
            </div>
          )}

          {card.type === 'auth' && (
            <div className="card-body card-body--auth">
              <div className="auth-box">
                <div className="auth-topline">Login / Sign Up</div>
                <div className="auth-form">
                  <span className="field-line" />
                  <span className="field-line short" />
                  <span className="field-line short" />
                  <button>Login</button>
                </div>
              </div>
            </div>
          )}

          {card.type === 'dashboard' && (
            <div className="card-body card-body--dashboard">
              <div className="stat-row">
                <span className="stat-box" />
                <span className="stat-box" />
                <span className="stat-box" />
              </div>
              <div className="chart-strip" />
            </div>
          )}

          {card.type === 'map' && (
            <div className="card-body card-body--map">
              <div className="map-grid" />
              <div className="map-pin map-pin--one" />
              <div className="map-pin map-pin--two" />
              <div className="map-pin map-pin--three" />
            </div>
          )}

          {card.type === 'report' && (
            <div className="card-body card-body--report">
              <div className="report-box">
                <span className="report-label">Report incident</span>
                <div className="report-form">
                  <span className="field-line full" />
                  <span className="field-line" />
                  <span className="field-line short" />
                </div>
              </div>
            </div>
          )}

          {card.type === 'analytics' && (
            <div className="card-body card-body--analytics">
              <div className="bar-chart">
                <span style={{ height: '40%' }} />
                <span style={{ height: '65%' }} />
                <span style={{ height: '52%' }} />
                <span style={{ height: '82%' }} />
                <span style={{ height: '58%' }} />
              </div>
            </div>
          )}
        </article>
      ))}
    </section>
  )
}

export default WorkflowBoard
