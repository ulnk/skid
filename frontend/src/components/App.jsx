import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { useSocket } from '../contexts/socket';

import './css/modal.css';

// HomePage Route Elements
import HomePage from './pages/homePage/HomePage';
import Login from './pages/homePage/Login';
import Register from './pages/homePage/Register';

// SkidApp Elements
import SkidApp from './pages/skidApp/SkidApp';
import SkidAppMe from './pages/skidApp/SkidAppMe';
import SkidAppInvite from './pages/skidApp/SkidAppInvite';

import { test } from '../actions/other';

const App = () => {
    // const dispatch = useDispatch();
    // const { sId } = useParams();
    // const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;
        if (user.token) socket.emit('online', { ...user });
    }, [socket, user]);

    return (
        <>  
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login show={true} />} />
                <Route path="/register" element={<Register show={true} />} />

                <Route path="/invite/:inviteCode" element={<SkidAppInvite />} />
                
                <Route path="/skid/:serverId/:channelId" element={<SkidApp />} />
                <Route path="/skid/@me" element={<SkidAppMe />} />

                <Route path="*" element={<Redirect />} />
            </Routes>
        </>
    )
}

const Redirect = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/skid/@me');
    }, [navigate])
    return null;
}

export default App
