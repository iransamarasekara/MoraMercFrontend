import React, { useEffect } from 'react'
import './PreLoader.css'
import { preLoaderAnim } from '../../animations/index'
import M_logo from '../Assets/M_logo_new_2.jpg'

const PreLoader = () => {
  useEffect(() => {
    preLoaderAnim();
  }, []);
  return (
    
    <div className="preloader">
      <div className='loading-logo'>
        <img src={M_logo} alt='MoraMerc' className="logo" />
      </div>
      <div className="texts-container">
        
        <span >MoraMerc</span >
        <span >Powered By</span >
        <span >BisonCorps.</span >
        
      </div>
    </div>
  )
}

export default PreLoader