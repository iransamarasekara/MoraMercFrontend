import React from 'react'
import './ThankYou.css'
import bison_logo from '../Assets/bison_logo.png'
import logo from '../Assets/M.png'
import { Link } from 'react-router-dom'

const ThankYou = () => {
  return (
    <div className='thank-you'>
      <div className="greeting">
        <img src={logo} alt="logo" />
        <h1>Thank You</h1>
        <h2>For The Order!</h2>
        <p>We sent you an email of the receipt.</p>
        <Link to='https://whatsapp.com/channel/0029VajLAIC3gvWZqagiEL2L'><button>For Further Updates</button></Link>
        <Link to='/'><button>Go to Home Page</button></Link>
      </div>
      <div className="footer-small">
        <div className="footer-left">
            <p>Proudly Designed & Developed<br></br>by BISON CORPS.</p>
            {/* <p>by BISON CORPS.</p> */}
        </div>
        <div className="footer-right">
            <img src={bison_logo} alt="logo" />
        </div>
        
      </div>
      <p>© moramerc.lk All rights reserved.</p>
    </div>
  )
}

export default ThankYou
