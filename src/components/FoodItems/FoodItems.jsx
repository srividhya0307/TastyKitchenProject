import {useEffect, useState} from 'react'
import {FaRupeeSign} from 'react-icons/fa'
import './FoodItems.css'

const getSavedCart = () => {
  try {
    return JSON.parse(localStorage.getItem('cartData')) || []
  } catch {
    return []
  }
}

const FoodItems = ({foodItems}) => {
  const [quantities, setQuantities] = useState({})

  useEffect(() => {
    const savedCart = getSavedCart()
    const savedQuantities = {}

    savedCart.forEach(item => {
      savedQuantities[item.id] = item.quantity
    })

    setQuantities(savedQuantities)
  }, [])

  const updateCart = (foodItem, nextQuantity) => {
    const savedCart = getSavedCart()
    const itemIndex = savedCart.findIndex(item => item.id === foodItem.id)
    const nextCart = [...savedCart]
    const foodCost = foodItem.cost ?? foodItem.price ?? 0

    if (nextQuantity === 0) {
      if (itemIndex !== -1) {
        nextCart.splice(itemIndex, 1)
      }
    } else {
      const cartItem = {
        cost: foodCost,
        quantity: nextQuantity,
        id: foodItem.id,
        imageUrl: foodItem.image_url,
        name: foodItem.name,
      }

      if (itemIndex === -1) {
        nextCart.push(cartItem)
      } else {
        nextCart[itemIndex] = cartItem
      }
    }

    localStorage.setItem('cartData', JSON.stringify(nextCart))
    setQuantities({...quantities, [foodItem.id]: nextQuantity})
  }

  const increaseQuantity = foodItem => {
    const currentQuantity = quantities[foodItem.id] || 0
    updateCart(foodItem, currentQuantity + 1)
  }

  const decreaseQuantity = foodItem => {
    const currentQuantity = quantities[foodItem.id] || 0
    if (currentQuantity > 0) {
      updateCart(foodItem, currentQuantity - 1)
    }
  }

  return (
    <ul className="food-items-list">
      {foodItems.map(foodItem => {
        const quantity = quantities[foodItem.id] || 0
        const foodCost = foodItem.cost ?? foodItem.price ?? 0

        return (
          <li
            className="food-item"
            key={foodItem.id}
            testid="foodItem"
            data-testid="foodItem"
          >
            <img src={foodItem.image_url} alt={foodItem.name} />
            <div className="food-item-details">
              <h3>{foodItem.name}</h3>
              <p className="food-price">
                <FaRupeeSign /> {foodCost}
              </p>
              <p>{foodItem.rating} rating</p>
              <div className="quantity-controls">
                <button
                  type="button"
                  testid="decrement-count"
                  data-testid="decrement-count"
                  onClick={() => decreaseQuantity(foodItem)}
                >
                  -
                </button>
                <span testid="active-count" data-testid="active-count">
                  {quantity}
                </span>
                <button
                  type="button"
                  testid="increment-count"
                  data-testid="increment-count"
                  onClick={() => increaseQuantity(foodItem)}
                >
                  +
                </button>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default FoodItems
