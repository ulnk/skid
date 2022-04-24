import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createServerAction } from '../../../../actions/server';

const NewServer = (props) => {
    const [serverName, setServerName] = useState('');
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(createServerAction(serverName));
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
        <form className={`modal-underbody ${props.show && 'show'}`} onSubmit={handleSubmit}>
            <div className={`modal-container-app background-primary ${props.show && 'show'}`}>
                <div className="modal-form">
                    <div className="modal-form-header-app">
                        <span className="modal-header-title-app">Create server</span>
                        <small className="modal-header-desc-app">Give your new server a personality with a name. You can always change it later.</small>
                    </div>
                    <div className="modal-form-input-container">
                        <span className="modal-form-input-header">SERVER NAME</span>
                        <input type="text" className="modal-form-input" value={serverName} onChange={(e) => setServerName(e.target.value)} placeholder={`${user.username}'s server`}/>
                    </div>
                </div>
                <div className="options-container background-secondary">
                    <button type="button" className="cancel-button" onClick={() => {props.close(false); setServerName('')}}>Cancel</button>
                    <button type="button" className="cancel-button" onClick={() => {
                        props.join(true);
                        props.close(false);
                        setServerName('')
                    }}>Join a Server</button>
                    <button type="submit" id="submit-new-server" className="submit-button">Create server</button>
                </div>
            </div>
        </form>
    );
}

export default NewServer