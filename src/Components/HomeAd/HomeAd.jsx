import React , { useState, useEffect, useContext } from 'react';
import './HomeAd.css';
import ImageSlider from '../ImageSlider/ImageSlider';
import { ShopContext } from '../../Context/ShopContext';
// import { Link } from 'react-router-dom';

const HomeAd = () => {
    const {all_advertisement} = useContext(ShopContext);

    const [arr, setArr] = useState([]);

    useEffect(() => {
        setArr(all_advertisement.filter(item => "homeAd" === item.ad_category).map(item => item.ad_image));
    }, [all_advertisement]);
  return (
        arr.length > 0 &&
        <div className='home-ad-below'>
            <ImageSlider slides={arr}/>
        </div>
    
  )
}

export default HomeAd
