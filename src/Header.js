import './Header.css'
import { Link } from 'react-router-dom'
import minjae from './minjae.jpeg'
import logo from './logo-removebg-preview.png'

export default function head() {
  return (
    <header className="header">
      <Link to="/">
        <div className="logobox">
          <img
            className="logo"
            alt="어디갔냐"
            src={logo}
            width="150px"
            height="60px"
          />
        </div>
      </Link>
      <p className="comment">Company</p>
      <p className="comment right">Agreement</p>
    </header>
  )
}
