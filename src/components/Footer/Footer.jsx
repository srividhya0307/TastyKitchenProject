import {
  FaFacebookSquare,
  FaInstagram,
  FaPinterestSquare,
  FaTwitter,
} from 'react-icons/fa'
import './Footer.css'

const logoImage =
  "data:image/svg+xml,%3Csvg xmlns='http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width='220' height='64'%3E%3Crect width='220' height='64' rx='8' fill='%23f7931e'%2F%3E%3Ctext x='110' y='40' text-anchor='middle' font-family='Arial' font-size='24' font-weight='700' fill='white'%3ETasty Kitchens%3C%2Ftext%3E%3C%2Fsvg%3E"

const Footer = () => (
  <footer className="footer">
    <img
      src={logoImage}
      alt="website-footer-logo"
    />
    <p>Enjoy the best food from your favourite restaurants.</p>
    <div className="social-icons">
      <FaPinterestSquare
        testid="pintrest-social-icon"
        data-testid="pintrest-social-icon"
      />
      <FaInstagram
        testid="instagram-social-icon"
        data-testid="instagram-social-icon"
      />
      <FaTwitter testid="twitter-social-icon" data-testid="twitter-social-icon" />
      <FaFacebookSquare
        testid="facebook-social-icon"
        data-testid="facebook-social-icon"
      />
    </div>
  </footer>
)

export default Footer
