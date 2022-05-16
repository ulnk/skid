import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

import '../../skidapp/skidapp.css';
import './SkidAppMe.css';
import { getAllServersAction } from '../../../actions/server';
import { testAction, getAllFriendsAction } from '../../../actions/user';

// Main Components
import ServerNavbar from '../../skidapp/navbar/ServerNavbar';
import UserInfo from '../../skidapp/channelbar/UserInfo';
import Reminder from '../../skidapp/reminder/Reminder';

import NewFriend from './modals/NewFriend';
import { useSocket } from '../../../contexts/socket';
import { checkReminder } from '../../../actions/other';
import { createFriendMessageAction, getAllFriendMessagesAction } from '../../../actions/friend';
import { clearUnreadMessage } from '../../../actions/notifications';

const SkidAppMeMessage = () => {
    const [showNewFriend, setShowNewFriend] = useState(false);
    const [message, setMessage] = useState('');
    const [temporaryFriends, setTemporaryFriends] = useState([]);
    const [allMessages, setAllMessages] = useState([]);

    const dispatch = useDispatch();
    const socket = useSocket();
    const navigate = useNavigate();
    const { userId } = useParams();
    const allMessagesSelector = useSelector(state => state.friend.allChannelMessages);
    const user = useSelector(state => state.user);
    const showReminder = useSelector(state => state.other.reminder);

    useEffect(() => {
        if (!user._id) navigate('/login');
        dispatch(getAllServersAction());
    }, [user, navigate, dispatch]);

    useEffect(() => {
        dispatch(testAction());
        dispatch(getAllFriendsAction());
        dispatch(checkReminder());
    }, [dispatch]);

    useEffect(() => {
        dispatch(clearUnreadMessage(userId));
        dispatch(getAllFriendMessagesAction(userId));
    }, [userId, dispatch]);

    useEffect(() => {
        setAllMessages(allMessagesSelector);
    }, [allMessagesSelector, setAllMessages]);

    useEffect(() => {
        if (!socket) return;

        socket.off('refreshFriends');
        socket.off('messageFriend');
        socket.on('refreshFriends', (target, cacheFriend) => {
            if (target !== user.username) return;
            setTemporaryFriends(arr => [cacheFriend, ...arr])
        });

        socket.on('messageFriend', (msg) => {
            // if (user._id.toString())
            console.log(msg.owner, userId)
            if (msg.owner !== userId) return;
            setAllMessages(x => [{ owner: msg.owner, content: msg.content, ownerName: msg.ownerName, creation: msg.creation, image: msg.image, small: msg.small }, ...x]);
        });
    }, [socket, userId, dispatch, user]);

    const handleNewMessage = (e) => {
        e.preventDefault();
        if (message.replace(/\s/g, '') === '') return;
        const small = allMessages[0] ? allMessages[0].owner.toString() === user._id.toString() : false;
        dispatch(createFriendMessageAction(message, userId, small));
        socket.emit('messageFriend', { owner: user._id, friend: userId, content: message, ownerName: user.username, creation: Date.now(), image: user.image, small });
        setAllMessages(x => [{ owner: user._id, content: message, ownerName: user.username, creation: Date.now(), image: user.image, small }, ...x]);
        setMessage('');
    }

    return (
        <>
            <NewFriend show={showNewFriend} close={setShowNewFriend} />
            <div className="flex h-screen w-screen overflow-hidden">
                <ServerNavbar />
                <div className="reminder-container">
                    <Reminder />    
                    <div className="flex transition-none user-context-navbar-container">
                        <nav className="channel-bar background-secondary">
                            <div className="channel-bar-inner">
                                <section className="friend-list-top">
                                    <div className="search-friend-list"></div>
                                </section>
                                <ul className="user-friend-container">
                                    <li className='user-friend' onClick={() => {
                                                    navigate(`/skid/@me`)
                                                }}>
                                        <div className="user-friend-image icon">
                                            <svg className='user-friend-image-icon' aria-hidden="false" width="16" height="16" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path fill="currentColor" fillRule="nonzero" d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z" transform="translate(2 4)"></path><path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path></g></svg>
                                        </div>
                                        <div className="user-friend-name">Friends</div>
                                    </li>
                                    <li className='user-friend'>
                                        <div className="user-friend-image icon">
                                            <svg className='user-friend-image-icon' aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M2.98966977,9.35789159 C2.98966977,9.77582472 2.63442946,10.1240466 2.20807287,10.1240466 L1.78171628,10.1240466 C1.35535969,10.1240466 0.999948837,9.77582472 0.999948837,9.35789159 C0.999948837,8.93995846 1.35535969,8.59173658 1.78171628,8.59173658 L2.20807287,8.59173658 C2.63442946,8.59173658 2.98966977,8.93995846 2.98966977,9.35789159 Z M22.2467643,9.14892503 C24.0942527,12.9800344 22.3888264,17.5772989 18.3384388,19.3882867 C14.4302837,21.1297305 9.74036124,19.457998 7.9638186,15.6268886 C7.60857829,14.8607335 7.3954,14.0248673 7.32428372,13.189001 L5.76091938,13.189001 C5.33456279,13.189001 4.97932248,12.840612 4.97932248,12.4226788 C4.97932248,12.0047457 5.33456279,11.6565238 5.76091938,11.6565238 L8.03493488,11.6565238 C8.46129147,11.6565238 8.81653178,11.3083019 8.81653178,10.8903688 C8.81653178,10.4724357 8.46129147,10.1240466 8.03493488,10.1240466 L4.41090388,10.1240466 C3.98454729,10.1240466 3.62913643,9.77582472 3.62913643,9.35789159 C3.62913643,8.93995846 3.98454729,8.59173658 4.41090388,8.59173658 L9.45606667,8.59173658 C9.88242326,8.59173658 10.2376636,8.24334752 10.2376636,7.82541439 C10.2376636,7.40748126 9.88242326,7.05925937 9.45606667,7.05925937 L7.3954,7.05925937 C6.75586512,7.05925937 6.18727597,6.57161499 6.18727597,5.87517123 C6.18727597,5.24827153 6.68474884,4.69091591 7.3954,4.69091591 L15.4250589,4.69091591 C18.267493,4.8303384 20.9676946,6.43235968 22.2467643,9.14892503 Z M13.2662961,8.38056332 C11.0193969,9.3919615 10.0341721,11.9973566 11.065955,14.1998642 C12.097738,16.4023718 14.755645,17.3681317 17.0025442,16.3567335 C19.249614,15.3453354 20.2346682,12.7399402 19.2028853,10.5374326 C18.1711023,8.33492503 15.5131953,7.36916515 13.2662961,8.38056332 Z M16.8462589,9.84548582 L18.2673907,12.2138293 C18.338507,12.3530846 18.338507,12.4227958 18.2673907,12.5620512 L16.8462589,14.9303946 C16.7751426,15.0696499 16.6330806,15.0696499 16.5619643,15.0696499 L13.7906465,15.0696499 C13.6485845,15.0696499 13.5774682,14.9999387 13.5065225,14.9303946 L12.0852202,12.5620512 C12.0142744,12.4227958 12.0142744,12.3530846 12.0852202,12.2138293 L13.5065225,9.84548582 C13.5774682,9.7062305 13.7197008,9.7062305 13.7906465,9.7062305 L16.5619643,9.7062305 C16.7041969,9.63651925 16.7751426,9.7062305 16.8462589,9.84548582 Z"></path></svg>
                                        </div>
                                        <div className="user-friend-name">Oxygen</div>
                                    </li>
                                    <li className="user-header">
                                        <span className="user-header-text">DIRECT MESSAGES</span>
                                        <FaPlus className="user-header-add" onClick={() => setShowNewFriend(true)} />
                                    </li>
                                    {
                                        temporaryFriends.map((friend, i) => {
                                            return (
                                                <li className={`user-friend ${userId === friend._id} && selected`} onClick={() => {
                                                    navigate(`/skid/@me/${friend._id}`)
                                                }} key={i}>
                                                    <img alt="user friend img" className="user-friend-image" src={friend.image} />
                                                    <div className="user-friend-name">{friend.username}</div>
                                                </li>
                                            )
                                        })
                                    }
                                    {
                                        user.friends?.map((friend, i) => {
                                            return (
                                                <li className={`user-friend ${userId === friend._id && 'selected'}`} onClick={() => {
                                                    navigate(`/skid/@me/${friend._id}`)
                                                }} key={i}>
                                                    <img alt="user friend img" className="user-friend-image" src={friend.image} />
                                                    <div className="user-friend-name">{friend.username}</div>
                                                </li>
                                            )
                                        })
                                    }
                                    { user.friends && !user.friends[0] && !temporaryFriends[0] && 
                                    <svg className='no-direct-messages' width="184" height="428" viewBox="0 0 184 428" ><rect x="40" y="6" width="144" height="20" rx="10"></rect><circle cx="16" cy="16" r="16"></circle><rect x="40" y="50" width="144" height="20" rx="10" opacity="0.9"></rect><circle cx="16" cy="60" r="16" opacity="0.9"></circle><rect x="40" y="94" width="144" height="20" rx="10" opacity="0.8"></rect><circle cx="16" cy="104" r="16" opacity="0.8"></circle><rect x="40" y="138" width="144" height="20" rx="10" opacity="0.7"></rect><circle cx="16" cy="148" r="16" opacity="0.7"></circle><rect x="40" y="182" width="144" height="20" rx="10" opacity="0.6"></rect><circle cx="16" cy="192" r="16" opacity="0.6"></circle><rect x="40" y="226" width="144" height="20" rx="10" opacity="0.5"></rect><circle cx="16" cy="236" r="16" opacity="0.5"></circle><rect x="40" y="270" width="144" height="20" rx="10" opacity="0.4"></rect><circle cx="16" cy="280" r="16" opacity="0.4"></circle><rect x="40" y="314" width="144" height="20" rx="10" opacity="0.3"></rect><circle cx="16" cy="324" r="16" opacity="0.3"></circle><rect x="40" y="358" width="144" height="20" rx="10" opacity="0.2"></rect><circle cx="16" cy="368" r="16" opacity="0.2"></circle><rect x="40" y="402" width="144" height="20" rx="10" opacity="0.1"></rect><circle cx="16" cy="412" r="16" opacity="0.1"></circle></svg>
                                    }
                                </ul>
                            </div>
                        </nav>
                        <UserInfo />
                        {/* <div className="user-content background-primary flex flex-grow"></div>  */}
                        {/*  */}
                        {/*  */}
                        {/*  */}
                        <div className={`user-content background-primary ${showReminder && 'reminder-user-content'}`}>
                            <div className="channel-name background-primary">
                                <svg className='hashtag-channel-name' aria-hidden="true"><path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"></path></svg>
                                <span className="channel-info-name">@{userId}</span>
                                <div className="right-side-buttons">
                                    <svg className='right-side-button' aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.486 2 2 6.487 2 12C2 17.515 6.486 22 12 22C17.514 22 22 17.515 22 12C22 6.487 17.514 2 12 2ZM12 18.25C11.31 18.25 10.75 17.691 10.75 17C10.75 16.31 11.31 15.75 12 15.75C12.69 15.75 13.25 16.31 13.25 17C13.25 17.691 12.69 18.25 12 18.25ZM13 13.875V15H11V12H12C13.104 12 14 11.103 14 10C14 8.896 13.104 8 12 8C10.896 8 10 8.896 10 10H8C8 7.795 9.795 6 12 6C14.205 6 16 7.795 16 10C16 11.861 14.723 13.429 13 13.875Z"></path></svg>
                                    <svg className='right-side-button' aria-hidden="false" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill="currentColor" d="M19 3H4.99C3.88 3 3.01 3.89 3.01 5L3 19C3 20.1 3.88 21 4.99 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3ZM19 15H15C15 16.66 13.65 18 12 18C10.35 18 9 16.66 9 15H4.99V5H19V15Z"></path></svg>
                                    <div className="dumb-seach-bar"></div>
                                    <svg className='right-side-button' aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12L12.101 2.10101L10.686 3.51401L12.101 4.92901L7.15096 9.87801V9.88001L5.73596 8.46501L4.32196 9.88001L8.56496 14.122L2.90796 19.778L4.32196 21.192L9.97896 15.536L14.222 19.778L15.636 18.364L14.222 16.95L19.171 12H19.172L20.586 13.414L22 12Z"></path></svg>
                                    <svg className='right-side-button' aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21.178 1.70703L22.592 3.12103L4.12103 21.593L2.70703 20.178L21.178 1.70703Z"></path><path fill="currentColor" d="M18 10.5283L10.5287 18H21V17C19.344 17 18 15.657 18 14V10.5283Z"></path><path fill="currentColor" d="M8.957 19.5718L9.52877 19H15.4449C14.7519 20.19 13.4759 21 11.9999 21C10.7748 21 9.68752 20.442 8.957 19.5718Z"></path><path fill="currentColor" d="M12 3C13.417 3 14.71 3.5 15.734 4.321L5.99805 14.058C5.99805 14.0479 5.99856 14.038 5.99907 14.0283C5.99956 14.0188 6.00005 14.0094 6.00005 14V9C6.00005 5.686 8.68605 3 12 3Z"></path></svg>
                                </div>
                            </div>
                            <div className="chat">
                                <div className="chat-bar-container">
                                    <form className="chat-bar background-primary-alt" onSubmit={handleNewMessage}>
                                        <input type="text" placeholder={`Message @${userId}`} value={message} onChange={(e) => setMessage(e.target.value)} className="chat-bar-area" />
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
                                    <div className={`chat-container-header ${false && 'shrink'}`}>
                                        <span className='chat-contiainer-header-text-large'>Welcome to @{userId}!</span>
                                        <small className="chat-contiainer-header-text-small">This is the beginning of your direct message with @{userId}.</small>
                                    </div>
                                </div>             
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SkidAppMeMessage
