import React, { useState, useEffect, useContext } from 'react';
import UserProfile from '../Components/UserProfile/UserProfile';
import Notification from '../Components/Notification/Notification';
import { UserContext } from '../Context/UserContext';
import './CSS/Profile.css';
import profile_pic from '../Components/Assets/profile_photo_default.webp'

const Profile = () => {

    // const { all_user } = useContext(UserContext);

    const [userEmail, setUserEmail] = useState(null);
    const [currentuser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            fetch('https://projectbisonbackend.onrender.com/getuser', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: '',
            })
                .then((response) => response.json())
                .then((data) => setUserEmail(data));
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            fetch('https://projectbisonbackend.onrender.com/getuserbymail', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: '',
            })
                .then((response) => response.json())
                .then((data) => setCurrentUser(data))
                .catch((error) => console.error('Error fetching user data:', error));
        }
    }, []);

    // useEffect(() => {
    //     const user = all_user.find((user) => userEmail === user.email);
    //     setCurrentUser(user);
    // }, [all_user, userEmail]);




    // State to track the active tab
    const [activeTab, setActiveTab] = useState('userprofile');
    // State to track whether there are new messages
    const [hasNewMessages, setHasNewMessages] = useState(false);

    // Function to handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        // Reset new message indicator when changing tabs
        if (tab === 'notification') {
            setHasNewMessages(false);
        }
    };

    // Dummy user data (replace with actual user data)
    // const user = {
    //     username: 'John Doe', // Replace with actual username
    //     profilePhoto: 'path/to/profile/photo.jpg' // Replace with actual path to profile photo
    // };

    // Simulated new message arrival (replace with actual logic to detect new messages)
    useEffect(() => {
        // Simulating new message arrival after 3 seconds
        const timeout = setTimeout(() => {
            setHasNewMessages(true);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="profile-container">
            <div className="sidebar">
                {/* Profile photo and username */}
                <div className="profile-info">
                    {currentuser && currentuser.profile_pic ? (
                        <img src={currentuser.profile_pic} alt="Profile" className="profile-photo" />
                    ) : (
                        <img src={profile_pic} alt="Profile" className="profile-photo" />
                    )}
                    {currentuser && (
                        <p>
                            Hi there!,&nbsp;<strong>{currentuser.name}</strong> <span role="img" aria-label="waving hand">👋</span>
                        </p>
                    )}
                </div>
                <hr/>
                {/* Sidebar content */}
                <ul>
                    <li className={activeTab === 'userprofile' ? 'active' : ''} onClick={() => handleTabChange('userprofile')}>
                        User Account
                    </li>
                    {/* Add red dot indicator for Messages tab if there are new messages */}
                    <li className={activeTab === 'notification' ? 'active with-indicator' : 'with-indicator'} onClick={() => handleTabChange('notification')}>
                        Messages {hasNewMessages && <span className="red-dot"></span>}
                    </li>
                    {/* Add more tabs as needed */}
                </ul>
            </div>

            {/* Sidebar for mobile view */}
            <div className="mobile-sidebar">
                {/* Render only the tab names */}
                <ul>
                    <li className={activeTab === 'userprofile' ? 'active' : ''} onClick={() => handleTabChange('userprofile')}>
                        {/* User Account Icon */}
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="white" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a4 4 0 110 8 4 4 0 010-8zm0 14.2c-2.5 0-4.7-1-6.3-2.7 1.6-2 4.1-3.3 6.3-3.3s4.7 1.3 6.3 3.3a8.2 8.2 0 01-6.3 2.7z"/>
                        </svg>
                    </li>
                    <li className={activeTab === 'notification' ? 'active with-indicator' : 'with-indicator'} onClick={() => handleTabChange('notification')}>
                        {/* Messages Icon */}
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="white" d="M20 2H4c-1.1 0-2 .9-2 2v16l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H6v-2h12v2zm0-4H6V6h12v2z"/>
                        </svg>
                    </li>
                    <li className={activeTab === 'help' ? 'active' : ''} onClick={() => handleTabChange('help')}>
                        {/* Help Center Icon */}
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121.85 122.88">
                            <path fill="white" d="M42.18,72.75A47.21,47.21,0,0,1,38.28,65c-8.39-4.72-9.73-25.71-4.56-24.12,0-.79-.14-3-.14-4.52,0-34.07,54.74-34.09,54.74,0,0,1.56-.16,3.73-.14,4.52C93.34,39.26,92,60.25,83.62,65c-2.13,5.9-5.93,9.86-5.62,12.45,0,8.89-9.77,12.11-17,12.19-.66,0-1.33,0-2-.1a17.8,17.8,0,0,0,4.52-1.9h0c3.11-1.9,5.21-4.71,5.21-8.08s-2.09-6.2-5.2-8.09h0a18.68,18.68,0,0,0-9.4-2.57,19.54,19.54,0,0,0-7.51,1.35,12.78,12.78,0,0,0-4,2.58l-.37,0Zm58.25-41.14h-.37C96.63,17.08,87.81,7,77.3,2.83A44.05,44.05,0,0,0,58,.15a46.75,46.75,0,0,0-18.44,5.4A34.24,34.24,0,0,0,22.15,31.61h-.69c-3.3,0-6.64,2.71-6.64,6V59.28c0,3.3,3.34,6,6.64,6h1.95C25.54,73.93,34.17,81.85,43,81.85h1.73c1.51,2.22,4.44,3.79,9.32,3.79s10.08-2.75,10.08-6.13S59,73.39,54.05,73.39,46.1,75,44.64,77.32H43c-7.54,0-15-8-15.53-15.22V32A29.1,29.1,0,0,1,42.13,10.2,41.46,41.46,0,0,1,58.4,5.47,38.8,38.8,0,0,1,75.33,7.79c8.71,3.44,16.06,12,19.23,23.82h-.13V65.28h6c3.3,0,6.64-2.7,6.64-6V37.62c0-3.31-3.34-6-6.64-6ZM64.59,104.44h1.86a3,3,0,0,0,3-3v-5a3,3,0,0,0-3-3h-11a3.05,3.05,0,0,0-3,3v5a3.06,3.06,0,0,0,3,3H57.3l-3.64,18.43H68.07l-3.48-18.44ZM0,122.88c1.43-18.54-2.21-17.79,13.32-23.6a128.67,128.67,0,0,0,22.78-11l13.27,34.63ZM86.4,86.67a95.25,95.25,0,0,0,21.07,10c14.5,4.82,14.5,5.5,14.36,26.17H72.65L86.4,86.67Z"></path>
                        </svg>
                    </li>
                    <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => handleTabChange('settings')}>
                        {/* Settings Icon */}
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                            <path fill="white" d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z"></path>
                        </svg>
                    </li>
                    {/* Add more tabs as needed */}
                </ul>
            </div>

            <div className="content-container">
                {/* Render the active tab content */}
                {activeTab === 'userprofile' ? <UserProfile /> : <Notification />}
            </div>
        </div>
    );
};

export default Profile;


