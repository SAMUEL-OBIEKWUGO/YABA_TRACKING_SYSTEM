import { Link } from 'react-router-dom'

function SidebarNav() {
  return (
    <aside className="side-nav">
      <div className="brand side-nav__brand">
        <div className="brand__mark">Y</div>
        <span className="brand__name">YabaSafe</span>
      </div>

      <nav className="side-nav__links" aria-label="Sidebar navigation">
        <Link className="active" to="/dashboard">Overview</Link>
        <Link to="/map">Live map</Link>
        <Link to="/report">Report</Link>
        <Link to="/">Home</Link>
      </nav>

      <div className="side-nav__cta">
        <span>Need urgent help?</span>
        <Link className="btn btn--primary btn--block" to="/report">
          New report
        </Link>
      </div>
    </aside>
  )
}

export default SidebarNav
