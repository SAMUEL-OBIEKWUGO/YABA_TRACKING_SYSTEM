import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const defaultNotifications = {
  emailAlerts: true,
  pushAlerts: true,
  smsUpdates: false,
  weeklyDigest: true,
}

function AccountPage({ user = { name: 'Ada Okafor', email: 'resident@yabaware.com' }, onLogout, onUpdateUser }) {
  const navigate = useNavigate()
  const [showConfirm, setShowConfirm] = useState(false)
  const [profileForm, setProfileForm] = useState({
    name: user.name || 'Ada Okafor',
    email: user.email || 'resident@yabaware.com',
    phone: '+234 812 345 6789',
    location: 'Yaba, Lagos',
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [notifications, setNotifications] = useState(defaultNotifications)
  const [saveMessage, setSaveMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')

  const initials = useMemo(
    () =>
      (profileForm.name || 'AD')
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase(),
    [profileForm.name],
  )

  const handleLogout = () => {
    onLogout?.()
    setShowConfirm(false)
    navigate('/login')
  }

  const handleProfileChange = (event) => {
    setProfileForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handlePasswordChange = (event) => {
    setPasswordForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleNotificationToggle = (event) => {
    const { name, checked } = event.target
    setNotifications((current) => ({ ...current, [name]: checked }))
  }

  const handleProfileSave = (event) => {
    event.preventDefault()
    onUpdateUser?.({
      name: profileForm.name,
      email: profileForm.email,
    })
    setSaveMessage('Profile updated successfully.')
  }

  const handlePasswordSave = (event) => {
    event.preventDefault()

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordMessage('Please fill in all password fields.')
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage('New password and confirmation must match.')
      return
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordMessage('New password must be at least 8 characters long.')
      return
    }

    setPasswordMessage('Password changed successfully.')
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const handleSavePreferences = (event) => {
    event.preventDefault()
    setSaveMessage('Notification preferences updated.')
  }

  return (
    <div className="account-page-shell container-fluid px-3 px-md-4">
      <header className="account-header">
        <div className="brand">
          <div className="brand__mark">Y</div>
          <span className="brand__name">YabaSafe</span>
        </div>

        <div className="report-header__actions">
          <Link className="btn btn--ghost" to="/dashboard">
            Dashboard
          </Link>
          <button type="button" className="btn btn--primary" onClick={() => setShowConfirm(true)}>
            Sign out
          </button>
        </div>
      </header>

      <main className="account-content">
        <section className="account-card profile-card">
          <div className="profile-hero">
            <div className="profile-avatar">{initials}</div>
            <div>
              <span className="eyebrow">Profile</span>
              <h1>{profileForm.name}</h1>
            </div>
          </div>

          <form className="settings-form" onSubmit={handleProfileSave}>
            <div className="field-grid compact-grid">
              <label>
                Full name
                <input name="name" type="text" value={profileForm.name} onChange={handleProfileChange} />
              </label>

              <label>
                Email address
                <input name="email" type="email" value={profileForm.email} onChange={handleProfileChange} />
              </label>

              <label>
                Phone number
                <input name="phone" type="tel" value={profileForm.phone} onChange={handleProfileChange} />
              </label>

              <label>
                Location
                <input name="location" type="text" value={profileForm.location} onChange={handleProfileChange} />
              </label>
            </div>

            {saveMessage && <div className="form-success">{saveMessage}</div>}

            <div className="form-actions account-actions">
              <button type="button" className="btn btn--secondary" onClick={() => navigate('/dashboard')}>
                Back to dashboard
              </button>
              <button type="submit" className="btn btn--primary">
                Save profile
              </button>
            </div>
          </form>
        </section>

        <aside className="account-card account-summary">
          <span className="eyebrow">Account summary</span>
          <h2>Quick overview</h2>

          <div className="summary-list">
            <div>
              <strong>24</strong>
              <span>Reports submitted</span>
            </div>
            <div>
              <strong>8</strong>
              <span>Issues resolved</span>
            </div>
            <div>
              <strong>12</strong>
              <span>Alerts tracked</span>
            </div>
          </div>
        </aside>
      </main>

      <div className="settings-grid">
        <section className="account-card settings-card">
          <div className="section-card-header">
            <div>
              <span className="eyebrow">Security</span>
              <h3>Change password</h3>
            </div>
          </div>

          <form className="settings-form" onSubmit={handlePasswordSave}>
            <div className="field-grid compact-grid">
              <label>
                Current password
                <input
                  name="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                />
              </label>

              <label>
                New password
                <input
                  name="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Create a new password"
                />
              </label>

              <label className="full-width">
                Confirm new password
                <input
                  name="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Re-enter the new password"
                />
              </label>
            </div>

            {passwordMessage && <div className="form-success form-success--warning">{passwordMessage}</div>}

            <div className="form-actions">
              <button type="submit" className="btn btn--primary">
                Update password
              </button>
            </div>
          </form>
        </section>

        <section className="account-card settings-card">
          <div className="section-card-header">
            <div>
              <span className="eyebrow">Preferences</span>
              <h3>Notification settings</h3>
            </div>
          </div>

          <form className="settings-form" onSubmit={handleSavePreferences}>
            <div className="toggle-list">
              <label className="toggle-row">
                <span>
                  <strong>Email alerts</strong>
                  <small>Receive updates on active incidents</small>
                </span>
                <input type="checkbox" name="emailAlerts" checked={notifications.emailAlerts} onChange={handleNotificationToggle} />
              </label>

              <label className="toggle-row">
                <span>
                  <strong>Push notifications</strong>
                  <small>Instant safety updates on your device</small>
                </span>
                <input type="checkbox" name="pushAlerts" checked={notifications.pushAlerts} onChange={handleNotificationToggle} />
              </label>

              <label className="toggle-row">
                <span>
                  <strong>SMS updates</strong>
                  <small>Text alerts for urgent neighborhood updates</small>
                </span>
                <input type="checkbox" name="smsUpdates" checked={notifications.smsUpdates} onChange={handleNotificationToggle} />
              </label>

              <label className="toggle-row">
                <span>
                  <strong>Weekly digest</strong>
                  <small>Summary of community activity each week</small>
                </span>
                <input type="checkbox" name="weeklyDigest" checked={notifications.weeklyDigest} onChange={handleNotificationToggle} />
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn--primary">
                Save preferences
              </button>
            </div>
          </form>
        </section>
      </div>

      {showConfirm && (
        <div className="logout-modal-backdrop" onClick={() => setShowConfirm(false)}>
          <div className="logout-modal" onClick={(event) => event.stopPropagation()}>
            <div className="logout-modal__icon">!</div>
            <h3>Sign out of YabaSafe?</h3>
            <p>You can sign in again as another person anytime.</p>
            <div className="form-actions">
              <button type="button" className="btn btn--ghost" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
              <button type="button" className="btn btn--primary" onClick={handleLogout}>
                Yes, sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccountPage
