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

  const handleSubmitReport = (report) => {
    setReports((current) => [report, ...current])
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage user={session?.user} onLogin={handleLogin} />} />
      <Route
        path="/dashboard"
        element={<DashboardPage reports={reports} user={session?.user ?? { name: 'Ada Okafor' }} metrics={metrics} />}
      />
      <Route path="/map" element={<MapPage reports={reports} />} />
      <Route path="/report" element={<ReportPage onSubmitReport={handleSubmitReport} />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  )
}

export default App
