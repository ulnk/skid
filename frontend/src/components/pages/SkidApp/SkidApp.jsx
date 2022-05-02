import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../skidapp/skidapp.css'

import { getAllServersAction } from '../../../actions/server';
import { testAction } from '../../../actions/user';

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
        auth.auth && <div className="flex h-screen w-screen overflow-hidden">
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
