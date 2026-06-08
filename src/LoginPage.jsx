import { useState } from 'react'

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Email is required')
      return
    }
    if (!password) {
      setError('Password is required')
      return
    }

    if (onLogin) {
      onLogin({ email, password })
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} noValidate>
        <h1>Sign In</h1>

        {error && <p role="alert" className="error">{error}</p>}

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="••••••••"
          />
        </div>

        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default LoginPage
