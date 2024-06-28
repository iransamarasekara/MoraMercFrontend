import React, { useState, useEffect, useContext } from 'react';
import ImageSlider from '../ImageSlider/ImageSlider';
import { ShopContext } from '../../Context/ShopContext';
import './SpecialComboPacks.css';
import { Link } from 'react-router-dom';

const SpecialComboPacks = () => {
    const {all_advertisement} = useContext(ShopContext);

    const [arr, setArr] = useState([]);

    useEffect(() => {
        setArr(all_advertisement.filter(item => "home" === item.ad_category).map(item => item.ad_image));
    }, [all_advertisement]);

    // const containerStyles = {
    //     width:'80%',
    //     height:'30vh',
    //     margin: '80px auto',
    //     alignItems : 'center'
    // } style={containerStyles}

    return (
        arr.length > 0 &&
        <div  className='home-ad'>
            <div className='home-ad-desc'>
                <h2>Check Special Offers for You.</h2>
                <Link to='/others'><button>Click here</button></Link>
            </div>
            <div className='shop-category-banner-mobile'>
                <ImageSlider slides={arr}/>
            </div>
        </div>
    )
}

export default SpecialComboPacks
