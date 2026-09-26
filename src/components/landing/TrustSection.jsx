import { Link } from 'react-router-dom'

function TrustSection() {
  return (
    <section className="spotlight-section">
      <div className="spotlight-copy">
        <span className="eyebrow eyebrow--dark">Why residents trust us</span>
        <h2>Built for fast action and neighborhood visibility.</h2>
        <p>
          From streetlight failures to suspicious activity, YabaSafe gives residents a credible way
          to share issues and keep each other informed.
        </p>
        <ul className="check-list">
          <li>Live view of active incidents and emergency updates</li>
          <li>Clear status tracking from report to resolution</li>
          <li>Simple, secure reporting designed for local communities</li>
        </ul>
      </div>

      <div className="spotlight-panel">
        <div className="panel-topline">
          <h3>Incident feed</h3>
          <Link to="/map">View map</Link>
        </div>

        <div className="feed-list">
          <div className="feed-item">
            <span className="feed-dot feed-dot--red" />
            <div>
              <strong>Suspicious movement</strong>
              <small>Near Yabatech gate · 2 mins ago</small>
            </div>
            <span className="feed-badge feed-badge--red">High</span>
          </div>

          <div className="feed-item">
            <span className="feed-dot feed-dot--amber" />
            <div>
              <strong>Streetlight outage</strong>
              <small>Herbert Macaulay Road · 11 mins ago</small>
            </div>
            <span className="feed-badge feed-badge--amber">Medium</span>
          </div>

          <div className="feed-item">
            <span className="feed-dot feed-dot--green" />
            <div>
              <strong>Traffic obstruction</strong>
              <small>Market junction · 24 mins ago</small>
            </div>
            <span className="feed-badge feed-badge--green">Low</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustSection
