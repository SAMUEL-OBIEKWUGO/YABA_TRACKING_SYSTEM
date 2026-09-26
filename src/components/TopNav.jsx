import { Link } from 'react-router-dom'

function TopNav() {
  return (
    <header className="main-header">
      <div className="brand" aria-label="YabaSafe home">
        <div className="brand-mark">Y</div>
        <div className="brand-copy">
          <span className="brand-name">YabaSafe</span>
        </div>
      </div>

      <nav className="main-nav" aria-label="Main navigation">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/map">Live map</Link>
        <Link to="/report">Report</Link>
        <Link to="/login">Login</Link>
      </nav>

      <div className="nav-buttons">
        <Link className="btn btn--secondary" to="/login">
          Sign in
        </Link>
        <Link className="btn btn--primary" to="/report">
          Report incident
        </Link>
      </div>
    </header>
  )
}

export default TopNav
