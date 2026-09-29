import {useEffect, useState} from 'react'
import {BsPlus} from 'react-icons/bs'
import {FaCheckCircle, FaRupeeSign} from 'react-icons/fa'
import {HiOutlineMinusSm} from 'react-icons/hi'
import Header from '../Header/Header'
import CartEmpty from '../CartEmpty/CartEmpty'
import Footer from '../Footer/Footer'
import './Cart.css'

const getSavedCart = () => {
  try {
    return JSON.parse(localStorage.getItem('cartData')) || []
  } catch {
    return []
  }
}

const Cart = () => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    setCartItems(getSavedCart())
  }, [])

  const saveCart = nextCart => {
    localStorage.setItem('cartData', JSON.stringify(nextCart))
    setCartItems(nextCart)
  }

  const changeQuantity = (itemId, change) => {
    const nextCart = cartItems
      .map(item => {
        if (item.id === itemId) {
          return {...item, quantity: item.quantity + change}
        }
        return item
      })
      .filter(item => item.quantity > 0)

    saveCart(nextCart)
  }

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.cost * item.quantity,
    0,
  )

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <CartEmpty />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="cart-page">
        <h1>Cart</h1>
        <ul className="cart-items-list">
          {cartItems.map(item => (
            <li
              className="cart-item"
              key={item.id}
              testid="cartItem"
              data-testid="cartItem"
            >
              <img src={item.imageUrl} alt={item.name} />
              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p>
                  <FaRupeeSign /> {item.cost}
                </p>
                <div className="cart-quantity-controls">
                  <button
                    type="button"
                    testid="decrement-quantity"
                    data-testid="decrement-quantity"
                    onClick={() => changeQuantity(item.id, -1)}
                  >
                    <HiOutlineMinusSm />
                  </button>
                  <span testid="item-quantity" data-testid="item-quantity">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    testid="increment-quantity"
                    data-testid="increment-quantity"
                    onClick={() => changeQuantity(item.id, 1)}
                  >
                    <BsPlus />
                  </button>
                </div>
              </div>
              <p className="item-total">
                <FaRupeeSign /> {item.cost * item.quantity}
              </p>
            </li>
          ))}
        </ul>
        <section className="cart-total-section">
          <h2>Order Total</h2>
          <p testid="total-price" data-testid="total-price">
            <FaRupeeSign /> {totalPrice}
          </p>
          <button type="button" className="payment-button">
            <FaCheckCircle /> Place Order
          </button>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Cart
