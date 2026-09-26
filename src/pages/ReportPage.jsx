import { useState } from 'react'
import { Link } from 'react-router-dom'

const checklist = [
  'Location is visible and precise',
  'Provide photos or short video if safe',
  'Mention nearby landmarks or landmarks',
  'Share emergency contact details only if needed',
]

const defaultForm = {
  type: 'Suspicious activity',
  severity: 'High',
  location: 'Herbert Macaulay Road, Yaba',
  description:
    'Two individuals are moving around the ATM area and seem to be checking parked vehicles. One person appears to be recording nearby houses.',
}

function ReportPage({ onSubmitReport }) {
  const [form, setForm] = useState(defaultForm)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.location.trim() || !form.description.trim()) {
      setError('Please include a location and description before submitting.')
      return
    }

    setError('')
    const report = {
      id: Date.now(),
      title: `${form.type} near ${form.location}`,
      type: form.type,
      severity: form.severity,
      location: form.location,
      description: form.description,
      status: form.severity === 'High' ? 'Investigating' : form.severity === 'Medium' ? 'Assigned' : 'Resolved',
      time: 'Just now',
      submittedAt: new Date().toISOString(),
    }

    onSubmitReport?.(report)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="report-page-shell">
        <header className="report-header">
          <div className="brand">
            <div className="brand__mark">Y</div>
            <span className="brand__name">YabaSafe</span>
          </div>
        </header>

        <main className="report-content report-content--success">
          <div className="success-banner">
            <div className="success-check">✓</div>
            <div>
              <span className="eyebrow">Report submitted</span>
              <h1>Thanks for keeping Yaba informed.</h1>
              <p>Your report has been logged and the response team has been notified.</p>
            </div>
            <div className="form-actions compact">
              <Link className="btn btn--primary" to="/dashboard">
                View dashboard
              </Link>
              <Link className="btn btn--secondary" to="/map">
                Live map
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="report-page-shell container-fluid px-3 px-md-4">
      <header className="report-header">
        <div className="brand">
          <div className="brand__mark">Y</div>
          <span className="brand__name">YabaSafe</span>
        </div>

        <div className="report-header__actions">
          <Link className="btn btn--ghost" to="/dashboard">
            Dashboard
          </Link>
          <Link className="btn btn--primary" to="/map">
            View map
          </Link>
        </div>
      </header>

      <main className="report-content">
        <section className="report-card report-card--form">
          <div className="panel-header">
            <div>
              <span className="eyebrow">Report incident</span>
              <h1>Share what is happening</h1>
            </div>
            <span className="status-badge status-badge--amber">Urgency check</span>
          </div>

          <form className="incident-form" onSubmit={handleSubmit}>
            <div className="field-grid">
              <label>
                Incident type
                <select name="type" value={form.type} onChange={handleChange}>
                  <option>Suspicious activity</option>
                  <option>Traffic obstruction</option>
                  <option>Streetlight outage</option>
                  <option>Medical emergency</option>
                </select>
              </label>

              <label>
                Severity
                <select name="severity" value={form.severity} onChange={handleChange}>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </label>
            </div>

            <label>
              Location
              <input name="location" type="text" value={form.location} onChange={handleChange} placeholder="Location" />
            </label>

            <label>
              Description
              <textarea
                name="description"
                rows="5"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe what you saw"
              />
            </label>

            <div className="upload-box">
              <span>Attach photo or video</span>
              <button type="button">Browse files</button>
            </div>

            {error && <div className="form-error">{error}</div>}

            <div className="form-actions">
              <button type="button" className="btn btn--ghost" onClick={() => setForm(defaultForm)}>
                Reset
              </button>
              <button type="submit" className="btn btn--primary">
                Submit report
              </button>
            </div>
          </form>
        </section>

        <aside className="report-card report-card--side">
          <div className="panel-header">
            <h2>Safety checklist</h2>
          </div>

          <ul className="check-list check-list--stacked">
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="response-box">
            <span className="eyebrow">Dispatch update</span>
            <strong>Response team en route</strong>
            <p>Estimated arrival: 8 minutes</p>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default ReportPage
