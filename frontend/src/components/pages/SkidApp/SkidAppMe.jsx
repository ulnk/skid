import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

const SkidApp = () => {
    const [temporaryFriends, setTemporaryFriends] = useState([]);
    const [showNewFriend, setShowNewFriend] = useState(false);

    const dispatch = useDispatch()
    const socket = useSocket();
    const navigate = useNavigate();
    const user = useSelector(state => state.user)

    useEffect(() => {
        if (!user._id) navigate('/login');
        dispatch(getAllServersAction());
    }, [user, navigate, dispatch]);

    useEffect(() => {
        dispatch(testAction());
        dispatch(getAllFriendsAction());
    }, []);

    useEffect(() => {
        if (!socket) return;
        console.log('hello')

        socket.off('refreshFriends');
        socket.on('refreshFriends', (target, cacheFriend) => {
            if (cacheFriend.username === user.username) return;
            setTemporaryFriends(arr => [cacheFriend, ...arr])
        });
    }, [socket, user, dispatch]);

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
                                    <li className='user-friend selected'>
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
                                                <li className='user-friend' onClick={() => {
                                                    navigate(`/skid/@me/${friend._id}`)
                                                }} key={i}>
                                                    <img className="user-friend-image" src={friend.image} />
                                                    <div className="user-friend-name">{friend.username}</div>
                                                </li>
                                            )
                                        })
                                    }
                                    {
                                        user.friends?.map((friend, i) => {
                                            return (
                                                <li className='user-friend' onClick={() => {
                                                    navigate(`/skid/@me/${friend._id}`)
                                                }} key={i}>
                                                    <img className="user-friend-image" src={friend.image} />
                                                    <div className="user-friend-name">{friend.username}</div>
                                                </li>
                                            )
                                        })
                                    }
                                    {/* <li className='user-friend'>
                                        <div className="user-friend-image"></div>
                                        <div className="user-friend-name">Taylor Peters</div>
                                    </li>
                                    <li className='user-friend'>
                                        <div className="user-friend-image"></div>
                                        <div className="user-friend-name">BinaryDDoxer</div>
                                    </li>
                                    <li className='user-friend'>
                                        <div className="user-friend-image"></div>
                                        <div className="user-friend-name">RootAccessHacker5</div>
                                    </li> */}
                                    { user.friends && !user.friends[0] && !temporaryFriends[0] && 
                                    <svg className='no-direct-messages' width="184" height="428" viewBox="0 0 184 428" ><rect x="40" y="6" width="144" height="20" rx="10"></rect><circle cx="16" cy="16" r="16"></circle><rect x="40" y="50" width="144" height="20" rx="10" opacity="0.9"></rect><circle cx="16" cy="60" r="16" opacity="0.9"></circle><rect x="40" y="94" width="144" height="20" rx="10" opacity="0.8"></rect><circle cx="16" cy="104" r="16" opacity="0.8"></circle><rect x="40" y="138" width="144" height="20" rx="10" opacity="0.7"></rect><circle cx="16" cy="148" r="16" opacity="0.7"></circle><rect x="40" y="182" width="144" height="20" rx="10" opacity="0.6"></rect><circle cx="16" cy="192" r="16" opacity="0.6"></circle><rect x="40" y="226" width="144" height="20" rx="10" opacity="0.5"></rect><circle cx="16" cy="236" r="16" opacity="0.5"></circle><rect x="40" y="270" width="144" height="20" rx="10" opacity="0.4"></rect><circle cx="16" cy="280" r="16" opacity="0.4"></circle><rect x="40" y="314" width="144" height="20" rx="10" opacity="0.3"></rect><circle cx="16" cy="324" r="16" opacity="0.3"></circle><rect x="40" y="358" width="144" height="20" rx="10" opacity="0.2"></rect><circle cx="16" cy="368" r="16" opacity="0.2"></circle><rect x="40" y="402" width="144" height="20" rx="10" opacity="0.1"></rect><circle cx="16" cy="412" r="16" opacity="0.1"></circle></svg>
                                    }
                                </ul>
                            </div>
                            <UserInfo />
                        </nav>
                        <div className="user-content background-primary flex flex-grow"></div> 
                    </div>
                </div>
            </div>
        </>
    );
}

export default SkidApp
