import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useMemo, useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom'

const initialUsers = [
  { id: 1, name: 'Chidi', role: 'Resident', email: 'chidi@yaba.local', location: 'Akoka' },
  { id: 2, name: 'Funmi', role: 'Security Agent', email: 'funmi@yaba.local', location: 'Sabo' },
  { id: 3, name: 'Adewale', role: 'Administrator', email: 'adewale@yaba.local', location: 'Yaba' },
]

const initialIncidents = [
  {
    id: '#YB-104',
    title: 'Suspicious vehicle near Adekunle',
    type: 'Suspicious movement',
    location: 'Adekunle road',
    status: 'Under review',
    assignedTo: 'Funmi',
    createdAt: '12 min ago',
    notes: 'Vehicle has been parked for more than 30 minutes.',
  },
  {
    id: '#YB-103',
    title: 'Stolen bike reported at Akoka road',
    type: 'Theft',
    location: 'Akoka road',
    status: 'Assigned',
    assignedTo: 'Funmi',
    createdAt: '38 min ago',
    notes: 'Witnesses saw a red motorbike near the junction.',
  },
  {
    id: '#YB-102',
    title: 'Street light out at Sabo market',
    type: 'Street light issue',
    location: 'Sabo market',
    status: 'Monitoring',
    assignedTo: 'Funmi',
    createdAt: '1 hr ago',
    notes: 'Two lamps are off on the main pedestrian route.',
  },
]

const zones = [
  { name: 'Sabo', focus: 'Night patrols', risk: 'Medium' },
  { name: 'Dopemu', focus: 'Community watch', risk: 'Low' },
  { name: 'Akoka', focus: 'Rapid response', risk: 'High' },
]

const statusOptions = ['Received', 'Acknowledged', 'In Progress', 'Resolved']

function App() {
  const [user, setUser] = useState(null)
  const [incidents, setIncidents] = useState(initialIncidents)
  const [users, setUsers] = useState(initialUsers)
  const [alert, setAlert] = useState(null)

  const activeIncidents = useMemo(
    () => incidents.filter((item) => item.status !== 'Resolved').length,
    [incidents],
  )

  const unresolvedIncidents = useMemo(
    () => incidents.filter((item) => item.status !== 'Resolved'),
    [incidents],
  )

  const stats = [
    { label: 'Open cases', value: activeIncidents, note: `${unresolvedIncidents.length} incidents active` },
    { label: 'Assigned agents', value: 1, note: 'Latest patrol coverage' },
    { label: 'Average response', value: '7 min', note: 'For last 48 hours' },
  ]

  const showAlert = (type, message) => {
    setAlert({ type, message })
    window.setTimeout(() => setAlert(null), 3200)
  }

  const assignAgent = (location) => {
    const agent = users.find((item) => item.role === 'Security Agent')
    return agent?.name || 'Unassigned'
  }

  const handleReportSubmit = (values) => {
    const nextId = `#YB-${100 + incidents.length + 1}`
    const incident = {
      id: nextId,
      title: values.title || `${values.type} at ${values.location}`,
      type: values.type,
      location: values.location,
      status: 'Received',
      assignedTo: assignAgent(values.location),
      createdAt: 'Just now',
      notes: values.details,
    }
    setIncidents([incident, ...incidents])
    showAlert('success', `Report ${nextId} submitted successfully.`)
  }

  const handleStatusChange = (incidentId, status) => {
    setIncidents((current) =>
      current.map((incident) =>
        incident.id === incidentId ? { ...incident, status } : incident,
      ),
    )
    showAlert('info', `Status updated to ${status}.`)
  }

  const handleLogin = ({ email, password }) => {
    const profile = users.find((item) => item.email === email)
    if (!profile) {
      showAlert('danger', 'User not found. Please register first.')
      return false
    }
    setUser(profile)
    showAlert('success', `Welcome back, ${profile.name}!`)
    return true
  }

  const handleRegister = ({ name, email, role, location }) => {
    const exists = users.some((item) => item.email === email)
    if (exists) {
      showAlert('danger', 'This email is already registered.')
      return false
    }
    const nextUser = {
      id: users.length + 1,
      name,
      role,
      email,
      location,
    }
    setUsers([nextUser, ...users])
    setUser(nextUser)
    showAlert('success', `Account created for ${name}.`)
    return true
  }

  return (
    <BrowserRouter>
      <div className="app-shell container-fluid px-3 px-md-4 py-4">
        <header className="topbar rounded-4 shadow-sm py-3 px-3 px-lg-4 mb-4">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3">
            <div>
              <small className="text-uppercase text-primary fw-semibold">Yaba Security Hub</small>
              <h1 className="display-6 mb-2">Neighbourhood reporting & tracking</h1>
              <p className="text-secondary mb-0">
                Report incidents, follow response updates, and coordinate agents across Yaba's communities.
              </p>
            </div>
            <div className="d-flex flex-column flex-sm-row gap-2 align-items-start align-items-sm-center">
              <NavLink to="/report" className="btn btn-warning btn-lg px-4">
                Report incident
              </NavLink>
              <NavLink to="/auth" className="btn btn-outline-primary btn-lg">
                {user ? `Logged in as ${user.name}` : 'Login / Register'}
              </NavLink>
            </div>
          </div>
        </header>

        <nav className="navbar navbar-expand-lg navbar-light bg-white rounded-4 shadow-sm mb-4">
          <div className="container-fluid px-3">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#appNav"
              aria-controls="appNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="appNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to="/" end className="nav-link">
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/report" className="nav-link">
                    Report
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/track" className="nav-link">
                    Track status
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/agents" className="nav-link">
                    Agent panel
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin" className="nav-link">
                    Administrator
                  </NavLink>
                </li>
              </ul>
              <div className="d-flex gap-2">
                <span className="badge bg-primary align-self-center">{user ? user.role : 'Guest'}</span>
              </div>
            </div>
          </div>
        </nav>

        {alert && (
          <div className={`alert alert-${alert.type} rounded-4 shadow-sm`} role="alert">
            {alert.message}
          </div>
        )}

        <Routes>
          <Route path="/" element={<Dashboard stats={stats} incidents={incidents} zones={zones} user={user} />} />
          <Route path="/report" element={<ReportPage onSubmit={handleReportSubmit} />} />
          <Route path="/track" element={<TrackPage incidents={incidents} />} />
          <Route
            path="/agents"
            element={<AgentPanel incidents={incidents} onStatusChange={handleStatusChange} user={user} />}
          />
          <Route path="/admin" element={<AdminPanel users={users} incidents={incidents} />} />
          <Route
            path="/auth"
            element={<AuthPage onLogin={handleLogin} onRegister={handleRegister} user={user} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

function Dashboard({ stats, incidents, zones, user }) {
  return (
    <>
      <section className="row g-4 mb-4">
        <div className="col-12 col-lg-8">
          <div className="card card-modern h-100 p-4">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h2 className="h4">Community status overview</h2>
                <p className="text-muted mb-0">Live incident and response tracking across Yaba neighbourhoods.</p>
              </div>
              <span className="badge bg-success">{user ? `Welcome back, ${user.name}` : 'Guest mode'}</span>
            </div>
            <div className="row g-3">
              {stats.map((stat) => (
                <div className="col-12 col-md-4" key={stat.label}>
                  <div className="status-card p-3 rounded-4 h-100">
                    <h3 className="mb-2">{stat.value}</h3>
                    <p className="mb-1 fw-semibold">{stat.label}</p>
                    <small className="text-muted">{stat.note}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card card-modern p-4 h-100">
            <h2 className="h5 mb-3">Patrol zones</h2>
            <div className="row gy-3">
              {zones.map((zone) => (
                <div className="col-12" key={zone.name}>
                  <div className="zone-card p-3 rounded-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="mb-0">{zone.name}</h5>
                      <span className="badge bg-secondary">{zone.risk}</span>
                    </div>
                    <p className="mb-0 text-muted">{zone.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="row g-4">
        <div className="col-12 col-xl-8">
          <div className="card card-modern p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h2 className="h5 mb-1">Recent incident feed</h2>
                <p className="text-muted mb-0">Track the latest reports and response status.</p>
              </div>
              <span className="badge bg-warning text-dark">Updated now</span>
            </div>
            <div className="list-group">
              {incidents.map((incident) => (
                <div key={incident.id} className="list-group-item rounded-4 mb-3 border-0 shadow-sm">
                  <div className="d-flex justify-content-between flex-column flex-md-row align-items-start align-items-md-center gap-3">
                    <div>
                      <small className="text-uppercase text-primary fw-semibold">{incident.id}</small>
                      <h3 className="h6 mb-1">{incident.title}</h3>
                      <p className="mb-1 text-muted">{incident.location} · {incident.type}</p>
                      <small className="text-muted">{incident.notes}</small>
                    </div>
                    <div className="text-end">
                      <span className={`badge ${badgeClass(incident.status)} mb-2`}>{incident.status}</span>
                      <p className="mb-0 text-secondary">{incident.createdAt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="card card-modern p-4 h-100">
            <h2 className="h5 mb-3">How the system works</h2>
            <ol className="timeline-list ps-3">
              <li>Resident reports incident using the form.</li>
              <li>System classifies and assigns the nearest security agent.</li>
              <li>Agent updates statuses through the dashboard.</li>
              <li>Resident tracks progress by reference number.</li>
              <li>Feedback closes the incident when resolved.</li>
            </ol>
          </div>
        </div>
      </section>
    </>
  )
}

function ReportPage({ onSubmit }) {
  const [values, setValues] = useState({ location: '', type: '', title: '', details: '' })
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!values.location || !values.type || !values.details) {
      return
    }
    onSubmit(values)
    setValues({ location: '', type: '', title: '', details: '' })
    navigate('/')
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-8">
        <div className="card card-modern p-4 shadow-sm">
          <h2 className="h4 mb-3">Report a new incident</h2>
          <p className="text-muted mb-4">Submit details so the response team can act quickly.</p>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label">Location</label>
              <input
                className="form-control"
                name="location"
                value={values.location}
                onChange={handleChange}
                placeholder="e.g. Adekunle road"
              />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label">Type of incident</label>
              <select name="type" className="form-select" value={values.type} onChange={handleChange}>
                <option value="">Select incident type</option>
                <option>Suspicious movement</option>
                <option>Vehicle break-in</option>
                <option>Street light issue</option>
                <option>Medical emergency</option>
                <option>Theft</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label">Incident title</label>
              <input
                className="form-control"
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="Optional short description"
              />
            </div>
            <div className="col-12">
              <label className="form-label">Details</label>
              <textarea
                className="form-control"
                rows="5"
                name="details"
                value={values.details}
                onChange={handleChange}
                placeholder="Describe what happened and any safety concerns."
              />
            </div>
            <div className="col-12 d-flex justify-content-between align-items-center gap-2">
              <button type="submit" className="btn btn-primary btn-lg">
                Submit report
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function TrackPage({ incidents }) {
  const [reference, setReference] = useState('')
  const incident = incidents.find((item) => item.id.toLowerCase() === reference.toLowerCase())

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-10">
        <div className="card card-modern p-4 shadow-sm">
          <h2 className="h4 mb-3">Track your incident</h2>
          <p className="text-muted mb-4">Enter a report reference to see its current status.</p>
          <div className="mb-4">
            <label className="form-label">Reference number</label>
            <input
              className="form-control"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="#YB-104"
            />
          </div>

          {reference && (
            <div className="card card-body rounded-4 border-0 shadow-sm">
              {incident ? (
                <div>
                  <h3 className="h5 mb-2">{incident.title}</h3>
                  <p className="text-muted mb-1">Location: {incident.location}</p>
                  <p className="text-muted mb-1">Type: {incident.type}</p>
                  <p className="mb-2">Assigned to: {incident.assignedTo}</p>
                  <span className={`badge ${badgeClass(incident.status)} fs-7 mb-2`}>{incident.status}</span>
                  <p className="text-muted mb-0">{incident.notes}</p>
                </div>
              ) : (
                <p className="text-danger">Reference not found. Make sure the ID is correct.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function AgentPanel({ incidents, onStatusChange, user }) {
  return (
    <div className="row justify-content-center">
      <div className="col-12">
        <div className="card card-modern p-4 shadow-sm">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
            <div>
              <h2 className="h4 mb-1">Agent response dashboard</h2>
              <p className="text-muted mb-0">Update incident progress and keep residents informed.</p>
            </div>
            <span className="badge bg-info text-dark">{user?.role || 'Agent view'}</span>
          </div>

          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">Reference</th>
                  <th scope="col">Incident</th>
                  <th scope="col">Location</th>
                  <th scope="col">Assigned</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((incident) => (
                  <tr key={incident.id} className="align-middle">
                    <td>{incident.id}</td>
                    <td>{incident.title}</td>
                    <td>{incident.location}</td>
                    <td>{incident.assignedTo}</td>
                    <td>
                      <span className={`badge ${badgeClass(incident.status)}`}>{incident.status}</span>
                    </td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={incident.status}
                        onChange={(event) => onStatusChange(incident.id, event.target.value)}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminPanel({ users, incidents }) {
  const totals = useMemo(
    () => ({
      residents: users.filter((item) => item.role === 'Resident').length,
      agents: users.filter((item) => item.role === 'Security Agent').length,
      reports: incidents.length,
      resolved: incidents.filter((item) => item.status === 'Resolved').length,
    }),
    [users, incidents],
  )

  return (
    <div className="row g-4">
      <div className="col-12 col-xl-4">
        <div className="card card-modern p-4 shadow-sm h-100">
          <h2 className="h5 mb-3">Admin summary</h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center">
              Registered residents <span className="fw-semibold">{totals.residents}</span>
            </li>
            <li className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center">
              Active agents <span className="fw-semibold">{totals.agents}</span>
            </li>
            <li className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center">
              Total reports <span className="fw-semibold">{totals.reports}</span>
            </li>
            <li className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center">
              Resolved cases <span className="fw-semibold">{totals.resolved}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-12 col-xl-8">
        <div className="card card-modern p-4 shadow-sm">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h2 className="h5 mb-1">User & report details</h2>
              <p className="text-muted mb-0">A quick view of residents, agents, and incident status.</p>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <div className="rounded-4 p-3 border bg-light h-100">
                <h3 className="h6">Recent registrants</h3>
                <ul className="list-unstyled mb-0">
                  {users.slice(0, 4).map((profile) => (
                    <li key={profile.id} className="py-2 border-bottom">
                      <strong>{profile.name}</strong>
                      <div className="small text-muted">{profile.role}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="rounded-4 p-3 border bg-light h-100">
                <h3 className="h6">Latest issues</h3>
                <ul className="list-unstyled mb-0">
                  {incidents.slice(0, 4).map((incident) => (
                    <li key={incident.id} className="py-2 border-bottom">
                      <span className="d-block fw-semibold">{incident.id}</span>
                      <small className="text-muted">{incident.title}</small>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AuthPage({ onLogin, onRegister, user }) {
  const [mode, setMode] = useState('login')
  const [loginValues, setLoginValues] = useState({ email: '', password: '' })
  const [registerValues, setRegisterValues] = useState({ name: '', email: '', role: 'Resident', location: '' })

  const handleLoginSubmit = (event) => {
    event.preventDefault()
    onLogin(loginValues)
  }

  const handleRegisterSubmit = (event) => {
    event.preventDefault()
    onRegister(registerValues)
  }

  if (user) {
    return (
      <div className="card card-modern p-4 shadow-sm text-center">
        <h2 className="h4">You are logged in</h2>
        <p className="text-muted">{user.name} · {user.role}</p>
      </div>
    )
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-8">
        <div className="card card-modern shadow-sm overflow-hidden">
          <div className="row g-0">
            <div className="col-12 col-md-5 bg-primary text-white p-4">
              <div className="d-flex flex-column h-100 justify-content-center">
                <h2 className="h4">Community access</h2>
                <p className="text-white-75">Login or register to submit incidents, track alerts, and get response updates.</p>
                <div className="btn-group mt-3" role="group">
                  <button className={`btn btn-outline-light ${mode === 'login' ? 'active' : ''}`} onClick={() => setMode('login')}>
                    Login
                  </button>
                  <button className={`btn btn-outline-light ${mode === 'register' ? 'active' : ''}`} onClick={() => setMode('register')}>
                    Register
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-7 p-4">
              {mode === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={loginValues.email}
                      onChange={(e) => setLoginValues({ ...loginValues, email: e.target.value })}
                      placeholder="you@yaba.local"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={loginValues.password}
                      onChange={(e) => setLoginValues({ ...loginValues, password: e.target.value })}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100">
                      Login
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Full name</label>
                    <input
                      className="form-control"
                      value={registerValues.name}
                      onChange={(e) => setRegisterValues({ ...registerValues, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={registerValues.email}
                      onChange={(e) => setRegisterValues({ ...registerValues, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      value={registerValues.role}
                      onChange={(e) => setRegisterValues({ ...registerValues, role: e.target.value })}
                    >
                      <option>Resident</option>
                      <option>Security Agent</option>
                      <option>Administrator</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Location</label>
                    <input
                      className="form-control"
                      value={registerValues.location}
                      onChange={(e) => setRegisterValues({ ...registerValues, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100">
                      Register account
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function badgeClass(status) {
  switch (status) {
    case 'Resolved':
      return 'bg-success'
    case 'In Progress':
      return 'bg-warning text-dark'
    case 'Acknowledged':
      return 'bg-info text-dark'
    case 'Received':
      return 'bg-secondary'
    default:
      return 'bg-dark'
  }
}

export default App
