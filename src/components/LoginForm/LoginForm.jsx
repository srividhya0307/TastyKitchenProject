import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './LoginForm.css'

const logoImage =
  "data:image/svg+xml,%3Csvg xmlns='http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width='220' height='64'%3E%3Crect width='220' height='64' rx='8' fill='%23f7931e'%2F%3E%3Ctext x='110' y='40' text-anchor='middle' font-family='Arial' font-size='24' font-weight='700' fill='white'%3ETasty Kitchens%3C%2Ftext%3E%3C%2Fsvg%3E"
const loginImage =
  "data:image/svg+xml,%3Csvg xmlns='http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width='440' height='300' viewBox='0 0 440 300'%3E%3Crect width='440' height='300' fill='%23fff1dc'%2F%3E%3Ccircle cx='220' cy='150' r='92' fill='%23f7931e' opacity='.22'%2F%3E%3Cellipse cx='220' cy='180' rx='105' ry='30' fill='white' stroke='%23f7931e' stroke-width='6'%2F%3E%3Ccircle cx='185' cy='168' r='16' fill='%23e85d04'%2F%3E%3Ccircle cx='225' cy='160' r='13' fill='%236a994e'%2F%3E%3Ccircle cx='258' cy='174' r='15' fill='%23fcbf49'%2F%3E%3Cpath d='M145 110 Q220 48 295 110' fill='none' stroke='%23f7931e' stroke-width='12' stroke-linecap='round'%2F%3E%3C%2Fsvg%3E"

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const submitLogin = async event => {
    event.preventDefault()
    setIsLoading(true)
    setErrorMessage('')

    const userDetails = {username, password}

    try {
      const response = await fetch('https://apis.ccbp.in/login', {
        method: 'POST',
        body: JSON.stringify(userDetails),
      })
      const data = await response.json()

      if (response.ok) {
        document.cookie = `jwt_token=${data.jwt_token}; path=/`
        navigate('/')
      } else {
        setErrorMessage(data.error_msg)
      }
    } catch {
      setErrorMessage('Something went wrong. Please try again.')
    }

    setIsLoading(false)
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <img
          className="login-logo"
          src={logoImage}
          alt="website logo"
        />
        <img
          className="login-image"
          src={loginImage}
          alt="website login"
        />
        <form onSubmit={submitLogin}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          {errorMessage && <p className="login-error">*{errorMessage}</p>}
        </form>
      </section>
    </main>
  )
}

export default LoginForm
