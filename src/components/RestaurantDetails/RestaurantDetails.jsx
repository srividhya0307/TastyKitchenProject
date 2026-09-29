import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Oval} from 'react-loader-spinner'
import Header from '../Header/Header'
import FoodItems from '../FoodItems/FoodItems'
import Footer from '../Footer/Footer'
import SomethingWentWrong from '../SomethingWentWrong/SomethingWentWrong'
import './RestaurantDetails.css'

const getToken = () => {
  const tokenCookie = document.cookie
    .split('; ')
    .find(cookie => cookie.startsWith('jwt_token='))

  return tokenCookie ? tokenCookie.split('=')[1] : ''
}

const RestaurantDetails = () => {
  const {id} = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const getRestaurantDetails = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `https://apis.ccbp.in/restaurants-list/${id}`,
              {
                headers: {Authorization: `Bearer ${getToken()}`},
              },
        )
        if (!response.ok) {
          throw new Error('Restaurant details request failed')
        }
        const data = await response.json()
        setRestaurant(data)
      } catch {
        setErrorMessage('Unable to load restaurant details.')
      }
      setIsLoading(false)
    }

    getRestaurantDetails()
  }, [id])

  if (isLoading) {
    return (
      <div
        className="details-loader"
        testid="restaurant-details-loader"
        data-testid="restaurant-details-loader"
      >
        <Oval color="gold" height={40} width={50} />
      </div>
    )
  }

  if (errorMessage || !restaurant) {
    return (
      <>
        <Header />
        <SomethingWentWrong />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="restaurant-details-page">
        <section className="restaurant-summary">
          <img src={restaurant.image_url} alt="restaurant" />
          <div>
            <h1>{restaurant.name}</h1>
            <p>{restaurant.cuisine}</p>
            <p>{restaurant.location}</p>
            <p>{restaurant.rating} rating</p>
            <p>{restaurant.cost_for_two} for two</p>
          </div>
        </section>
        <FoodItems foodItems={restaurant.food_items || []} />
      </main>
      <Footer />
    </>
  )
}

export default RestaurantDetails
