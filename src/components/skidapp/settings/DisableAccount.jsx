import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { disableAccountAction } from '../../../actions/user';
import { createHash } from 'crypto';

const DisableAccount = (props) => {
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!props.show) return;
        if (createHash('sha256').update(password).digest('hex') !== user.password) return;
        setPassword('');
        dispatch(disableAccountAction());
        props.close(false);
    }

    const handleKeyPress = useCallback( (e) => {
        if (e.key === "Escape") props.close(false)
        if (e.key === "Enter") document.getElementById('submit-disable-account').click();
    }, [props]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress, false);
        return () => document.removeEventListener('keydown', handleKeyPress, false);
    }, [handleKeyPress])

    return (
        <form className={`modal-underbody ${props.show && 'show'}`} onSubmit={handleSubmit}>
            <div className={`modal-container-app background-primary ${props.show && 'show'}`}>
                <div className="modal-form">
                    <div className="modal-form-header-app small-header">
                        <span className="modal-header-title-app">Disable Account</span>
                        <div className="yellow-warning-text">
                            Are you sure that you want to disable your account? This will immediately log you out and make your account inaccessible to anyone.
                        </div>
                    </div>
                    <div className="modal-form-input-container">
                        <span className="modal-form-input-header">PASSWORD</span>
                        <input type="text" className="modal-form-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=''/>
                    </div>
                </div>
                <div className="options-container background-secondary">
                    <button type="button" className="cancel-button" onClick={() => {props.close(false); setPassword('')}}>Cancel</button>
                    <button type="submit" id="submit-disable-account" className="submit-button err">Disable Account</button>
                </div>
            </div>
        </form>
    );
}

export default DisableAccount