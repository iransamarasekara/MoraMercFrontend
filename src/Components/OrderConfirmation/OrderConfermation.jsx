import React, { useCallback, useEffect, useState } from 'react'
import './OrderConfermation.css'
import { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import { UserContext } from '../../Context/UserContext'
import upload_area from '../Assets/upload_area.svg'
import remove_icon from '../Assets/minusicon.png'
import payherebutton from '../Assets/payhere_button.png'
import { useNavigate } from 'react-router-dom';
import { FaCopy } from 'react-icons/fa';

const OrderConfermation = () => {

    const {all_product, cartItems, removeAllFromCart, removeFromCartById} = useContext(ShopContext);
    const {all_user,currentId} = useContext(UserContext);
    const [userEmail, setUserEmail] = useState(null);
    const [image,setImage] = useState(false);
    const [modal, setModal] = useState(false);
    const [showOrderTypes, setShowOrderTypes] = useState(true);

    const toggleModal = () => {
        setModal(!modal);
        // checkImgReq(e);
    };

    // if(modal) {
    //     document.body.classList.add('active-modal')
    // } else {
    //     document.body.classList.remove('active-modal')
    // }

    

    useEffect(() => {
        if(localStorage.getItem('auth-token')){
            fetch('https://projectbisonbackend.onrender.com/getuser',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json()).then((data)=>setUserEmail(data));
        }
    },[])

    // useEffect(() => {
    //     window.addEventListener('beforeunload', alertUser);
    //     return () => {
    //       window.removeEventListener('beforeunload', alertUser);
    //     };
    // }, []);
    
    // const alertUser = (e) => {
    //     if (!field1 || !field2 || !field3) {
    //         e.preventDefault();
    //         e.returnValue = '';
    //     }
    //     // e.preventDefault();
    //     // e.returnValue = '';
    // };

    // useEffect(() => {
    //     // Fetch all product images and store them in state
    //     const fetchProductImages = async () => {
    //         const images = {};
    //         for (const product of all_product) {
    //             try {
    //                 const response = await fetch('http://localhost:4000/getProductImage/${product.id}');
    //                 const data = await response.json();
    //                 images[product.id] = data.imageUrl;
    //             } catch (error) {
    //                 console.error('Failed to fetch image for product ${product.id}:, error');
    //             }
    //         }
    //         setProductImages(images);
    //     };

    //     fetchProductImages();
    // }, [all_product]);
    

    const [newFormData,setNewFormData] = useState({
        uder_id:"",//provide email of the user
        slip_image:"",
        num_purchase_products:cartItems[currentId].q,
        product_size:"",//////////////
        product_color:"",//////////////
        whatsApp:"",
        product_id:currentId,
        order_type:"",
        total:0,
        username:"",
        productname:"",
    }) 

    const imageHandler = (e)=>{
        setImage(e.target.files[0]);
    }

    const changeHandler = (e)=>{
        setNewFormData({...newFormData,[e.target.name]:e.target.value});
        
    }

    const checkWhatsAppReq = (e) =>{
        setField1(e.target.value);
        changeHandler(e);
    }

    const [imgReq, setImgReq] = useState(null);
    const checkImgReq = (event) => {
        setImgReq(event.target.value);
        setField2(event.target.value);
        
        changeHandler(event);
        
    }

    const Add_Order = async () => {
        console.log(newFormData);
        let responceData;
        let order = newFormData;

        let formData = new FormData();
        formData.append('order', image);
        
        all_product.forEach((product)=>{
            if(currentId === product.id){
                order.total=cartItems[currentId].q*product.new_price;
                order.productname=product.name;
            }
        })
        all_user.forEach((user) => {
            if (userEmail === user.email) {
                order.username=user.name;
            }
        })

        if(imgReq ==='Pre-order')

        {
            await fetch('https://projectbisonbackend.onrender.com/slipupload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
            }).then((resp) => resp.json()).then((data) =>{responceData=data});
            

            if(responceData.success)
            {   
                
                order.slip_image = responceData.image_url;
                order.uder_id = userEmail;
                order.product_size = cartItems[currentId].size;///////////
                order.product_color = cartItems[currentId].color;///////////
                removeAllFromCart(currentId);//new-line-has-small-error
                console.log(order);
                await fetch('https://projectbisonbackend.onrender.com/orderconfirmation',{
                    method:'POST',
                    headers:{
                        Accept:'application/json',
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify(order),
                }).then((resp) =>resp.json()).then((data)=>{
                    data.success?alert("Your Response Added Successfully. Thank You!"):alert("Failed");
                    if(data.success)
                    {
                        removeAllFromCart(currentId);
                        window.location.replace("/cart");
                    }
                })
            }
        }else{
            order.slip_image = 'This is post-order';
                order.uder_id = userEmail;
                order.product_size = cartItems[currentId].size;///////////
                order.product_color = cartItems[currentId].color;///////////
                removeAllFromCart(currentId);//new-line-has-small-error
                console.log(order);
                await fetch('https://projectbisonbackend.onrender.com/orderconfirmation',{
                    method:'POST',
                    headers:{
                        Accept:'application/json',
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify(order),
                }).then((resp) =>resp.json()).then((data)=>{
                    data.success?alert("Your Response Added Successfully. Thank You!"):alert("Failed");
                    if(data.success)
                    {
                        removeAllFromCart(currentId);
                        window.location.replace("/cart");
                    }
                })
        }
    }

        const [field1, setField1] = useState('');
        const [field2, setField2] = useState('');
        const [field3, setField3] = useState('');
      

        const handleSubmit = (event) => {
            event.preventDefault();
            if (!field1 || !field2) {
                alert('Please fill all required fields');
                return;
            }
            if (!field3) {
                return;
            }
            // Continue with form submission
            Add_Order();
        };


        const alertUser = useCallback((e) => {
            if (!field1 || !field2 || !field3) {
                e.preventDefault();
                e.returnValue = '';
            }
        }, [field1, field2, field3]);
        
        useEffect(() => {
            window.addEventListener('beforeunload', alertUser);
            return () => {
              window.removeEventListener('beforeunload', alertUser);
            };
        }, [alertUser]);

        const [orderType, setOrderType] = useState('');

        const handleOrderTypeChange = (e) => {
            const { value } = e.target;
            setOrderType(value);
            setNewFormData({ ...newFormData, order_type: value });
            if (value === 'Pre-order') {
                toggleModal();
            } else {
                setModal(false);
                setField2(value);
            }
        };

        const [pickupMethod, setPickupMethod] = useState('Pick-up');

        const handlePickupMethodChange = (e) => {
            const { value } = e.target;
            setPickupMethod(value);
            setNewFormData({ ...newFormData, uni_pickup: value });
        };
            

        const handleBankTransferClick = () => {
            setShowOrderTypes(!showOrderTypes);
            document.getElementById("bankTransferToggle").checked = !showOrderTypes;
        };


        const handleToggleChange = () => {
            if (showOrderTypes) {
                resetForm();
            }
            setShowOrderTypes(!showOrderTypes);
        };
    
        const resetForm = () => {
            setOrderType('');
            setImage(null);
            setModal(false);
            setField1('');
            setField2('');
            setField3('');
            setNewFormData({
                ...newFormData,
                order_type: '',
                slip_image: '',
            });
        };
    
        const navigate = useNavigate(); // Initialize useHistory hook

            // Handle back button click
            const handleBack = () => {
                navigate('/cart'); // Navigate back to the cart page
            };

            const copyToClipboard = (accountNumber) => {
                navigator.clipboard.writeText(accountNumber);
                alert('Account number copied to clipboard!');
            };
    
            return (
                <div className='maindiv'>
                        <div className="topbar">
                            <button className="back-button" onClick={handleBack}>
                                <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 299 511.517"><path d="M286.421 75.262c36.893-64.702-15.581-96.094-51.926-60.145L25.08 215.793c-33.44 33.44-33.44 46.491 0 79.93L234.495 496.4c36.345 35.949 88.819 4.557 51.926-60.146L189.16 255.758l97.261-180.496z"/></svg>
                            </button>
                            <p onClick={handleBack}>Back to Cart</p>
                        </div>
                        
                <div className="orderconfirmation">
                    <div className="orderconfirmation-details">
                            <div className='orderconfirmation-product'>
                                <ul>
                                    {all_product.map((product) => {
                                        if (currentId === product.id) {
                                            return (
                                                <li key={product.id}>
                                                    <img src={product.image} alt=''/>
                                                </li>
                                            );
                                        }
                                        else{
                                            return null;
                                        }
                                    })}
                                </ul>
                            </div>
                            <div className='orderconfirmation-sizes'>
                                <div className='productname'>
                                    <ul>
                                        {all_product.map((product) => {
                                            if (currentId === product.id) {
                                                return (
                                                    <li key={product.id}>{product.name}</li>
                                                );
                                            }
                                            else{
                                                return null;
                                            }
                                        })}
                                    </ul>
                                </div>
                                <div className='productprize'>
                                    <ul>
                                        {all_product.map((product) => {
                                            if (currentId === product.id) {
                                                return (
                                                    <li key={product.id}>Rs. {product.new_price}.00</li>
                                                );
                                            }
                                            else{
                                                return null;
                                            }
                                        })}
                                    </ul>
                                </div>
                                <div className='sizecolor'>
                                    <ul>
                                        {cartItems[currentId] && cartItems[currentId]?.size.map((sizeItem, index) => {
                                            if (sizeItem && cartItems[currentId]?.color[index]) {
                                                return (
                                                    <div className="capsule-container">
                                                        <div key={index} className='capsule'>
                                                            <li>{sizeItem} | {cartItems[currentId].color[index]}</li>
                                                            <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCartById(currentId, index) }} alt=''/>
                                                        </div>
                                                    </div>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </ul>
                                </div>

                            </div>

                    </div>

                    <div className='orderconfirmation-billinput'>
                        <form onSubmit={handleSubmit}>
                        <div className="paymentmethods">
                            <p>Payment Methods</p>
                            <div className='banktransfer'>
                            <label class="switch-toggle-container">
                                <input class="switch-toggle-input" type="checkbox" id="bankTransferToggle" onChange={handleToggleChange} checked={showOrderTypes} />
                                <span class="switch-toggle"></span>
                            </label>

                                <p>Bank Transfer</p><svg height='57' width='75' viewBox="0 0 1000.149 1001.0101" xmlns="http://www.w3.org/2000/svg"><path d="m350.15 409.456h-349c5-3 7-5 9-6 53-28 106-56 158-83 4-2 10-3 14-1 55 28 110 57 165 86 1 1 2 2 3 4zm2 211v26h-348v-26zm0 32v30h-348v-30zm-325-210h47v173h-47zm132 174h-39c-9 0-7-6-7-12v-161h46zm193-201v22h-351c0-3 0-6-1-9-1-10 3-13 13-13zm-110 200h-43v-172h43zm83 0h-43v-172h43zm269-88c0 7-1 13-4 18s-7 9-12 13-11 6-17 7c-7 2-14 3-21 3h-78v-160h89c5 0 10 1 15 4s8 5 11 9c4 4 6 8 8 13 1 5 2 10 2 15 0 8-2 15-5 22-4 6-10 11-18 15 10 3 17 7 22 14s8 16 8 27zm-95-87v33h36c4 0 8-2 11-4 3-3 5-7 5-13 0-5-2-9-5-12s-6-4-10-4zm57 80c0-5-1-10-4-13s-6-5-11-5h-42v35h41c5 0 9-2 12-5s4-7 4-12zm90 50c-5 0-11-1-16-3s-9-4-13-8c-3-3-6-7-8-12s-3-9-3-14c0-6 1-12 3-16s6-9 11-13c4-3 10-6 16-8s13-3 20-3c5 0 10 1 15 1 4 1 8 2 12 4v-5c0-14-8-21-24-21-6 0-12 1-18 3s-12 6-19 10l-10-22c8-5 16-9 24-12 8-2 17-4 27-4 18 0 31 5 41 13s15 21 15 37v30c0 4 0 6 2 8s3 2 7 2v31c-3 0-7 1-10 1h-7c-7 0-12-1-16-4-3-2-5-6-6-11l-1-5c-5 7-11 12-19 16-7 3-15 5-23 5zm11-26c4 0 8 0 11-2 4-1 7-3 9-5 4-3 5-6 5-9v-11c-3-1-6-2-10-3-3 0-7-1-10-1-7 0-12 2-16 5s-7 7-7 12c0 4 2 7 5 10 4 3 8 4 13 4zm202 24h-36v-66c0-8-1-14-4-17-3-4-7-6-12-6-2 0-5 1-8 2-2 1-5 2-7 4s-5 4-6 7c-2 2-4 5-5 8v68h-36v-118h32v20c5-7 11-13 19-17s17-5 27-5c8 0 14 1 19 4s8 6 11 11 4 9 5 14 1 10 1 15zm103 0-31-48-13 13v35h-36v-164h36v95l40-49h39l-43 51 46 67zm-440 48h-24v61h-14v-61h-23v-12h61zm39 19c-4 0-7 1-11 2s-5 4-7 7v33h-14v-54h13v12c2-4 4-7 7-9s6-4 10-4h1c1 0 1 0 2 1v12zm22 43c-2 0-5 0-7-1s-4-2-6-4c-2-1-3-3-4-5s-1-4-1-7 0-5 1-7 3-4 5-6 4-2 7-3 6-1 10-1h7s4 1 6 2v-3c0-4-1-6-3-8s-5-3-9-3c-3 0-6 0-9 1s-5 3-8 5l-4-9c7-5 14-7 22-7s14 2 18 6 7 9 7 16v17c0 1 0 3 1 3s1 1 3 1v12h-4c-1 1-2 1-3 1-3 0-5-1-6-2s-2-3-3-5v-3c-2 3-5 6-9 7-3 2-7 3-11 3zm4-10c2 0 5 0 7-1s3-2 5-3c1-2 2-3 2-4v-7c-2 0-4-1-6-1-1 0-3-1-5-1-4 0-7 1-9 3s-3 3-3 6c0 2 1 4 2 6 2 1 4 2 7 2zm91 9h-14v-30c0-5-1-8-2-10s-4-3-6-3-3 1-5 1c-1 1-2 1-4 2s-2 3-3 4-2 3-2 4v32h-14v-54h12v10c2-3 5-6 9-8s8-3 13-3c3 0 6 1 8 2s4 3 5 5 2 4 2 7 1 5 1 7zm33 1h-7c-2-1-4-1-7-2s-4-1-6-2l-6-3 6-9c7 4 13 6 20 6 3 0 5 0 7-1 1-1 2-3 2-5s-1-3-3-4-5-2-10-3l-9-3s-4-1-6-3c-1-1-2-2-3-4s-1-3-1-5c0-3 1-5 2-7s2-5 4-6c2-2 5-3 7-4 3 0 6-1 9-1 4 0 8 1 11 2s8 3 11 5l-6 8c-3-2-6-3-8-4-3-1-6-1-8-1-3 0-5 0-6 1-2 1-3 3-3 5s1 3 3 4 4 2 8 3 7 2 10 3 5 2 7 3c1 1 3 3 3 4s2 4 2 6c0 3-1 5-2 7s-3 4-4 5c-2 2-5 3-8 4-2 1-5 1-9 1zm34-1v-37h-7v-11h7v-6c0-7 2-12 5-16s8-6 13-6 9 1 14 3l-3 10c-1 0-3-1-4-1s-3-1-4-1c-5 0-7 4-7 10v7h13v11h-13v37zm61 1c-4 0-8-1-12-2s-6-4-9-6-4-6-5-9-2-7-2-11c0-3 0-7 2-10s3-7 5-9c3-3 6-5 9-7s8-2 12-2 9 1 12 2 7 4 9 7c2 2 4 5 6 8s2 7 2 11c0 1 0 2-1 3v2h-42c1 2 1 4 2 5 1 2 2 3 3 5 1 1 3 2 5 2s3 1 5 1 5-1 7-2c3-1 5-3 5-5l12 3c-2 4-5 8-9 10-5 3-10 4-16 4zm14-32c0-5-2-8-4-10-3-3-6-4-10-4-2 0-4 0-5 1s-3 2-4 3c-2 1-3 2-3 4s-2 4-2 6zm55-11c-4 0-8 1-11 2s-6 4-7 7v33h-14v-54h13v12c1-4 4-7 7-9s6-4 9-4h2s1 0 1 1z"/></svg>
                            </div>
                            <div className='payhere'>
                                <img src='https://www.payhere.lk/downloads/images/payhere_short_banner_dark.png' alt=''/>
                            </div>
                            <div></div>
                        </div>
                        
                        {/* put a section like order type to show the account number of the seller */}

                        {showOrderTypes && (
                            <div className="accnumber">
                                {all_product.map((product) => {
                                    if (currentId === product.id) {
                                        return (
                                            <>
                                            <h5>Account Details</h5>
                                            <hr/>
                                            <p>Bank : {product.bank}</p>
                                            <p>Account Number :
                                            <span className="account-number">{product.acc_no} &nbsp;<FaCopy className="copy-icon" onClick={() => copyToClipboard(product.acc_no)} /></span>
                                            </p>
                                            <p>Account Name : {product.acc_name}</p>
                                            </>
                                        );
                                    }
                                    else{
                                        return null;
                                    }
                                })}
                            </div>
                        )}       

                        {showOrderTypes && (
                            <div className="ordertype">
                                <p>Order Type</p>
                                <input type="radio" id="preorder" name="order_type" value="Pre-order" onChange={handleOrderTypeChange} checked={orderType === 'Pre-order'} />
                                <label htmlFor="preorder">Pre-order</label>
                                <input type="radio" id="postorder" name="order_type" value="Post-order" onChange={handleOrderTypeChange} checked={orderType === 'Post-order'} />
                                <label htmlFor="postorder">Post-order</label>
                            </div>
                        )}
                            {modal && (
                                <div className="orderconfirmation-second">
                                    <div className="orderconfirmation-itemfield">
                                        <label htmlFor='file-input'>
                                            <p>*Upload your payment slip here</p>
                                            <img src={image ? URL.createObjectURL(image) : upload_area} className='orderconfirmation-thumnail-img' alt="" />
                                        </label>
                                        <input onChange={imageHandler} type="file" name='slip_image' id='file-input' hidden />
                                    </div>
                                </div>
                            )}

                        </form>
                    </div>
                    <div className='orderconfirmation-third'>
                        <div className="pickup-method">
                                <p>Pick-Up Method</p>
                                <input type="radio" id="pickup" name="uni_pickup" value="Pick-up" onChange={handlePickupMethodChange} checked={pickupMethod === 'Pick-up'} />
                                <label htmlFor="pickup">University Pick-Up</label>
                        </div>
                    </div>


                    {/* <div className='orderconfirmation-first'>
                    <h3>Summary</h3>
                    {all_user.map((user) => {
                        if (userEmail === user.email) {
                            return (
                                <React.Fragment key={user.email}>
                                    <div className="orderconfirmation-first-item" >
                                        <p>Name: </p>
                                        <div className="orderconfirmation-first-item-name" >
                                            <p>{ user.name}</p>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="orderconfirmation-first-item" >
                                        <p>Email: </p>
                                        <div className="orderconfirmation-first-item-mail" >
                                            <p>{ user.email}</p>
                                        </div>
                                    </div>
                                    <hr/>

                                    <div className="orderconfirmation-first-item" >
                                        <p>Total: </p>
                                        <div className="orderconfirmation-first-item-total" >
                                        {all_product.map((product)=>{
                                            if(currentId === product.id){
                                                return(
                                                    <p>{ cartItems[currentId].q*product.new_price}</p>
                                                );
                                            }
                                            else{
                                                return null;
                                            }
                                        })}
                                        </div>
                                    </div>
                                    <hr/>
                                </React.Fragment>
                            );
                        } else {
                            return null;
                        }
                    })}
                    </div> */}
                    {((orderType === 'Post-order') || (modal && image)) && (
                        <div className="confirm">
                            <div className="orderconfirmation-first-item" >
                                <p>Total </p>
                                <div className="orderconfirmation-first-item-total" >
                                {all_product.map((product)=>{
                                    if(currentId === product.id){
                                        return(
                                            <p key={product.id}>Rs. {cartItems[currentId].q * product.new_price}</p>
                                        );
                                    }
                                    else{
                                        return null;
                                    }
                                })}
                                </div>
                            </div>
                            <button type="submit" className='add-order-btn' onClick={setField3}>PLACE ORDER</button>
                        </div>   
                    )}

                        <div className="confirm-desktop-only">
                            <div className="orderconfirmation-first-item">
                                <p>Total </p>
                                <div className="orderconfirmation-first-item-total">
                                    {all_product.map((product) => {
                                        if (currentId === product.id) {
                                            return (
                                                <p key={product.id}>Rs. {cartItems[currentId].q * product.new_price}</p>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                                </div>
                            </div>
                            <button type="submit" className='add-order-btn' onClick={setField3}>PLACE ORDER</button>
                        </div>

                    

                </div>





                {/* </div> */}
                <div class="desktop-only-header">
                    <h1>Checkout</h1>
                </div>
                <div className="desktoponly">
                    <div className="desktoponly-left">
                    
                        <form className='leftbox1' onSubmit={handleSubmit}>
                            <div className="paymentmethods">
                                <p>Payment Methods</p>
                                <div className='banktransfer'>
                                <label class="switch-toggle-container">
                                    <input class="switch-toggle-input" type="checkbox" id="bankTransferToggle" onChange={handleToggleChange} checked={showOrderTypes} />
                                    <span class="switch-toggle"></span>
                                </label>

                                    <p>Bank Transfer</p><svg height='57' width='75' viewBox="0 0 1000.149 1001.0101" xmlns="http://www.w3.org/2000/svg"><path d="m350.15 409.456h-349c5-3 7-5 9-6 53-28 106-56 158-83 4-2 10-3 14-1 55 28 110 57 165 86 1 1 2 2 3 4zm2 211v26h-348v-26zm0 32v30h-348v-30zm-325-210h47v173h-47zm132 174h-39c-9 0-7-6-7-12v-161h46zm193-201v22h-351c0-3 0-6-1-9-1-10 3-13 13-13zm-110 200h-43v-172h43zm83 0h-43v-172h43zm269-88c0 7-1 13-4 18s-7 9-12 13-11 6-17 7c-7 2-14 3-21 3h-78v-160h89c5 0 10 1 15 4s8 5 11 9c4 4 6 8 8 13 1 5 2 10 2 15 0 8-2 15-5 22-4 6-10 11-18 15 10 3 17 7 22 14s8 16 8 27zm-95-87v33h36c4 0 8-2 11-4 3-3 5-7 5-13 0-5-2-9-5-12s-6-4-10-4zm57 80c0-5-1-10-4-13s-6-5-11-5h-42v35h41c5 0 9-2 12-5s4-7 4-12zm90 50c-5 0-11-1-16-3s-9-4-13-8c-3-3-6-7-8-12s-3-9-3-14c0-6 1-12 3-16s6-9 11-13c4-3 10-6 16-8s13-3 20-3c5 0 10 1 15 1 4 1 8 2 12 4v-5c0-14-8-21-24-21-6 0-12 1-18 3s-12 6-19 10l-10-22c8-5 16-9 24-12 8-2 17-4 27-4 18 0 31 5 41 13s15 21 15 37v30c0 4 0 6 2 8s3 2 7 2v31c-3 0-7 1-10 1h-7c-7 0-12-1-16-4-3-2-5-6-6-11l-1-5c-5 7-11 12-19 16-7 3-15 5-23 5zm11-26c4 0 8 0 11-2 4-1 7-3 9-5 4-3 5-6 5-9v-11c-3-1-6-2-10-3-3 0-7-1-10-1-7 0-12 2-16 5s-7 7-7 12c0 4 2 7 5 10 4 3 8 4 13 4zm202 24h-36v-66c0-8-1-14-4-17-3-4-7-6-12-6-2 0-5 1-8 2-2 1-5 2-7 4s-5 4-6 7c-2 2-4 5-5 8v68h-36v-118h32v20c5-7 11-13 19-17s17-5 27-5c8 0 14 1 19 4s8 6 11 11 4 9 5 14 1 10 1 15zm103 0-31-48-13 13v35h-36v-164h36v95l40-49h39l-43 51 46 67zm-440 48h-24v61h-14v-61h-23v-12h61zm39 19c-4 0-7 1-11 2s-5 4-7 7v33h-14v-54h13v12c2-4 4-7 7-9s6-4 10-4h1c1 0 1 0 2 1v12zm22 43c-2 0-5 0-7-1s-4-2-6-4c-2-1-3-3-4-5s-1-4-1-7 0-5 1-7 3-4 5-6 4-2 7-3 6-1 10-1h7s4 1 6 2v-3c0-4-1-6-3-8s-5-3-9-3c-3 0-6 0-9 1s-5 3-8 5l-4-9c7-5 14-7 22-7s14 2 18 6 7 9 7 16v17c0 1 0 3 1 3s1 1 3 1v12h-4c-1 1-2 1-3 1-3 0-5-1-6-2s-2-3-3-5v-3c-2 3-5 6-9 7-3 2-7 3-11 3zm4-10c2 0 5 0 7-1s3-2 5-3c1-2 2-3 2-4v-7c-2 0-4-1-6-1-1 0-3-1-5-1-4 0-7 1-9 3s-3 3-3 6c0 2 1 4 2 6 2 1 4 2 7 2zm91 9h-14v-30c0-5-1-8-2-10s-4-3-6-3-3 1-5 1c-1 1-2 1-4 2s-2 3-3 4-2 3-2 4v32h-14v-54h12v10c2-3 5-6 9-8s8-3 13-3c3 0 6 1 8 2s4 3 5 5 2 4 2 7 1 5 1 7zm33 1h-7c-2-1-4-1-7-2s-4-1-6-2l-6-3 6-9c7 4 13 6 20 6 3 0 5 0 7-1 1-1 2-3 2-5s-1-3-3-4-5-2-10-3l-9-3s-4-1-6-3c-1-1-2-2-3-4s-1-3-1-5c0-3 1-5 2-7s2-5 4-6c2-2 5-3 7-4 3 0 6-1 9-1 4 0 8 1 11 2s8 3 11 5l-6 8c-3-2-6-3-8-4-3-1-6-1-8-1-3 0-5 0-6 1-2 1-3 3-3 5s1 3 3 4 4 2 8 3 7 2 10 3 5 2 7 3c1 1 3 3 3 4s2 4 2 6c0 3-1 5-2 7s-3 4-4 5c-2 2-5 3-8 4-2 1-5 1-9 1zm34-1v-37h-7v-11h7v-6c0-7 2-12 5-16s8-6 13-6 9 1 14 3l-3 10c-1 0-3-1-4-1s-3-1-4-1c-5 0-7 4-7 10v7h13v11h-13v37zm61 1c-4 0-8-1-12-2s-6-4-9-6-4-6-5-9-2-7-2-11c0-3 0-7 2-10s3-7 5-9c3-3 6-5 9-7s8-2 12-2 9 1 12 2 7 4 9 7c2 2 4 5 6 8s2 7 2 11c0 1 0 2-1 3v2h-42c1 2 1 4 2 5 1 2 2 3 3 5 1 1 3 2 5 2s3 1 5 1 5-1 7-2c3-1 5-3 5-5l12 3c-2 4-5 8-9 10-5 3-10 4-16 4zm14-32c0-5-2-8-4-10-3-3-6-4-10-4-2 0-4 0-5 1s-3 2-4 3c-2 1-3 2-3 4s-2 4-2 6zm55-11c-4 0-8 1-11 2s-6 4-7 7v33h-14v-54h13v12c1-4 4-7 7-9s6-4 9-4h2s1 0 1 1z"/></svg>
                                </div>
                                <div className='payhere'>
                                    <img src='https://www.payhere.lk/downloads/images/payhere_short_banner_dark.png' alt=''/>
                                </div>
                                <div></div>
                            </div>
                            
                            {/* put a section like order type to show the account number of the seller */}

                            {showOrderTypes && (
                                <div className="accnumber">
                                      
                                        {all_product.map((product) => {
                                            if (currentId === product.id) {
                                                return (
                                                    <>
                                                    <h5>Account Details</h5>
                                                    <hr/>
                                                    <p>Bank : {product.bank}</p>
                                                    <p>Account Number :
                                                    <span className="account-number">{product.acc_no} &nbsp;<FaCopy className="copy-icon" onClick={copyToClipboard(product.acc_no)} /></span>
                                                    </p>
                                                    <p>Account Name : {product.acc_name}</p>
                                                    </>
                                                );
                                            }
                                            else{
                                                return null;
                                            }
                                        })}
                                    
                                </div>
                            )}       

                            {showOrderTypes && (
                                <div className="ordertype">
                                    <p>Order Type</p>
                                    <input type="radio" id="preorder" name="order_type" value="Pre-order" onChange={handleOrderTypeChange} checked={orderType === 'Pre-order'} />
                                    <label htmlFor="preorder">Pre-order</label>
                                    <input type="radio" id="postorder" name="order_type" value="Post-order" onChange={handleOrderTypeChange} checked={orderType === 'Post-order'} />
                                    <label htmlFor="postorder">Post-order</label>
                                </div>
                            )}
                            {modal && (
                                <div className="orderconfirmation-second">
                                    <div className="orderconfirmation-itemfield">
                                        <label htmlFor='file-input'>
                                            <p>*Upload your payment slip here</p>
                                            <img src={image ? URL.createObjectURL(image) : upload_area} className='orderconfirmation-thumnail-img' alt="" />
                                        </label>
                                        <input onChange={imageHandler} type="file" name='slip_image' id='file-input' hidden />
                                    </div>
                                </div>
                            )}

                        </form>
                        <div className='orderconfirmation-third'>
                            <div className="pickup-method">
                                    <p>Pick-Up Method</p>
                                    <input type="radio" id="pickup" name="uni_pickup" value="Pick-up" onChange={handlePickupMethodChange} checked={pickupMethod === 'Pick-up'} />
                                    <label htmlFor="pickup">University Pick-Up</label>
                            </div>
                        </div>
                    </div>
                    
                    <div className="desktoponly-right">
                    <div className="orderconfirmation-details">
                            <div className='orderconfirmation-product'>
                                <ul>
                                    {all_product.map((product) => {
                                        if (currentId === product.id) {
                                            return (
                                                <li key={product.id}>
                                                    <img src={product.image} alt=''/>
                                                </li>
                                            );
                                        }
                                        else{
                                            return null;
                                        }
                                    })}
                                </ul>
                            </div>
                            <div className='orderconfirmation-sizes'>
                                <div className='productname'>
                                    <ul>
                                        {all_product.map((product) => {
                                            if (currentId === product.id) {
                                                return (
                                                    <li key={product.id}>{product.name}</li>
                                                );
                                            }
                                            else{
                                                return null;
                                            }
                                        })}
                                    </ul>
                                </div>
                                <div className='productprize'>
                                    <ul>
                                        {all_product.map((product) => {
                                            if (currentId === product.id) {
                                                return (
                                                    <li key={product.id}>Rs. {product.new_price}.00</li>
                                                );
                                            }
                                            else{
                                                return null;
                                            }
                                        })}
                                    </ul>
                                </div>
                                <div className='sizecolor'>
                                    <ul>
                                        {cartItems[currentId] && cartItems[currentId]?.size.map((sizeItem, index) => {
                                            if (sizeItem && cartItems[currentId]?.color[index]) {
                                                return (
                                                    <div className="capsule-container">
                                                        <div key={index} className='capsule'>
                                                            <li>{sizeItem} | {cartItems[currentId].color[index]}</li>
                                                            <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCartById(currentId, index) }} alt=''/>
                                                        </div>
                                                    </div>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </ul>
                                </div>


                            </div>

                    </div>
                    <div className='total-section'>
                        { (
                            <div className="confirm">
                                <div className="orderconfirmation-first-item" >
                                    <p>Total </p>
                                    <div className="orderconfirmation-first-item-total" >
                                    {all_product.map((product)=>{
                                        if(currentId === product.id){
                                            return(
                                                <p key={product.id}>Rs. {cartItems[currentId].q * product.new_price}</p>
                                            );
                                        }
                                        else{
                                            return null;
                                        }
                                    })}
                                    </div>
                                </div>
                                <button type="submit" className='add-order-btn' onClick={setField3}>PLACE ORDER</button>
                            </div>   
                        )}
                    </div>

                    </div>
                </div>



                </div>
                
            )
 }

export default OrderConfermation