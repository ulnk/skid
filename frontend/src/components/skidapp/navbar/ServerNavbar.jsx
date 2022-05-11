import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './ServerNavbar.css';
// import { getServer, removeServer, getServers } from '../../../actions/servers';
import { hideServerAction, getGlobalServerAction } from '../../../actions/server';
import { getAllChannelsAction, getChannelAction } from '../../../actions/channel';
import { useSocket } from '../../../contexts/socket';

import { FaGlobeAmericas } from 'react-icons/fa';

import NewServer from '../modals/newserver/NewServer';
import JoinServer from '../modals/joinserver/JoinServer';
import { notifyUnreadMessage } from '../../../actions/notifications';

const ServerNavbar = () => {
    const [allServers, setAllServers] = useState([]);
    const [showNewServerModal, setShowNewServerModal] = useState(false);
    const [showJoinServerModal, setShowJoinServerModal] = useState(false);

    const allServerChannelsSelector = useSelector((state) => state.channel.allServerChannels);
    const allServersSelector = useSelector((state) => state.server.allServers);
    const globalServer = useSelector((state) => state.server.global);
    const redirectToChannel = useSelector((state) => state.channel.redirectToChannel);
    const unreadMessages = useSelector((state) => state.notify.unreadMessages);

    const { serverId, channelId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;
        socket.off('messageFriend');
        socket.off('deleteServer');

        socket.on('deleteServer', (serverIdSocket) => {
            dispatch(hideServerAction(serverId));
            if (serverId === serverIdSocket) navigate('/skid/@me');
        })

        socket.on('messageFriend', (msg) => {
            if (!serverId || !channelId) return;
            console.log(msg);
            dispatch(notifyUnreadMessage(msg));
        });
    }, [serverId, channelId, socket, dispatch, navigate]);

    useEffect(() => {
        setAllServers(allServersSelector);
    }, [allServersSelector]);

    useEffect(() => {
        dispatch(getGlobalServerAction());
    }, []);

    useEffect(() => {
        dispatch(getAllChannelsAction(serverId));
    }, [serverId, dispatch]);

    useEffect(() => {
        if (channelId === 'redirect' || channelId === 'null') return;
        dispatch(getChannelAction(channelId));
    }, [channelId, dispatch]);

    useEffect(() => {
        if (!redirectToChannel) return;
        if (!serverId) return;
        const foundChanelInServer = allServerChannelsSelector.filter((c) => c.server === serverId && c._id === channelId);
        if (foundChanelInServer[0]) return;
        navigate(`/skid/${serverId}/${redirectToChannel}`);
    }, [serverId, channelId, redirectToChannel, allServerChannelsSelector, navigate]);

    // useEffect(() => {
    //     if (channelId === 'redirect') {
    //         navigate(`/skid/${serverId}/${allServersChannelsSelector[0] ? allServersChannelsSelector[0]._id : 'redirect'}`);
    //     }
    // }, [serverId, channelId, allServersChannelsSelector])

    // useEffect(() => {
    //     if (channelId !== 'redirect') return;
    //     if (!allServersChannelsSelector[0]) return;
    //     navigate(`/skid/${serverId}/${allServersChannelsSelector[0]._id}`);
    // }, [serverId, channelId, allServersChannelsSelector]);

    return (
        <>
            <NewServer show={showNewServerModal} close={setShowNewServerModal} join={setShowJoinServerModal} />
            <JoinServer show={showJoinServerModal} close={setShowJoinServerModal} />
            
            <div className="navbar background-tertiary">
                <Link to="/skid/@me">
                    <div className={`selected-noti ${!serverId ? 'active' : null}`}></div>
                    <div className={`navbar-server hover-skid background-primary ${!serverId ? 'home-selected' : null}`}>
                        <svg className='server-icon' aria-hidden="false" width="28" height="20" viewBox="0 0 28 20"><path fill="currentColor" d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0.00546311C8.48074 0.324393 6.67795 0.885118 4.96746 1.68231C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.7718 19.2689 20.3021 19.9945C22.6677 19.2689 24.8929 18.1364 26.8828 16.6466H26.8893C27.43 10.9731 25.9665 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0124 8.34973 18.3161 8.34973C19.6184 8.34973 20.6751 9.54272 20.6543 10.994C20.6543 12.4453 19.6184 13.6383 18.3161 13.6383Z"></path></svg>
                        <span className="tool">Home</span>
                    </div>
                </Link>

                {
                    unreadMessages.map(dm => {
                        return (
                            <Link to={`/skid/@me/${dm.owner}`}>
                                <div className={`selected-noti`}></div>
                                <div data-ping-count={dm.count} className={`ping navbar-server hover-skid background-primary ${!serverId ? 'home-selected' : null}`}>
                                    <img className='server-icon-image' src={dm.image} alt='server icon' />
                                    <span className="tool">{dm.ownerName}</span>
                                </div>
                            </Link>
                        )
                    })
                }

                { allServers[0] || globalServer._id ? <div className="divider background-primary" /> : null }

                {globalServer._id && 
                <Link key={-1} to={`/skid/${globalServer._id}/redirect`}>
                    <div className={`selected-noti ${globalServer._id === serverId ? 'active' : null}`}></div>
                    <div className={`navbar-server  hover-skid background-primary ${globalServer._id === serverId ? 'home-selected' : null}`}>
                        {/* <span className='server-title'>{globalServer.name?.split(" ")[0]?.slice(0, 1)}{globalServer.name.split(" ")[1]?.slice(0, 1)}</span> */}
                        <FaGlobeAmericas className='server-title global' />
                        <span className="tool">{globalServer.name}</span>
                    </div>
                </Link>}

                {
                    allServers.map((server, i) => {
                        if (!server) return null;
                        return (
                            <Link key={i} to={`/skid/${server._id}/redirect`}>
                                <div className={`selected-noti ${server._id === serverId ? 'active' : null}`}></div>
                                <div className={`navbar-server hover-skidr background-primary ${server._id === serverId ? 'home-selected' : null}`}>
                                    <span className='server-title'>{server.name.split(" ")[0]?.slice(0, 1)}{server.name.split(" ")[1]?.slice(0, 1)}</span>
                                    <span className="tool">{server.name}</span>
                                </div>
                            </Link>
                        )
                    })
                }

                <div className="divider background-primary" />

                <div className={`navbar-server hover-site background-primary ${showNewServerModal && 'site-selected'}`} onClick={() => setShowNewServerModal(true)}>
                <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z"></path></svg>
                    <span className="tool">Add a server</span>
                </div>
            </div>
        </>
    );
}

export default ServerNavbar
