import {NavLink, useNavigate} from 'react-router-dom'
import './Header.css'

const logoImage =
  "data:image/svg+xml,%3Csvg xmlns='http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width='220' height='64'%3E%3Crect width='220' height='64' rx='8' fill='%23f7931e'%2F%3E%3Ctext x='110' y='40' text-anchor='middle' font-family='Arial' font-size='24' font-weight='700' fill='white'%3ETasty Kitchens%3C%2Ftext%3E%3C%2Fsvg%3E"

const Header = () => {
  const navigate = useNavigate()

  const logout = () => {
    document.cookie = 'jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
    navigate('/login', {replace: true})
  }

  return (
    <header className="header">
      <NavLink className="logo-link" to="/">
        <img
          className="header-logo"
          src={logoImage}
          alt="website logo"
        />
      </NavLink>
      <nav className="header-nav">
        <NavLink
          className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}
          to="/"
          end
        >
          Home
        </NavLink>
        <NavLink
          className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}
          to="/cart"
        >
          Cart
        </NavLink>
        <button className="logout-button" type="button" onClick={logout}>
          Logout
        </button>
      </nav>
    </header>
  )
}

export default Header
