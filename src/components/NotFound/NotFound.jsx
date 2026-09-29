import {useNavigate} from 'react-router-dom'
import './NotFound.css'

const notFoundImage =
  "data:image/svg+xml,%3Csvg xmlns='http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width='420' height='300' viewBox='0 0 420 300'%3E%3Crect width='420' height='300' fill='%23f6f3ee'%2F%3E%3Ccircle cx='210' cy='130' r='78' fill='%23f0c58b' opacity='.55'%2F%3E%3Ctext x='210' y='150' text-anchor='middle' font-family='Arial' font-size='64' font-weight='700' fill='%23b45309'%3E404%3C%2Ftext%3E%3Cpath d='M145 205h130' stroke='%233b3128' stroke-width='8' stroke-linecap='round'%2F%3E%3C%2Fsvg%3E"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <main className="not-found-page">
      <img
        src={notFoundImage}
        alt="not found"
      />
      <h1>Page Not Found</h1>
      <p>We cannot find the page you are looking for.</p>
      <button type="button" onClick={() => navigate('/')}>
        Go Home
      </button>
    </main>
  )
}

export default NotFound
