import React, { useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getChannel, sendMessage, getMessage } from '../../../actions/servers';
import { pseudoMessage } from '../../../api/';
import { useParams } from 'react-router-dom';

import { useSocket } from '../../../contexts/socket';

import './UserContent.css';

const UserContent = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const channel = useSelector(state => state.servers.channel);
    const socket = useSocket();
    const user = useSelector(state => state.auth.data);

    const [show] = useState(JSON.parse(localStorage.getItem('showReminder')));

    const { sId, cId } = useParams();

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(getChannel(cId, sId));
    }, [dispatch, cId, sId]);

    useLayoutEffect(() => {
        setMessages(channel.allMessages);
    }, [channel, setMessages]);

    useLayoutEffect(() => {
        if (!socket) return;

        socket.on('loadMessage', (message) => {
            if (message.messageUserId === user.userId) return;
            if (message.messageChannel !== cId) return;
            dispatch(getMessage(message));
        })

        socket.off('loadMessages');
    }, [socket, dispatch, user, cId]);

    useLayoutEffect(() => {
        if (!socket) return;
        socket.emit(`joinChannel`, cId);
    }, [socket, cId]);

    const submitForm = async (e) => {
        e.preventDefault();
        dispatch(sendMessage(cId, sId, message));
        socket.emit('sendMessage', await pseudoMessage(cId, sId, message));
        setMessage('');
    }

    return (
        <div className={`user-content background-primary ${show && 'reminder-user-content'}`}>
            <div className="channel-name background-primary">
                <span className="channel-info-name">{channel.channelName}</span>
            </div>
            <div className="chat">
                <div className="chat-bar-container">
                    <form className="chat-bar background-primary-alt" onSubmit={submitForm}>
                        <input type="text" placeholder="Message #general" value={message} onChange={(e) => setMessage(e.target.value)} className="chat-bar-area" />
                    </form>
                </div>   
                <div className="chat-container">
                    { 
                        messages.map((message, i) => {
                            return (
                                message.isSmall ? <div className="chat-item-small">
                                    <div className="chat-item-content">
                                        <span className="chat-item-text">{message.messageContent}</span>
                                    </div>
                                </div> :
                                <div className="chat-item" key={i}>
                                    <img  className="chat-item-picture" src={message.profilePicture} alt="" />
                                    <div className="chat-item-content">
                                        <div className="chat-user-info">
                                            <span className="chat-item-name">{message.messageOwner}</span>
                                            <span className="chat-item-date">{new Date(message.messageCreation).toLocaleDateString()}</span>
                                        </div>
                                        <span className="chat-item-text">{message.messageContent}</span>
                                    </div>
                                </div> 
                            )
                        })
                    }
                </div>             
            </div>
            <div className="member-list background-secondary">
                <div className="member-list-category">
                    <span className="member-list-name text-channel-colour">ONLINE</span>
                    <div className="members">
                        <div className="member">
                            <div className="member-profile-image" />
                            <span className="member-name text-primary">genericuser</span>
                        </div>
                    </div>
                </div>
                <div className="member-list-category">
                    <span className="member-list-name text-channel-colour">OFFLINE</span>
                    <div className="members">
                        <div className="member">
                            <div className="member-profile-image" />
                            <span className="member-name text-muted">Taylor Peters</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserContent