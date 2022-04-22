import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './JoinServer.css';

// import { joinInvite } from '../../../../actions/servers';


const JoinServer = (props) => {
    // const [inviteLink, setInviteLink] = useState('');
    // const [error, setError] = useState('')
    // const dispatch = useDispatch();
    // let realInvite = '';

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     splitInviteLink(inviteLink)
    //     dispatch(joinInvite(realInvite));
    //     props.close(false);
    // }

    // const splitInviteLink = (inviteLink) => {
    //     inviteLink = inviteLink.split(`:`).at(-1).split(`//`).at(-1).split(`skid.rocks/invite`).at(-1).split(`skid.today/invite`).at(-1);
    //     inviteLink = inviteLink.split(`/`)[1] || inviteLink.split(`/`).at(-1);
    //     inviteLink = inviteLink.replace(/\s+/g, '') // remove whitespace
    //     if (inviteLink === '') return setError('Invite is invalid or expired.');
    //     setError('');
    //     realInvite = inviteLink;
    // }

    // const handleKeyPress = (e) => {
    //     if (e.key === "Escape") props.close(false)
    //     if (e.key === "Enter") document.getElementById('submit-join-channel').click();
    // }

    // useEffect(() => {
    //     document.addEventListener('keydown', handleKeyPress, false);
    //     return () => document.removeEventListener('keydown', handleKeyPress, false);
    // }, [])

    // return (
    //     <form className="modal-underbody" onSubmit={handleSubmit}>
    //         <div className="modal-container background-primary">
    //             <div className="modal-form">
    //                 <div className="modal-form-header">
    //                     <span className="modal-header-title">Join server</span>
    //                     <small className="modal-header-desc">Enter an invite below to join an existing server</small>
    //                 </div>
    //                 <div className="modal-form-input-container">
    //                     <span className={`modal-form-input-header ${error !== '' && 'error-invite'}`}>Invite Link {error !== '' && `- ${error}`}</span>
    //                     <input type="text" className="modal-form-input" value={inviteLink} onChange={(e) => setInviteLink(e.target.value)} placeholder="skid.today/invite/aO9yuf"/>
    //                 </div>
    //             </div>
    //             <div className="options-container background-secondary">
    //                 <button className="cancel-button" onClick={() => props.close(false)}>Cancel</button>
    //                 <button type="submit" id="submit-join-channel" className="submit-button">Join server</button>
    //             </div>
    //         </div>
    //     </form>
    // );

    return null
}

export default JoinServer;