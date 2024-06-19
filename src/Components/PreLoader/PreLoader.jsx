import React, { useEffect } from 'react'
import './PreLoader.css'
import { preLoaderAnim } from '../../animations/index'

const PreLoader = () => {
  useEffect(() => {
    preLoaderAnim();
  }, []);
  return (
    <div className="preloader">
      <div className="texts-container">
        
        <span >MoraMerc</span >
        <span >Powered By</span >
        <span >BisonCorps.</span >
        
      </div>
    </div>
  )
}

export default PreLoader