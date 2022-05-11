import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addFriendAction } from '../../../../actions/user';
import { useSocket } from '../../../../contexts/socket';

const NewFriend = (props) => {
    const [friendName, setFriendName] = useState('');
    
    const dispatch = useDispatch();
    const socket = useSocket();
    const user = useSelector(state => state.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!props.show) return;
        dispatch(addFriendAction(friendName));
        socket.emit('newFriend', friendName, user);
        setFriendName('');
        props.close(false);
    }

    const handleKeyPress = useCallback( (e) => {
        if (e.key === "Escape") props.close(false)
        if (e.key === "Enter") document.getElementById('submit-new-dm').click();
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
                        <span className="modal-header-title-app">Send Friend Request</span>
                        <small className="modal-header-desc-app">Add friends to talk and share together privately!</small>
                    </div>
                    <div className="modal-form-input-container">
                        <span className="modal-form-input-header">ENTER USERNAME</span>
                        <input type="text" className="modal-form-input" value={friendName} onChange={(e) => setFriendName(e.target.value)}/>
                    </div>
                </div>
                <div className="options-container background-secondary">
                    <button type="button" className="cancel-button" onClick={() => {props.close(false); setFriendName('')}}>Cancel</button>
                    <button type="submit" id="submit-new-dm" className="submit-button">Add Friend</button>
                </div>
            </div>
        </form>
    );
}

export default NewFriend