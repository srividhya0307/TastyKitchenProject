import {useNavigate} from 'react-router-dom'
import './CartEmpty.css'

const emptyCartImage =
  "data:image/svg+xml,%3Csvg xmlns='http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width='420' height='300' viewBox='0 0 420 300'%3E%3Crect width='420' height='300' fill='%23fff1dc'%2F%3E%3Cpath d='M110 98h200l-22 112H132L110 98Z' fill='white' stroke='%23d97706' stroke-width='7'/%3E%3Cpath d='M145 98c0-36 27-62 65-62s65 26 65 62' fill='none' stroke='%23d97706' stroke-width='7' stroke-linecap='round'/%3E%3Ccircle cx='170' cy='150' r='8' fill='%23d97706'/%3E%3Ccircle cx='250' cy='150' r='8' fill='%23d97706'/%3E%3Cpath d='M176 178c16 13 52 13 68 0' fill='none' stroke='%23d97706' stroke-width='6' stroke-linecap='round'/%3E%3C%2Fsvg%3E"

const CartEmpty = () => {
  const navigate = useNavigate()

  return (
    <main className="empty-cart-page">
      <img
        src={emptyCartImage}
        alt="empty cart"
      />
      <h1>Your cart is empty</h1>
      <p>Add some delicious food to see it here.</p>
      <button type="button" onClick={() => navigate('/')}>
        Order Now
      </button>
    </main>
  )
}

export default CartEmpty
