import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CSS/EmailVerification.css'

const EmailVerification = () => {
    const [message, setMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            const query = new URLSearchParams(location.search);
            const token = query.get('token');

            if (!token) {
                setMessage('Invalid or missing token');
                return;
            }

            try {
                const response = await fetch(`https://projectbisonbackend.onrender.com/verify-email?token=${token}`);
                const data = await response.json();
                if (response.ok) {
                    setMessage(data.message);
                } else {
                    setMessage(data.error);
                }
            } catch (error) {
                setMessage('An error occurred while verifying the email.');
            }
        };

        verifyEmail();
    }, [location.search]);

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <div className='email-verify'>
            {/* <div className='email-container'> */}
                <h1 className='h1tag'>Email Verification</h1>
                <p className='ptag'>{message}</p>
                <button className='btn' onClick={goToLogin}>Go to Login</button>
            {/* </div> */}
        </div>
    );
};

export default EmailVerification;