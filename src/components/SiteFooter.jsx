import { Link } from 'react-router-dom'

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <span className="footer-brand">YabaSafe</span>
        <small>Stay Alert. Stay Safe. Stay Together.</small>
      </div>
      <div className="footer-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/map">Live map</Link>
        <Link to="/report">Report</Link>
        <Link to="/login">Login</Link>
      </div>
    </footer>
  )
}

export default SiteFooter
