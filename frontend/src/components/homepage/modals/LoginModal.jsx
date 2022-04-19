import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate , Link } from 'react-router-dom';

import './LoginModal.css'

import { login } from '../../../actions/login';

const LoginModal = () => {
    const auth = useSelector((state) => state.auth.data);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(login({username, password}));
    }

    useEffect(() => {
        if (auth.userId) navigate('/skid/@me')
    }, [auth.userId, navigate])

    return (
        <form className="login-body" onSubmit={submitForm} >
            <div className="modal-container background-primary">
                <div className="modal-form">
                    <div className="modal-form-header">
                        <span className="modal-header-title">Welcome Back!</span>
                        <small className="modal-header-desc">We're so glad to see you again!</small>
                    </div>
                    <div className="modal-form-input-container">
                        <span className="modal-form-input-header">USERNAME</span>
                        <input type="text" className="modal-form-input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder=""/>
                    </div>
                    <div className="modal-form-input-container">
                        <span className="modal-form-input-header">PASSWORD</span>
                        <input type="password" className="modal-form-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=""/>
                        <span className="login-register"><Link to="/recover" className="register-button">Forgot your password?</Link></span>
                    </div>
                </div>
                <div className="options-container background-secondary">
                    <span className="login-register">Need an account? <Link to="/register" className="register-button">Register</Link></span>
                    <button type="submit" className="submit-button">Login</button>
                </div>
            </div>
        </form>
    )
}

export default LoginModal