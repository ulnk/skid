import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addServer } from '../../../../actions/servers'

import './NewServer.css'

const NewServer = (props) => {
    const [serverName, setServerName] = useState('')
    const dispatch = useDispatch()
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addServer(serverName))
        setServerName('')
        props.close(false)
    }

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
                    <button type="submit" className="submit-button">Create server</button>
                </div>
            </div>
        </form>
    )
}

export default NewServer