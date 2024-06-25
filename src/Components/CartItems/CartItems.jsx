import React, { useContext, useEffect, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/minusicon.png';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

const CartItems = () => {
  const { all_product, cartItems, removeFromCartById } = useContext(ShopContext);
  const { getProductId } = useContext(UserContext);

  // Check if cart has 2 or more items
  const cartHasMultipleItems = Object.values(cartItems).filter(item => item.q > 0).length >= 2;

  const [isLargeViewport, setIsLargeViewport] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeViewport(window.innerWidth >= 1024);
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Remove the event listener when the component is unmounted
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className='cartpg'>
        {/* <h2>Your Cart</h2> */}
        <div className='cartitems'>
        <h2>Your Bag</h2>
          {isLargeViewport ? (
            <>
            <div className="cartitems-header">
              <p>Products</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
              if (cartItems[e.id].q > 0) {
                return (
                  <div key={e.id}>
                    <div className="cartitems-row">
                      <img src={e.image} alt='' className='carticon-product-icon' />
                      <p>{e.name}</p>
                      <p>Rs.{e.new_price}</p>
                      <button className='cartitems-quantity'>{cartItems[e.id].q}</button>
                      <p1>Rs.{e.new_price * cartItems[e.id].q}</p1>
                      <div className="cartitems-remove-capsules">
                        <ul className="cartitems-size-list">
                          {cartItems[e.id]?.size.map((sizeItem, index) => {
                            if (sizeItem) {
                              return (
                                <li key={index} className="cartitems-size-item">
                                  <div className="cartitems-size-color">

                                    <span>{sizeItem}</span>
                                    <span>-</span>
                                    <span>{cartItems[e.id]?.color[index]}</span>

                                    <img
                                        className="cartitems-remove-icon-small"
                                        src={remove_icon}
                                        onClick={() => { removeFromCartById(e.id, index) }} alt=''
                                        
                                    />
                                  </div>
                                </li>
                              )
                            } else {
                              return null;
                            }
                          })}
                        </ul>
                      </div>
                      <Link style={{ textDecoration: 'none' }} to='/order'>
                        <button className='cartitems-checkout-btn' onClick={() => { getProductId(e.id) }}>PROCEED TO CHECKOUT</button>
                      </Link>
                    </div>
                    <hr />
                  </div>
                );
              }
              return null;
            })}
          </>

          ) : (
            <>
              {all_product.map((e) => {
                if (cartItems[e.id].q > 0) {
                  return (
                    <div>
                    <div className='main-div' key={e.id}>
                      <div className="cartitems-row-left">
                        <img src={e.image} alt='' className='carticon-product-icon' />
                      </div>
                      <div className="cartitems-row-right">
                        <p className='product-name'>{e.name}</p>
                        <div className='cartitems-row-right-details'>
                          <div className="cartitems-row-right-details-left">
                            <p>Rs.{e.new_price * cartItems[e.id].q}</p>
                            <label>Quantity
                                <span class="cartitems-quantity">{cartItems[e.id].q}</span>
                            </label>
      
                          </div>
                          <div className="cartitems-remove-capsules">
                            <ul className="cartitems-size-list">
                              {cartItems[e.id]?.size.map((sizeItem, index) => {
                                if (sizeItem) {
                                  return (
                                    <li key={index} className="cartitems-size-item">
                                      <div className="cartitems-size-color">
                                          <img className='cartitems-remove-icon-small' src={remove_icon} onClick={() => { removeFromCartById(e.id, index) }} alt='' />
                                          <span>{sizeItem}</span>
                                          <span>-</span>
                                          <span>{cartItems[e.id]?.color[index]}</span>
                                      </div>
                                    </li>
                                  )
                                } else {
                                  return null;
                                }
                              })}
                            </ul>
                          </div>
                        </div>
                        <Link style={{ textDecoration: 'none' }} to='/order'>
                          <button className='cartitems-checkout-btn' onClick={() => { getProductId(e.id) }}>PROCEED TO CHECKOUT</button>
                        </Link>
                      </div>
                      
                    </div>
                    <hr />
                    </div>
                  );
                }
                return null;
              })}
            </>

          )}

          {cartHasMultipleItems && <h4>*You have to checkout each item separately!</h4>}
        </div>
    </div>
  );
}

export default CartItems;
