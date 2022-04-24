import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './ServerNavbar.css';
// import { getServer, removeServer, getServers } from '../../../actions/servers';
import { getServerAction, hideServerAction } from '../../../actions/server';
import { getAllChannelsAction } from '../../../actions/channel';
import { useSocket } from '../../../contexts/socket';

import NewServer from '../modals/newserver/NewServer';
import JoinServer from '../modals/joinserver/JoinServer';

const ServerNavbar = () => {
    const [allServers, setAllServers] = useState([]);
    const [showNewServerModal, setShowNewServerModal] = useState(false);
    const [showJoinServerModal, setShowJoinServerModal] = useState(false);
    const allServersSelector = useSelector((state) => state.server.allServers);
    const allServersChannelsSelector = useSelector((state) => state.channel.allServerChannels);

    const { serverId, channelId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;

        socket.on('deleteServer', (serverIdSocket) => {
            dispatch(hideServerAction(serverId));
            if (serverId === serverIdSocket) navigate('/skid/@me');
        })
    }, [socket, dispatch, navigate]);

    useEffect(() => {
        setAllServers(allServersSelector);
    }, [allServersSelector]);

    useEffect(() => {
        dispatch(getAllChannelsAction(serverId));
        if (channelId !== 'redirect') return;
        if (!allServersChannelsSelector[0]) return;
        navigate(`/skid/${serverId}/${allServersChannelsSelector[0]._id}`);
    }, [channelId]);

    return (
        <>
            <NewServer show={showNewServerModal} close={setShowNewServerModal} join={setShowJoinServerModal} />
            <JoinServer show={showJoinServerModal} close={setShowJoinServerModal} />
            
            <div className="navbar background-tertiary">
                <Link to="/skid/@me">
                    <div className={`selected-noti ${!serverId ? 'active' : null}`}></div>
                    <div className={`navbar-server hover-skid background-primary ${!serverId ? 'home-selected' : null}`}>
                        <span className="tool">Home</span>
                    </div>
                </Link>

                { allServers[0] && <div className="divider background-primary" /> }

                {
                    allServers.map((server, i) => {
                        if (!server) return null;
                        return (
                            <Link key={i} to={`/skid/${server._id}/redirect`}>
                                <div className={`selected-noti ${server._id === serverId ? 'active' : null}`}></div>
                                <div className={`navbar-server hover-server background-primary ${server._id === serverId ? 'server-selected' : null}`} onClick={() => {
                                    dispatch(getServerAction(server._id));
                                }}>
                                    <span className="tool">{server.name}</span>
                                </div>
                            </Link>
                        )
                    })
                }

                <div className="divider background-primary" />

                <div className="navbar-server hover-server background-primary" onClick={() => setShowNewServerModal(true)}>
                    <span className="tool">Add a server</span>
                </div>
            </div>
        </>
    );
}

export default ServerNavbar
