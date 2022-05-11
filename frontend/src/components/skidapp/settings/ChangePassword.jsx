import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'


const ChangePassword = (props) => {
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!props.show) return;
        setPassword('');
        props.close(false);
    }

    const handleKeyPress = useCallback( (e) => {
        if (e.key === "Escape") props.close(false)
        if (e.key === "Enter") document.getElementById('submit-delete-account').click();
    }, [props]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress, false);
        return () => document.removeEventListener('keydown', handleKeyPress, false);
    }, [handleKeyPress])

    return (
        <form className={`modal-underbody ${props.show && 'show'}`} onSubmit={handleSubmit}>
            <div className={`modal-container-app background-primary ${props.show && 'show'}`}>
                <div className="modal-form">
                    <div className="modal-form-header-app">
                        <span className="modal-header-title-app">Update your password</span>
                        <span className="modal-header-desc-app smaller-text">Enter your current password and new password.</span>
                    </div>
                    <div className="modal-form-input-container">
                        <span className="modal-form-input-header">CURRENT PASSWORD</span>
                        <input type="text" className="modal-form-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=''/>
                    </div>
                    <div className="modal-form-input-container">
                        <span className="modal-form-input-header">NEW PASSWORD</span>
                        <input type="text" className="modal-form-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=''/>
                    </div>
                    <div className="modal-form-input-container">
                        <span className="modal-form-input-header">CONFIRM NEW PASSWORD</span>
                        <input type="text" className="modal-form-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=''/>
                    </div>
                </div>
                <div className="options-container background-secondary">
                    <button type="button" className="cancel-button" onClick={() => {props.close(false); setPassword('')}}>Cancel</button>
                    <button type="submit" id="submit-delete-account" className="submit-button">Done</button>
                </div>
            </div>
        </form>
    );
}

export default ChangePassword