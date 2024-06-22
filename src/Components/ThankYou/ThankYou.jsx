import React from 'react'
import './ThankYou.css'
import M_logo from '../Assets/M_logo_new.jpg'
import logo from '../Assets/M.png'
import { Link } from 'react-router-dom'

const ThankYou = () => {
  return (
    <div className='thank-you'>
      <div className="greeting">
        <img src={M_logo} alt="logo" />
        <h1>Thank You</h1>
        <h2>For Your Payment!</h2>
        <p>We sent you an email of receipt.</p>
        <Link to='/'><button>Go to Home Page</button></Link>
      </div>
      <div className="footer-small">
        <div className="footer-left">
            <p>Proudly Design & Developed</p>
            <p>by BISON CORPS.</p>
        </div>
        <div className="footer-right">
            <img src={logo} alt="logo" />
        </div>
        
      </div>
      <p>© moramerc.lk. All right reserved.</p>
    </div>
  )
}

export default ThankYou
