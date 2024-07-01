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
        <h2>For Your Payment!</h2>
        <p>We sent you an email of receipt.</p>
        <Link to='https://whatsapp.com/channel/0029VajLAIC3gvWZqagiEL2L'><button>For More Details</button></Link>
        <Link to='/'><button>Go to Home Page</button></Link>
      </div>
      <div className="footer-small">
        <div className="footer-left">
            <p>Proudly Design & Developed<br></br>by BISON CORPS.</p>
            {/* <p>by BISON CORPS.</p> */}
        </div>
        <div className="footer-right">
            <img src={bison_logo} alt="logo" />
        </div>
        
      </div>
      <p>© moramerc.lk. All right reserved.</p>
    </div>
  )
}

export default ThankYou
