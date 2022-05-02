import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';
import { useSocket } from '../../../contexts/socket';

import { addMessageToAll, createMessageAction, getAllMessagesAction } from '../../../actions/message';
import { notifyChannelAndServer } from '../../../actions/notifications';

import './UserContent.css';
import { getAllOnlineMembersAction } from '../../../actions/server';

const UserContent = () => {
    const [createdMessage, setCreatedMessage] = useState('');
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);

    const user = useSelector(state => state.user);
    const channel = useSelector(state => state.channel.currentChannel);
    const allMessagesSelector = useSelector(state => state.message.allChannelMessages);
    const showReminder = useSelector(state => state.other.reminder)
    const currentMessage = useSelector(state => state.message.currentMessage)
    const server = useSelector(state => state.server)

    const { serverId, channelId } = useParams();
    const socket = useSocket();
    const dispatch = useDispatch();

    useEffect(() => {
        if (channelId === 'redirect') return;
        dispatch(getAllMessagesAction(serverId, channelId));
    }, [dispatch, serverId, channelId]);

    useEffect(() => {
        dispatch(getAllOnlineMembersAction(serverId));
    }, [serverId, dispatch])

    useEffect(() => {
        setAllMessages(allMessagesSelector);
    }, [allMessagesSelector, setAllMessages]);

    useEffect(() => {
        if (!socket && !createdMessage.owner) return;
        socket.emit('message', createdMessage);
    }, [socket, createdMessage]);

    useEffect(() => {
        setCreatedMessage(currentMessage);
    }, [currentMessage]);

    useEffect(() => {
        if (!socket) return;
        socket.off('message');
        socket.off('online');
        socket.off('offline');

        socket.on('message', (message) => {
            if (message.owner === user._id) return;
            if (message.server === serverId && message.channel === channelId) dispatch(addMessageToAll(message));
            else dispatch(notifyChannelAndServer(message.messageServerId, message.messageChannel));
        });

        socket.on('online', () => {
            dispatch(getAllOnlineMembersAction(serverId));
        });

        socket.on('offline', () => {
            dispatch(getAllOnlineMembersAction(serverId));
        });
    }, [socket, user, serverId, channelId, dispatch]);

    const handleCreateMessageForm = async (e) => {
        e.preventDefault();
        dispatch(createMessageAction(message, serverId, channel.category, channelId));
        setMessage('');
    }

    return (
        <div className={`user-content background-primary ${showReminder && 'reminder-user-content'}`}>
            <div className="channel-name background-primary">
                <span className="channel-info-name">{channel.name}</span>
            </div>
            <div className="chat">
                <div className="chat-bar-container">
                    <form className="chat-bar background-primary-alt" onSubmit={handleCreateMessageForm}>
                        <input type="text" placeholder={`Message #${channel.name}`} value={message} onChange={(e) => setMessage(e.target.value)} className="chat-bar-area" />
                    </form>
                </div>   
                <div className="chat-container">
                    { 
                        allMessages.map((message, i) => {
                            return (
                                message.small ? <div className="chat-item-small" key={message._id}>
                                    <div className="chat-item-content">
                                        <span className="chat-item-text">{message.content}</span>
                                    </div>
                                </div> :
                                <div className="chat-item" key={i}>
                                    <img className="chat-item-picture" src={message.image} alt="" />
                                    <div className="chat-item-content">
                                        <div className="chat-user-info">
                                            <span className="chat-item-name">{message.ownerName}</span>
                                            <span className="chat-item-date">{new Date(message.creation).toLocaleDateString()}</span>
                                        </div>
                                        <span className="chat-item-text">{message.content}</span>
                                    </div>
                                </div> 
                            )
                        })
                    }
                    <div className="chat-container-header">
                        <span className='chat-contiainer-header-text-large'>Welcome to #{channel.name}!</span>
                        <small className="chat-contiainer-header-text-small">This is the start of the #{channel.name} channel.</small>
                    </div>
                </div>             
            </div>
            <div className="member-list background-secondary">
                <div className="member-list-category">
                    <span className="member-list-name text-channel-colour">ONLINE - {server.allOnlineUsers.length}</span>
                    <div className="members">
                        <div className="member">
                            <img className="member-profile-image" alt="profile" src={user.image ? user.image : 'https://cdn.skid.today/img/1f0bfc0865d324c2587920a7d80c609b.png' } />
                            <span className="member-name text-primary">{user.username}</span>
                        </div>
                        {
                            server.allOnlineUsers.map(member => {
                                if (member._id === user._id) return null;
                                return <div className="member">
                                    <img className="member-profile-image" alt="profile" src={member.image ? member.image : 'https://cdn.skid.today/img/1f0bfc0865d324c2587920a7d80c609b.png' } />
                                    <span className="member-name text-primary">{member.username}</span>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="member-list-category">
                    <span className="member-list-name text-channel-colour">OFFLINE - {server.allOfflineUsers.length}</span>
                    <div className="members">
                        {
                            server.allOfflineUsers.map(member => {
                                if (member._id === user._id) return null;
                                return <div className="member">
                                    <img className="member-profile-image" alt="profile" src={member.image ? member.image : 'https://cdn.skid.today/img/1f0bfc0865d324c2587920a7d80c609b.png' } />
                                    <span className="member-name text-muted">{member.username}</span>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserContent
