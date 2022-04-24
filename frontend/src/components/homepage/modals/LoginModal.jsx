import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate , Link } from 'react-router-dom';

import '../../css/modal.css';

import { loginAction } from '../../../actions/user';

const LoginModal = (props) => {
    const [navigating, setNavigating] = useState(true);
    const auth = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(loginAction(username, password));
    }

    useEffect(() => {
        if (props.show) setNavigating(false);
    }, [props]);

    useEffect(() => {
        if (auth._id) navigate('/skid/@me')
    }, [auth, navigate])

    return (
        <form className="modal-body" onSubmit={submitForm} >
            <div className={`modal-container background-primary ${!navigating ? 'show' : ''}`}>
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
                <button type="submit" className="submit-button-long">Login</button>
                <span className="login-register-below">Need an account? <Link to="/register" className="register-button">Register</Link></span>
            </div>
        </form>
    )
}

export default LoginModal