import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../skidapp/skidapp.css'

// Main Components
import ServerNavbar from '../../skidapp/navbar/ServerNavbar';
import ChannelBar from '../../skidapp/channelbar/ChannelBar';
import UserContent from '../../skidapp/usercontent/UserContent';
import Reminder from '../../skidapp/reminder/Reminder';

// Modals
// import NewChannel from '../../skidapp/modals/newchannel/NewChannel'
// import NewCategory from '../../skidapp/modals/newcategory/NewCategory'
// import NewServer from '../../skidapp/modals/newserver/NewServer'

const SkidApp = () => {
    const auth = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.id) navigate('/login');
    }, [auth, navigate]);

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <ServerNavbar />
            <div className="reminder-container">
                <Reminder />
                <div className="flex h-full w-full transition-none user-context-navbar-container">
                    <ChannelBar />
                    <UserContent />
                </div>
            </div>
        </div>
    )
}

export default SkidApp