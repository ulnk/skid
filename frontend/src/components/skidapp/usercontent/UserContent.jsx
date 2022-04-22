import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { getChannel, sendMessage, getMessage } from '../../../actions/servers';
// import { pseudoMessage } from '../../../api/';
import { useParams } from 'react-router-dom';
import { useSocket } from '../../../contexts/socket';

// import { notifyChannelAndServer } from '../../../actions/notifications';

import './UserContent.css';

const UserContent = () => {
    // const [message, setMessage] = useState('');
    // const [messages, setMessages] = useState([]);
    // const channel = useSelector(state => state.servers.channel);
    // const socket = useSocket();
    // const user = useSelector(state => state.user);
    // const show = useSelector(state => state.servers.reminder)

    // const { serverId, channelId } = useParams();
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getChannel(channelId, serverId));
    // }, [dispatch, serverId, channelId]);

    // useEffect(() => {
    //     setMessages(channel.messages);
    // }, [channel, setMessages]);

    // useEffect(() => {
    //     if (!socket) return;
    //     socket.off('loadMessage'); // all i had to do was move it up 4 lines to be before socket.on :osaka:

    //     socket.on('loadMessage', (message) => {
    //         if (message.owner === user.id) return;
    //         if (message.server === serverId && message.messageChannel === channelId) dispatch(getMessage(message));
    //         else {
    //             dispatch(notifyChannelAndServer(message.messageServerId, message.messageChannel));
    //         }
    //     })

    // }, [socket, dispatch, user, channelId]);

    // const submitForm = async (e) => {
    //     e.preventDefault();
    //     dispatch(sendMessage(channelId, serverId, message));
    //     socket.emit('sendMessage', await pseudoMessage(channelId, serverId, message));
    //     setMessage('');
    // }

    // return (
    //     <div className={`user-content background-primary ${show && 'reminder-user-content'}`}>
    //         <div className="channel-name background-primary">
    //             <span className="channel-info-name">{channel.channelName}</span>
    //         </div>
    //         <div className="chat">
    //             <div className="chat-bar-container">
    //                 <form className="chat-bar background-primary-alt" onSubmit={submitForm}>
    //                     <input type="text" placeholder="Message #general" value={message} onChange={(e) => setMessage(e.target.value)} className="chat-bar-area" />
    //                 </form>
    //             </div>   
    //             <div className="chat-container">
    //                 { 
    //                     messages.map((message, i) => {
    //                         return (
    //                             message.isSmall ? <div className="chat-item-small" key={message._id}>
    //                                 <div className="chat-item-content">
    //                                     <span className="chat-item-text">{message.messageContent}</span>
    //                                 </div>
    //                             </div> :
    //                             <div className="chat-item" key={i}>
    //                                 <img  className="chat-item-picture" src={message.profilePicture} alt="" />
    //                                 <div className="chat-item-content">
    //                                     <div className="chat-user-info">
    //                                         <span className="chat-item-name">{message.messageOwner}</span>
    //                                         <span className="chat-item-date">{new Date(message.messageCreation).toLocaleDateString()}</span>
    //                                     </div>
    //                                     <span className="chat-item-text">{message.messageContent}</span>
    //                                 </div>
    //                             </div> 
    //                         )
    //                     })
    //                 }
    //             </div>             
    //         </div>
    //         <div className="member-list background-secondary">
    //             <div className="member-list-category">
    //                 <span className="member-list-name text-channel-colour">ONLINE</span>
    //                 <div className="members">
    //                     <div className="member">
    //                         <div className="member-profile-image" />
    //                         <span className="member-name text-primary">genericuser</span>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="member-list-category">
    //                 <span className="member-list-name text-channel-colour">OFFLINE</span>
    //                 <div className="members">
    //                     <div className="member">
    //                         <div className="member-profile-image" />
    //                         <span className="member-name text-muted">Taylor Peters</span>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
    return null;
}

export default UserContent
