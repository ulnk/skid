import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { useSocket } from '../contexts/socket';

// HomePage Route Elements
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/HomePage/Login';
import RegisterModal from './homepage/modals/RegisterModal';

// SkidApp Elements
import SkidApp from './pages/SkidApp/SkidApp';
import SkidAppMe from './pages/SkidApp/SkidAppMe';

import { getServers, removeServer } from '../actions/servers';

const App = () => {
    const dispatch = useDispatch();
    const { sId } = useParams();
    const navigate = useNavigate();
    const socket = useSocket();

    useEffect(() => {
        dispatch(getServers());
        if (!socket) return
        
        socket.emit('userOnline');
        socket.on('deleteServer', (serverId) => {
            dispatch(removeServer(serverId));
            if (sId === serverId) navigate('/skid/@me');
        });
    });

    return (
        <>  
            <Routes>
                {/* Page Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterModal />} />

                {/* App Routes */}
                <Route path="/skid/:sId/:cId" element={<SkidApp />} />
                <Route path="/skid/@me" element={<SkidAppMe />} />

                {/* 404 */}
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
