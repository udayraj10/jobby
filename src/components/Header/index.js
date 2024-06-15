import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>
        <ul className="nav-menu">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
        <ul className="nav-menu-mobile">
          <li>
            <Link to="/" className="nav-link-mobile">
              <AiFillHome className="nav-icon" />
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-link-mobile">
              <BsBriefcaseFill className="nav-icon" />
            </Link>
          </li>
          <button
            type="button"
            className="logout-mobile-btn"
            onClick={onClickLogout}
          >
            <FiLogOut className="logout-icon" />j
          </button>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
