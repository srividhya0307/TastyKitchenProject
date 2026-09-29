import {BsFilterLeft} from 'react-icons/bs'
import './RestaurantsHeader.css'

const RestaurantsHeader = ({sortBy, onChangeSortBy, restaurantCount}) => (
  <div className="restaurants-header">
    <div>
      <h2>Popular Restaurants</h2>
      <p>{restaurantCount} restaurants</p>
    </div>
    <label className="sort-control" htmlFor="sort-by">
      <BsFilterLeft size={24} />
      <span>Sort by</span>
      <select
        id="sort-by"
        value={sortBy}
        onChange={event => onChangeSortBy(event.target.value)}
      >
        <option value="Lowest">Lowest</option>
        <option value="Highest">Highest</option>
      </select>
    </label>
  </div>
)

export default RestaurantsHeader
