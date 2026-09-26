import { Link } from 'react-router-dom'

const alerts = [
  { label: 'Streetlight outage', time: '8 min ago', tone: 'amber' },
  { label: 'Suspicious vehicle activity', time: '12 min ago', tone: 'red' },
  { label: 'Traffic obstruction', time: '24 min ago', tone: 'green' },
]

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <span className="eyebrow">Neighborhood security for Yaba</span>
        <h1>Safer streets start when the community responds together.</h1>
        <p>
          YabaSafe helps residents report urgent issues, track local response activity, and stay
          informed about what is happening across the neighborhood in real time.
        </p>

        <div className="hero-actions">
          <Link className="btn btn--primary" to="/report">
            Report an incident
          </Link>
          <Link className="btn btn--secondary light" to="/dashboard">
            View dashboard
          </Link>
        </div>

        <div className="social-proof">
          <div className="avatar-group" aria-label="Community members">
            <span>A</span>
            <span>B</span>
            <span>C</span>
          </div>
          <span>2,400 residents actively reporting</span>
        </div>
      </div>

      <div className="hero-visual" aria-label="Safety dashboard preview">
        <div className="status-tag">Live response</div>

        <div className="map-card">
          <div className="map-card__top">
            <div>
              <span className="tiny-label">Reporting overview</span>
              <strong>Yaba community</strong>
            </div>
            <span className="live-pill">LIVE</span>
          </div>

          <div className="mini-map">
            <span className="pin pin--amber" />
            <span className="pin pin--green" />
            <span className="pin pin--red" />
            <span className="route route--one" />
            <span className="route route--two" />
          </div>

          <div className="mini-summary">
            <div>
              <strong>8</strong>
              <span>Open issues</span>
            </div>
            <div>
              <strong>4</strong>
              <span>Responders</span>
            </div>
            <div>
              <strong>3 min</strong>
              <span>Avg. dispatch</span>
            </div>
          </div>
        </div>

        <div className="alert-card">
          <div className="alert-card__header">
            <span className="tiny-label">Latest alerts</span>
            <span className="dot-dot" />
          </div>

          {alerts.map((alert) => (
            <div key={alert.label} className="alert-row">
              <div className={`alert-marker alert-marker--${alert.tone}`} />
              <div className="alert-copy">
                <strong>{alert.label}</strong>
                <small>{alert.time}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
