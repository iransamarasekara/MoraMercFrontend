import React, { useEffect, useState } from 'react'
import './UniFundRaising.css'
import { Link } from 'react-router-dom';

const UniFundRaising = () => {
    const [filled, setFilled] = useState(0);
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState(0);
    const [donators, setDonators] = useState(0);

    useEffect(() => {
        fetch('https://projectbisonbackend.onrender.com/fundraising123').then((response)=>response.json()).then((data)=>{setAmount(data.amount);setDonators(data.donators)});
    },[])

    useEffect(() => {
        let number = amount / 54000;

        if (filled < number && loading) {
            const timer = setTimeout(() => {
                setFilled(prev => {
                    const nextFilled = prev + 5;
                    return nextFilled < number ? nextFilled : number; // Prevent exceeding the target number
                });
            }, 50);
            return () => clearTimeout(timer); // Cleanup the timeout
        }
    }, [filled, loading, amount]);

  return (
    <div className='fundraising' style={{ backgroundImage: `url('https://moramerch.s3.eu-north-1.amazonaws.com/slipfiles/order_1720003369772.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className='fundraising_content_h'>
            <h1>Your Support Matters!</h1>
        </div>
        <div className='fundraising_content'>
            <div className='fundraising_content_p'>
                <h2>ERICKSHAN NEEDS </h2>
                <h2>YOUR HELP!</h2>
            </div>

            <div className="progressbar-values">
                <div className="progressbar-values-left">
                    <p><span>Rs. {amount} </span><br className='mobile-only-br'></br>of Rs. 5 400 000</p>
                </div>
                {!(donators === 0) &&
                <div className="progressbar-values-right">
                    <p><span>{donators}</span> Donors</p>
                </div>
                }
            </div>

            <div className="progressbar">
                <div className="progress" style={{
                    width: `${filled}%`,
                    height: '100%',
                    backgroundColor: '#5200FF',
                    transition: 'width 0.5s',
                    borderRadius: '10px',
                    border: 'none',
                    position: 'relative', 

                }}>
                    <div className="cap"></div>
                </div>
            </div>

        

        <div className="accandpara">
            <div className="left">
                <h1>Donate NOW!</h1>
                <p>Bank Details</p>
                <div className="leftbankdetails">
                    <p>Account Number</p>
                    <p className='accno'>158020079893</p>
                    <p>Bank</p>
                    <p className='bankname'>Hatton National Bank - Pottuvil Branch</p>
                    <p>Account Holder</p>
                    <p className='holder'>S.Anold Erickshan</p>
                </div>
            </div>
            <div className="right">
                <p>Join us to fight against cancer! Every donation you make will boost us to help our dear friend to get better treatments, hear survivor stories from him, and ultimately, provide him a world without this devastating disease. Your support would give hope to Erickshan and his family in this journey of battling cancer. Donate today and help us create a future where cancer is no longer a threat. Thank you for standing with us in this remarkable trial against cancer. This is the time to show our love and care as a batch towards our beloved batchmate Erickshan!!</p>
            </div>
        </div>

        <div className="pdf">
            <Link to='https://moramerch.s3.eu-north-1.amazonaws.com/pet+ct+after+2nd+line+chemo.pdf'><button>View Details</button></Link>
        </div>

        <div className="para1">
            <p>Surgery is scheduled for 05.07.2024</p>
            <p>Your urgent support is needed to settle the hospital bills within two weeks.</p>
        </div>

        <div className="para2">
            <p>EVERY DONATION, <span>BIG OR SMALL,</span></p>
            <p className='greenpara'>HELPS OUR FRIEND!.</p>
        </div>
        <hr/>
        <div className="bottom">
            <div className="bottom-left">
                <button>Contact Details</button>
                <p>075 561 7157</p>
                <p>075 744 2780 (Whatsapp)</p>
            </div>
            <div className="bottom-right">
                <p>22 Batch</p>
                <p>Faculty Of Engineering</p>
                <p>University Of Moratuwa</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default UniFundRaising
