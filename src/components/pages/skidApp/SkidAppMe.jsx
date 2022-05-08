import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import '../../skidapp/skidapp.css';
import { getAllServersAction } from '../../../actions/server';
import { testAction } from '../../../actions/user';

// Main Components
import ServerNavbar from '../../skidapp/navbar/ServerNavbar';
import UserInfo from '../../skidapp/channelbar/UserInfo';
import Reminder from '../../skidapp/reminder/Reminder';
const SkidApp = () => {
    const auth = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth._id) navigate('/login');
        dispatch(getAllServersAction());
    }, [auth, navigate, dispatch]);

    useEffect(() => {
        dispatch(testAction());
    }, [])

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <ServerNavbar />
            <div className="reminder-container">
                <Reminder />    
                <div className="flex transition-none user-context-navbar-container">
                    <nav className="channel-bar background-secondary">
                        <UserInfo />
                    </nav>
                    <div className="user-content background-primary flex flex-grow"></div> 
                </div>
            </div>
        </div>
    );
}

export default SkidApp
