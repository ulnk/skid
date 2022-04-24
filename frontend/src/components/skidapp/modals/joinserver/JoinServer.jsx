import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { joinInviteAction } from '../../../../actions/invite';


const JoinServer = (props) => {
    const [inviteCode, setInviteCode] = useState('');
    const [error, setError] = useState('')
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        splitInviteCode(inviteCode)
        dispatch(joinInviteAction(inviteCode));
        props.close(false);
    }

    const splitInviteCode = (inviteCode) => {
        inviteCode = inviteCode.split(`:`).at(-1).split(`//`).at(-1).split(`skid.rocks/invite`).at(-1).split(`skid.today/invite`).at(-1);
        inviteCode = inviteCode.split(`/`)[1] || inviteCode.split(`/`).at(-1);
        inviteCode = inviteCode.replace(/\s+/g, '') // remove whitespace
        if (inviteCode === '') return setError('Invite is invalid or expired.');
        setError('');
        setInviteCode(inviteCode);
    }

    const handleKeyPress = (e) => {
        if (e.key === "Escape") props.close(false)
        if (e.key === "Enter") document.getElementById('submit-join-channel').click();
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress, false);
        return () => document.removeEventListener('keydown', handleKeyPress, false);
    }, [])

    return (
        <form className={`modal-underbody ${props.show && 'show'}`} onSubmit={handleSubmit}>
            <div className={`modal-container-app background-primary ${props.show && 'show'}`}>
                <div className="modal-form">
                    <div className="modal-form-header-app">
                        <span className="modal-header-title-app">Join server</span>
                        <small className="modal-header-desc-app">Enter an invite below to join an existing server.</small>
                    </div>
                    <div className="modal-form-input-container">
                        <span className={`modal-form-input-header ${error !== '' && 'error-invite'}`}>Invite Link {error !== '' && `- ${error}`}</span>
                        <input type="text" className="modal-form-input" value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} placeholder="skid.today/invite/aO9yuf"/>
                    </div>
                </div>
                <div className="options-container background-secondary">
                    <button type="button" className="cancel-button" onClick={() => {props.close(false); setInviteCode('')}}>Cancel</button>
                    <button type="submit" id="submit-join-channel" className="submit-button">Join server</button>
                </div>
            </div>
        </form>
    );
}

export default JoinServer;