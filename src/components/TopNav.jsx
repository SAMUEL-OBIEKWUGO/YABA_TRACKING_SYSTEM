import { Link } from 'react-router-dom'

function TopNav() {
  return (
    <header className="main-header navbar navbar-expand-lg px-3 px-md-4 py-3">
      <div className="container-fluid g-0 align-items-center">
        <Link className="brand navbar-brand me-3 me-lg-4" to="/" aria-label="YabaSafe home">
          <div className="brand-mark">Y</div>
          <div className="brand-copy">
            <span className="brand-name">YabaSafe</span>
          </div>
        </Link>

        <button
          className="navbar-toggler border-0 ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <nav className="main-nav navbar-nav mx-auto align-items-lg-center gap-lg-2" aria-label="Main navigation">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
            <Link className="nav-link" to="/map">Live map</Link>
            <Link className="nav-link" to="/report">Report</Link>
            <Link className="nav-link" to="/login">Login</Link>
          </nav>

          <div className="nav-buttons d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-2 ms-lg-3">
            <Link className="btn btn--secondary" to="/login">
              Sign in
            </Link>
            <Link className="btn btn--primary" to="/report">
              Report incident
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopNav
