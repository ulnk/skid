import React, { useState, useEffect } from 'react'
import { FaChevronDown, FaPlus, FaHashtag, FaChevronRight } from 'react-icons/fa';
import { useParams, Link, useNavigate } from 'react-router-dom';

import './ChannelBar.css';
import { useSelector, useDispatch } from 'react-redux';

import { getServer, deleteServer, checkReminder, joinInvite } from '../../../actions/servers';
import { useSocket } from '../../../contexts/socket';

import NewCategory from '../../skidapp/modals/newcategory/NewCategory';
import NewChannel from '../../skidapp/modals/newchannel/NewChannel';

import UserInfo from './UserInfo';

const ChannelBar = () => {
    const [showContext, setShowContext] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showChannelModal, setShowChannelModal] = useState([false, '']);
    
    const show = useSelector(state => state.servers.reminder)
    const server = useSelector(state => state.servers.current);

    const { sId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const socket = useSocket();

    const joinServerFromInvite = () => {
        dispatch(joinInvite('355f9b'));
    }

    useEffect(() => {
        dispatch(getServer(sId));
        dispatch(checkReminder());
    }, [dispatch, sId]);

    const handleDeleteServer = () => {
        socket.emit('deleteServer', sId)
        dispatch(deleteServer(sId));
        navigate('/skid/@me');
    }

    return (
        server._id ?
            (<>
                {showCategoryModal && <NewCategory close={setShowCategoryModal} />}
                {showChannelModal[0] && <NewChannel categoryId={showChannelModal[1]} close={setShowChannelModal} />}
                <UserInfo />
                <nav className={`channel-bar background-secondary ${show && 'rHeight'}`}>
                    <div className="channel-bar-items" >
                        <section className="server-name" onClick={() => setShowContext(!showContext)}>
                            <h2 className="server-name-header font-primary">{server.serverName}</h2>
                            <FaChevronDown className="server-name-chevron" />
                            {/* {showContext && */}
                                <ul className={`context-menu ${showContext && 'on'}`}>
                                    <li className="context-menu-item blue" onClick={() => setShowCategoryModal(true)}>
                                        <button>Create Category</button>
                                    </li>
                                    <li className="context-menu-item blue" onClick={() => joinServerFromInvite()}>
                                        <button>Join Random Server</button>
                                    </li>
                                    {sId !== '624f38f4b636951080d5a395' ? <>
                                        <li className="context-menu-item red" onClick={() => handleDeleteServer()}>
                                            <button>Delete Server</button>
                                        </li> 
                                        <li className="context-menu-item red" onClick={() => joinServerFromInvite()}>
                                            <button>Leave Server</button>
                                        </li>
                                    </>: null}
                                </ul>
                            {/* } */}
                        </section>
                        <div className="channels">
                            {
                                server.allCategorys.map((category, i) => {
                                    return (
                                        <Category key={i} category={category} setShowChannelModal={setShowChannelModal} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </nav>
            </>) : null
    )
}


const Category = (props) => {
    const [showItems, setShowItems] = useState(true);
    const { sId, cId } = useParams();
    return (
        <div className="category">
            <div className="category-header text-channel-colour-group">
                {showItems ? <FaChevronDown className={`category-chevron colour-group-item`} onClick={() => setShowItems(!showItems)} /> :
                    <FaChevronRight className="category-chevron colour-group-item" onClick={() => setShowItems(!showItems)} />}
                <span className="category-header-text font-display colour-group-item" onClick={() => setShowItems(!showItems)} >{props.category.categoryName.toUpperCase()}</span>
                <FaPlus className="category-add colour-group-item" onClick={() => props.setShowChannelModal([true, props.category._id])} />
            </div>
            <div className="children">
                {
                    props.category.allChannels.map((channel, i) => {
                        return (showItems &&
                            <Link to={`/skid/${sId}/${channel._id}`} key={i}>
                                <div className={`channel text-channel-colour ${cId === channel._id ? 'selected' : '' }`}>
                                    <FaHashtag className="channel-hashtag text-channel-colour" />
                                    <span className="channel-title font-primary">{channel.channelName}</span>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default ChannelBar
