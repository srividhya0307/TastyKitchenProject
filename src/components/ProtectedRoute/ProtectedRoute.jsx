import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const tokenCookie = document.cookie
    .split('; ')
    .find(cookie => cookie.startsWith('jwt_token='))
  const hasToken = Boolean(tokenCookie && tokenCookie.split('=')[1])

  if (!hasToken) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
