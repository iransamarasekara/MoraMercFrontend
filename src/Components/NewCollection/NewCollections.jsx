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
      <Link to='/t-shirt' style={{ textDecoration: 'none' }}>
          <div className="left-box" style={{ backgroundImage: `url(${image1})` }}>
            <div className="shirt" style={{ color: 'white' }}>
              <h2>T-SHIRTS</h2>
            </div>
          </div>
        </Link>
        <div className="right-box">
        <Link to='/wristbands' style={{ textDecoration: 'none' }}>
            <div className="item" style={{ backgroundImage: `url(${image2})`, color: 'white' }}>
              <div className="item-details">
                <h2>WRISTBANDS</h2>
              </div>
            </div>
          </Link>
          <Link to='/others' style={{ textDecoration: 'none' }}>
            <div className="item" style={{ backgroundImage: `url(${image3})`, color: 'white' }}>
              <div className="item-details">
                <h2>LAPTOP STICKERS</h2>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Link to='/others' style={{ textDecoration: 'none' }}>
        <div className="bottom-box" style={{ backgroundImage: `url(${image4})`, color: 'white' }}>
          <div className="item-details">
            <h2>OTHER ITEMS</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default NewCollection;
