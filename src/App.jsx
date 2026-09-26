import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/landing.css'
import './styles/dashboard.css'
import './styles/map.css'
import './styles/report.css'
import './styles/auth.css'
import { useEffect, useMemo, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import MapPage from './pages/MapPage'
import ReportPage from './pages/ReportPage'
import AccountPage from './pages/AccountPage'
import { readReports, readSession, saveReports, saveSession } from './utils/storage'

function App() {
  const [reports, setReports] = useState(() => readReports())
  const [session, setSession] = useState(() => readSession())

  useEffect(() => {
    saveReports(reports)
  }, [reports])

  useEffect(() => {
    saveSession(session)
  }, [session])

  const metrics = useMemo(() => {
    const now = new Date()
    const open = reports.filter((report) => !['Resolved', 'Safe'].includes(report.status)).length
    const resolved = reports.filter((report) => report.status === 'Resolved').length
    const alerts = reports.filter((report) => report.severity === 'High').length
    const hour = now.getHours()
    const statusLabel = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

    return { open, resolved, alerts, statusLabel }
  }, [reports])

  const handleLogin = (userProfile) => {
    const fullName = userProfile.name || 'Ada Okafor'
    setSession({
      user: {
        name: fullName,
        email: userProfile.email || 'resident@yabaware.com',
      },
    })
  }

  const handleLogout = () => {
    setSession(null)
  }

  const handleUpdateUser = (userProfile) => {
    setSession((current) => ({
      ...(current || {}),
      user: {
        ...(current?.user || {}),
        name: userProfile.name || current?.user?.name || 'Ada Okafor',
        email: userProfile.email || current?.user?.email || 'resident@yabaware.com',
      },
    }))
  }

  const handleSubmitReport = (report) => {
    setReports((current) => [report, ...current])
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage user={session?.user} onLogin={handleLogin} onLogout={handleLogout} />} />
      <Route
        path="/dashboard"
        element={
          <DashboardPage
            reports={reports}
            user={session?.user ?? { name: 'Ada Okafor' }}
            metrics={metrics}
            onLogout={handleLogout}
          />
        }
      />
      <Route path="/map" element={<MapPage reports={reports} />} />
      <Route path="/report" element={<ReportPage onSubmitReport={handleSubmitReport} />} />
      <Route
        path="/account"
        element={
          <AccountPage
            user={session?.user ?? { name: 'Ada Okafor', email: 'resident@yabaware.com' }}
            onLogout={handleLogout}
            onUpdateUser={handleUpdateUser}
          />
        }
      />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  )
}

export default App
