import { colorSwatches } from '../data/mockData'

function Sidebar() {
  return (
    <aside className="sidebar-panel">
      <div className="sidebar-brand">
        <div className="brand-mark">⌂</div>
        <div className="brand-name">YabaSafe</div>
      </div>

      <p className="sidebar-tagline">
        A Neighborhood Security Reporting and Tracking System for Yaba, Lagos
      </p>

      <div className="sidebar-block">
        <h3 className="sidebar-title">Project overview</h3>
        <p>
          YabaSafe empowers residents of Yaba, Lagos to report incidents and track response progress in
          real time.
        </p>
      </div>

      <div className="highlight-box">
        <div className="highlight-label">If you see something, say something.</div>
        <div className="highlight-action">Let’s keep Yaba safe.</div>
      </div>

      <div className="sidebar-block">
        <h3 className="sidebar-title">Design goal</h3>
        <p>
          Create a simple, trustworthy and real-time platform that encourages quick reporting,
          transparent communication, and community safety.
        </p>
      </div>

      <div className="sidebar-block">
        <h3 className="sidebar-title">Design system</h3>
        <div className="swatch-grid">
          {colorSwatches.map((swatch) => (
            <div key={swatch.name} className="swatch-item">
              <span className="swatch-color" style={{ background: swatch.value }} />
              <div>
                <span className="swatch-name">{swatch.name}</span>
                <small>{swatch.value}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-block">
        <h3 className="sidebar-title">Typography</h3>
        <div className="type-sample">
          <span className="type-sample-large">A</span>
          <div>
            <strong>Heading 1</strong>
            <small>36 / 48 / 700</small>
          </div>
        </div>
      </div>

      <div className="sidebar-block">
        <h3 className="sidebar-title">Components</h3>
        <div className="component-list">
          <span>Primary Button</span>
          <span>Secondary Button</span>
          <span>Card</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
