import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate , Link } from 'react-router-dom';

import '../../css/modal.css';

import { registerAction } from '../../../actions/user';

const RegisterModal = (props) => {
    const [navigating, setNavigating] = useState(true);
    const auth = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const dispatch = useDispatch()

    const checkForm = () => {
        if (username.length < 1 || password.length < 1 || confPassword.length < 1 ) return setError('Invalid form.');
        if (username.includes(' ') || username.includes('#') || username.includes('"') || 
            username.includes("'") || username.includes("&") || username.includes("@") || 
            username.includes("~") || username.includes("/") || username.includes(",") || 
            username.includes(">")  ) return setError(`Username must not contain special characters including: # ' " & @ ~ / > < `);
        if (password.includes(' ')) return setError('Password cannot include spaces.');
        if (username.length < 5) return setError('Username must be larger than 4 characters.');
        if (username.length > 15) return setError('Username must be less than 15 characters.');
        if (password !== confPassword) return setError('Passwords do not match.');
        dispatch(registerAction( username, password ))
    }

    const submitForm = (e) => {
        e.preventDefault();
        checkForm();
    }

    useEffect(() => {
        if (props.show) setNavigating(false);
    }, [props]);

    useEffect(() => {
        if (auth.id) navigate('/skid/@me')
    }, [auth, navigate])

    const [error, setError] = useState('')


    return (
        <form className="modal-body" onSubmit={submitForm}>
            <div className={`modal-container background-primary ${!navigating ? 'show' : ''}`}>
                <div className="modal-form">
                    <div className="modal-form-header">
                        <span className="modal-header-title">Create an account</span>
                        <small className="modal-err-desc">{error}</small>
                    </div>
                    <div className="modal-form-input-container">
                        <span className="modal-form-input-header">USERNAME</span>
                        <input type="text" className="modal-form-input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder=""/>
                    </div>
                    <div className="modal-form-input-container">
                        <span className="modal-form-input-header">PASSWORD</span>
                        <input type="password" className="modal-form-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=""/>
                    </div>
                    <div className="modal-form-input-container">
                        <span className="modal-form-input-header">CONFIRM PASSWORD</span>
                        <input type="password" className="modal-form-input" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} placeholder=""/>
                    </div>
                </div>
                <button type="submit" className="submit-button-long">Register</button>
                <span className="login-register-below">Already have an account? <Link to="/login" className="register-button">Login</Link></span>
            </div>
        </form>
    )
}

export default RegisterModal
