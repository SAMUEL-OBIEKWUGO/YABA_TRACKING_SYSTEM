import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const initialState = {
  name: 'Ada Okafor',
  email: 'resident@yabaware.com',
  password: 'password123',
}

function LoginPage({ user, onLogin, onLogout }) {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.email || !form.password || (mode === 'register' && !form.name)) {
      setError('Please complete the required fields to continue.')
      return
    }

    setError('')
    onLogin?.({ name: form.name, email: form.email })
    navigate('/dashboard')
  }

  if (user) {
    return (
      <div className="auth-shell auth-shell--logged-in">
        <div className="auth-card auth-card--welcome">
          <span className="eyebrow">You are signed in</span>
          <h2>Welcome back, {user.name.split(' ')[0]}.</h2>
          <p>Continue to your resident dashboard or create a new safety report.</p>
          <div className="form-actions compact flex-wrap">
            <button type="button" className="btn btn--primary" onClick={() => navigate('/dashboard')}>
              Go to dashboard
            </button>
            <Link className="btn btn--secondary" to="/report">
              Report issue
            </Link>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                onLogout?.()
                setMode('login')
                setForm(initialState)
              }}
            >
              Log out
            </button>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => {
                onLogout?.()
                setMode('login')
                setForm(initialState)
              }}
            >
              Sign in as another person
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-shell row g-0">
      <div className="auth-hero col-12 col-lg-6">
        <div className="auth-hero__content">
          <span className="eyebrow eyebrow--light">Community-first safety</span>
          <h1>Keep your street informed and protected.</h1>
          <p>
            Sign in to access incident updates, neighborhood alerts, and live response tracking from
            your community.
          </p>

          <ul className="check-list">
            <li>Track active incidents in real time</li>
            <li>Respond to alerts in one tap</li>
            <li>Review neighborhood safety updates</li>
          </ul>
        </div>
      </div>

      <div className="auth-card-wrap col-12 col-lg-6">
        <div className="auth-card">
          <div className="auth-card__header">
            <span className="eyebrow">{mode === 'login' ? 'Welcome back' : 'Create account'}</span>
            <h2>{mode === 'login' ? 'Login to YabaSafe' : 'Join the YabaSafe community'}</h2>
          </div>

          <div className="mode-switch" aria-label="Authentication mode chooser">
            <button type="button" className={mode === 'login' ? 'mode-btn active' : 'mode-btn'} onClick={() => setMode('login')}>
              Login
            </button>
            <button type="button" className={mode === 'register' ? 'mode-btn active' : 'mode-btn'} onClick={() => setMode('register')}>
              Sign up
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <label>
                Full name
                <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Full name" />
              </label>
            )}

            <label>
              Email address
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
            </label>

            <label>
              Password
              <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />
            </label>

            <div className="auth-row">
              <label className="checkbox-inline">
                <input type="checkbox" defaultChecked />
                <span>Remember me</span>
              </label>
              <Link to="/">Forgot password?</Link>
            </div>

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="btn btn--primary btn--block">
              {mode === 'login' ? 'Log in' : 'Create account'}
            </button>

            <div className="auth-divider">
              <span>or continue with</span>
            </div>

            <div className="social-actions">
              <button type="button" className="social-btn">Google</button>
              <button type="button" className="social-btn">Apple</button>
            </div>

            <p className="auth-switch">
              {mode === 'login' ? 'Don’t have an account?' : 'Already have an account?'}{' '}
              <button type="button" className="inline-link" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
                {mode === 'login' ? 'Create one' : 'Log in'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
