import {Routes, Route} from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm/LoginForm'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Home from './components/Home/Home'
import RestaurantDetails from './components/RestaurantDetails/RestaurantDetails'
import Cart from './components/Cart/Cart'
import NotFound from './components/NotFound/NotFound'

const App = () => (
  <Routes>
    <Route path="/login" element={<LoginForm />} />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />
    <Route
      path="/restaurant/:id"
      element={
        <ProtectedRoute>
          <RestaurantDetails />
        </ProtectedRoute>
      }
    />
    <Route
      path="/cart"
      element={
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      }
    />
    <Route path="/not-found" element={<NotFound />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default App
