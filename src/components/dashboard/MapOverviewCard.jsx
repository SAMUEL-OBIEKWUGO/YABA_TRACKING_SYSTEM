import { Link } from 'react-router-dom'

function MapOverviewCard() {
  return (
    <article className="panel">
      <div className="panel-header">
        <h2>Map overview</h2>
        <Link to="/map">View</Link>
      </div>

      <div className="mini-map" aria-label="Neighborhood map overview">
        <span className="marker marker--one" />
        <span className="marker marker--two" />
        <span className="marker marker--three" />
        <span className="route-line route-line--one" />
        <span className="route-line route-line--two" />
      </div>
    </article>
  )
}

export default MapOverviewCard
