import './AllRestaurants.css'

const AllRestaurants = ({restaurants}) => {
  return (
    <ul className="restaurants-list">
      {restaurants.map(restaurant => (
        <li
          className="restaurant-card"
          key={restaurant.id}
          testid="restaurant-item"
          data-testid="restaurant-item"
        >
          <a href={`/restaurant/${restaurant.id}`} className="restaurant-link">
            <img src={restaurant.image_url} alt="restaurant" />
            <div>
              <h3>{restaurant.name}</h3>
              <p>{restaurant.cuisine}</p>
              <p>
                {restaurant.user_rating?.rating ?? restaurant.rating ?? 0} rating
              </p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default AllRestaurants
