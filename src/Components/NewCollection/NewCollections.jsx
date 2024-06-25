import React from 'react';
import './NewCollections.css';

// Import images
import image1 from './images/tshirt_banner.jpg';
import image2 from './images/wristdand_banner.jpg';
import image3 from './images/stickers_banner.jpg';
import image4 from './images/hat_banner.jpg';
import { Link } from 'react-router-dom';

const NewCollection = () => {
  return (
    <div className='newcollection'>
      <h1>MORA COLLECTION</h1>
      <hr />
      <div className="collections">
        <div className="left-box" style={{ backgroundImage: `url(${image1})` }}>
          <div className="shirt">
            <Link to='/t-shirt' style={{textDecoration:'none', color:'white'}}> <h2>T-SHIRTS</h2></Link>
          </div>
        </div>
        <div className="right-box">
          <div className="item" style={{ backgroundImage: `url(${image2})` }}>
            <div className="item-details">
            <Link to='/wristbands' style={{textDecoration:'none', color:'white'}}><h2>WRISTBANDS</h2></Link>
            </div>
          </div>
          <div className="item" style={{ backgroundImage: `url(${image3})` }}>
            <div className="item-details">
            <Link to='/others' style={{textDecoration:'none', color:'white'}}><h2>LAPTOP STICKERS</h2></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-box" style={{ backgroundImage: `url(${image4})` }}>
        <div className="item-details">
        <Link to='/others' style={{textDecoration:'none', color:'white'}}><h2>OTHER ITEMS</h2></Link>
        </div>
      </div> 
    </div>
  );
}

export default NewCollection;
