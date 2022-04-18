import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { addServer } from '../../../../actions/servers'
import { useSocket } from '../../../../contexts/socket.js';

import './NewServer.css'

const NewServer = (props) => {
    const [serverName, setServerName] = useState('');
    const dispatch = useDispatch();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(addServer(serverName));
        setServerName('');
        props.close(false);
    }
    
    const handleKeyPress = (e) => {
        if (e.key === "Escape") props.close(false)
        if (e.key === "Enter") document.getElementById('submit-new-server').click();
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress, false);
        return () => document.removeEventListener('keydown', handleKeyPress, false);
    }, [])

    return (
        <form className="modal-underbody" onSubmit={handleSubmit}>
            <div className="modal-container background-primary">
                <div className="modal-form">
                    <div className="modal-form-header">
                        <span className="modal-header-title">Create server</span>
                        <small className="modal-header-desc">Give your new server a personality with a name. You can always change it later.</small>
                    </div>
                    <div className="modal-form-input-container">
                        <span className="modal-form-input-header">SERVER NAME</span>
                        <input type="text" className="modal-form-input" value={serverName} onChange={(e) => setServerName(e.target.value)} placeholder="genericuser's server"/>
                    </div>
                </div>
                <div className="options-container background-secondary">
                    <button className="cancel-button" onClick={() => props.close(false)}>Cancel</button>
                    <button className="cancel-button" onClick={() => {
                        props.join(true);
                        props.close(false);
                    }}>Join a Server</button>
                    <button type="submit" id="submit-new-server" className="submit-button">Create server</button>
                </div>
            </div>
        </form>
    )
}

export default NewServer