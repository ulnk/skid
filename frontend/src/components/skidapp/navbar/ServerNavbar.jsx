import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './ServerNavbar.css';
import { getServer } from '../../../actions/servers';
import { useSocket } from '../../../contexts/socket';

import NewServer from '../modals/newserver/NewServer'

const ServerNavbar = () => {
    const [showModal, setShowModal] = useState(false);
    const servers = useSelector((state) => state.servers.all);
    const dispatch = useDispatch();
    const socket = useSocket();
    const { sId } = useParams();

    return (
        <>
            { showModal && <NewServer close={setShowModal} /> }
            <div className="navbar background-tertiary">
                <Link to="/skid/@me">
                    <div className={`selected-noti ${!sId ? 'active' : null}`}></div>
                    <div className={`navbar-server hover-skid background-primary ${!sId ? 'home-selected' : null}`}>
                        <span className="tool">Home</span>
                    </div>
                </Link>

                { servers[0] && <div className="divider background-primary" /> }

                {
                    servers.map((server, i) => {
                        return (
                            <Link key={i} to={`/skid/${server._id}/${server.allCategorys[0].allChannels[0]._id}`}>
                                <div className={`selected-noti ${server._id === sId ? 'active' : null}`}></div>
                                <div className={`navbar-server hover-server background-primary ${server._id === sId ? 'server-selected' : null}`} onClick={() => {
                                    dispatch(getServer());
                                }}>
                                    <span className="tool">{server.serverName}</span>
                                </div>
                            </Link>
                        )
                    })
                }

                <div className="divider background-primary" />

                <div className="navbar-server hover-server background-primary" onClick={() => setShowModal(true)}>
                    <span className="tool">Add a server</span>
                </div>
            </div>
        </>
    )
}

export default ServerNavbar
