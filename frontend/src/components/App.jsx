import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route, useNavigate } from 'react-router-dom';

// HomePage Route Elements
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/HomePage/Login';
import RegisterModal from './homepage/modals/RegisterModal';

// SkidApp Elements
import SkidApp from './pages/SkidApp/SkidApp';
import SkidAppMe from './pages/SkidApp/SkidAppMe';

import { getServers } from '../actions/servers';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getServers());
    }, [dispatch])

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
