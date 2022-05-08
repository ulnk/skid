import React, { useState, useEffect,useCallback } from 'react'
import './NewServerInvite.css';

// import { createInvite, hasInvite } from '../../../../actions/servers';
import { createInviteAction } from '../../../../actions/invite';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const NewServerInvite = (props) => {
    const { serverId } = useParams();
    const [newInvite, setNewInvite] = useState(serverId.slice(-6, -1));
    const [alreadyHasInvite, setAlreadyHasInvite] = useState(false);
    const [currentServerInvite, setCurrentServerInvite] = useState('');
    const [copied, setCopied] = useState(false);
    const dispatch = useDispatch();
    const allInviteCodes = useSelector(state => state.invite.allInvites);
    const [timeoutstate, setstateTimeout] = useState();


    useEffect(() => {
        let hasServerInviteCode = allInviteCodes.filter(inviteCode => inviteCode.server === serverId)
        setAlreadyHasInvite(hasServerInviteCode[0] !== undefined);
        if (hasServerInviteCode[0]) setCurrentServerInvite(hasServerInviteCode[0].invite)
    }, [serverId, allInviteCodes]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!props.show) return;
        dispatch(createInviteAction(serverId, newInvite));
    }

    const handleKeyPress = useCallback( (e) => {
        if (e.key === "Escape") props.close(false)
    }, [props]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress, false);
        return () => document.removeEventListener('keydown', handleKeyPress, false);
    }, [handleKeyPress])

    return (
        !alreadyHasInvite ? <form className={`modal-underbody ${props.show && 'show'}`} onSubmit={handleSubmit}>
            <div className={`modal-container-app background-primary ${props.show && 'show'}`}>
                <div className="modal-form">
                    <div className="modal-form-header">
                        <span className="modal-header-title">Create Server Invite</span>
                        <small className="modal-header-desc">Give your server personality with a custom invite.</small>
                    </div>
                    <div className="modal-form-input-container">
                        <span className="modal-form-input-header">SERVER INVITE</span>
                        <input type="text" className="modal-form-input" value={newInvite} onChange={(e) => setNewInvite(e.target.value)} placeholder="fun-server"/>
                    </div>
                </div>
                <div className="options-container background-secondary">
                    <button type="button" onClick={() => props.close(false)} className="cancel-button">Cancel</button>
                    <button type="submit" id="submit-new-category" className="submit-button">Create Server Invite</button>
                </div>
            </div>
        </form> : <div className={`modal-underbody ${props.show && 'show'}`}>
            <div className={`modal-container-app background-primary ${props.show && 'show'}`}>
                <div className="modal-form">
                    <div className="modal-form-header-invite">
                        <span className="modal-header-title-invite">Invite friends to the server!</span>
                    </div>
                    <div className="modal-form-input-container-invite">
                        <span className="modal-form-input-header">SERVER INVITE</span>
                        <div className="modal-form-input-readonly-container">
                            <input type="text" className="modal-form-input-readonly" value={currentServerInvite} readOnly />
                            <button type="button" className={`modal-form-button-readonly-copy ${copied && 'green'}`} onClick={() => {
                                setCopied(true);
                                navigator.clipboard.writeText(`${currentServerInvite}`);
                                clearTimeout(timeoutstate);
                                let timeout = setTimeout(() => {
                                    setCopied(false);
                                }, 1000)
                                setstateTimeout(timeout);
                            }}>{copied ? 'Copied' : 'Copy'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewServerInvite