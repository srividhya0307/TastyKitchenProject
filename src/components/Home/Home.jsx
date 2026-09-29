import {useEffect, useState} from 'react'
import {Oval} from 'react-loader-spinner'
import Header from '../Header/Header'
import RestaurantsHeader from '../RestaurantsHeader/RestaurantsHeader'
import AllRestaurants from '../AllRestaurants/AllRestaurants'
import Footer from '../Footer/Footer'
import SomethingWentWrong from '../SomethingWentWrong/SomethingWentWrong'
import './Home.css'

const LIMIT = 9

const getToken = () => {
  const tokenCookie = document.cookie
    .split('; ')
    .find(cookie => cookie.startsWith('jwt_token='))

  return tokenCookie ? tokenCookie.split('=')[1] : ''
}

const Home = () => {
  const [offers, setOffers] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [totalRestaurants, setTotalRestaurants] = useState(0)
  const [sortBy, setSortBy] = useState('Lowest')
  const [activePage, setActivePage] = useState(1)
  const [isOffersLoading, setIsOffersLoading] = useState(true)
  const [isRestaurantsLoading, setIsRestaurantsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const getOffers = async () => {
      try {
        const response = await fetch(
          'https://apis.ccbp.in/restaurants-list/offers',
              {
                headers: {Authorization: `Bearer ${getToken()}`},
              },
        )
        if (!response.ok) {
          throw new Error('Offers request failed')
        }
        const data = await response.json()
        setOffers(data.offers || [])
      } catch {
        setErrorMessage('Unable to load offers.')
      }
      setIsOffersLoading(false)
    }

    getOffers()
  }, [])

  useEffect(() => {
    const getRestaurants = async () => {
      setIsRestaurantsLoading(true)
      const offset = (activePage - 1) * LIMIT
      const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${sortBy}`

      try {
            const response = await fetch(url, {
              headers: {Authorization: `Bearer ${getToken()}`},
            })
        if (!response.ok) {
          throw new Error('Restaurants request failed')
        }
        const data = await response.json()
        setRestaurants(data.restaurants || [])
        setTotalRestaurants(data.total || 0)
      } catch {
        setErrorMessage('Unable to load restaurants.')
      }
      setIsRestaurantsLoading(false)
    }

    getRestaurants()
  }, [activePage, sortBy])

  const totalPages = Math.max(1, Math.ceil(totalRestaurants / LIMIT))

  const changeSortBy = value => {
    setSortBy(value)
    setActivePage(1)
  }

  return (
    <>
      <Header />
      <main className="home-page">
        <section className="offers-section">
          {isOffersLoading ? (
            <div
              className="loader"
              testid="restaurants-offers-loader"
              data-testid="restaurants-offers-loader"
            >
              <Oval color="gold" height={40} width={50} />
            </div>
          ) : (
            <div className="offers-list">
              {offers.map(offer => (
                <img key={offer.id} src={offer.image_url} alt="offer" />
              ))}
            </div>
          )}
        </section>

        <section className="restaurants-section">
          <RestaurantsHeader
            sortBy={sortBy}
            onChangeSortBy={changeSortBy}
            restaurantCount={totalRestaurants}
          />
          {isRestaurantsLoading ? (
            <div
              className="loader"
              testid="restaurants-list-loader"
              data-testid="restaurants-list-loader"
            >
              <Oval color="gold" height={40} width={50} />
            </div>
          ) : (
            <AllRestaurants restaurants={restaurants} />
          )}
          <div className="pagination">
            <button
              type="button"
              testid="pagination-left-button"
              data-testid="pagination-left-button"
              disabled={activePage === 1}
              onClick={() => setActivePage(activePage - 1)}
            >
              Previous
            </button>
            <span testid="active-page-number" data-testid="active-page-number">
              {activePage}
            </span>{' '}
            of {totalPages}
            <button
              type="button"
              testid="pagination-right-button"
              data-testid="pagination-right-button"
              disabled={activePage >= totalPages}
              onClick={() => setActivePage(activePage + 1)}
            >
              Next
            </button>
          </div>
          {errorMessage && <SomethingWentWrong />}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home
