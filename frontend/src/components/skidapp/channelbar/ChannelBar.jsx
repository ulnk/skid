import React, { useState, useEffect, useCallback, useRef } from 'react'
import { FaChevronDown, FaPlus, FaChevronRight } from 'react-icons/fa';
import { useParams, Link, useNavigate } from 'react-router-dom';

import './ChannelBar.css';
import { useSelector, useDispatch } from 'react-redux';

import { getServerAction, deleteServerAction, leaveServerAction } from '../../../actions/server';
import { getAllCategoriesAction } from '../../../actions/category';
import { getInviteFromServerAction } from '../../../actions/invite';
import { checkReminder } from '../../../actions/other';

import { useSocket } from '../../../contexts/socket';

import NewCategory from '../../skidapp/modals/newcategory/NewCategory';
import NewChannel from '../../skidapp/modals/newchannel/NewChannel';
import NewServerInvite from '../modals/newserverinvite/NewServerInvite';

import UserInfo from './UserInfo';

const ChannelBar = () => {
    const [showServerContextMenu, setShowServerContextMenu] = useState(false);
    const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
    const [showNewChannelModal, setShowNewChannelModal] = useState(false);
    const [newChannelCategoryId, setNewChannelCategoryId] = useState('');
    const [showNewInviteModal, setShowNewInviteModal] = useState(false);
    const [allServerCategories, setAllServerCategories] = useState([]);
    const contextMenuRef = useRef();
    
    const showReminder = useSelector(state => state.other.reminder)
    const server = useSelector(state => state.server.currentServer);
    const global = useSelector(state => state.server.global);
    const categories = useSelector(state => state.category.allServerCategories);
    const auth = useSelector(state => state.user);

    const { serverId, channelId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const socket = useSocket();

    useEffect(() => {
        dispatch(checkReminder());
        dispatch(getServerAction(serverId));
        dispatch(getAllCategoriesAction(serverId));
        dispatch(getInviteFromServerAction(serverId));
    }, [dispatch, serverId, channelId]);

    useEffect(() => {
        setAllServerCategories(categories);
    }, [categories]);
    
    const handleClick = useCallback((e) => {
        if (!showServerContextMenu) return;
        if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) return setShowServerContextMenu(false);
    }, [showServerContextMenu]);

    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [showServerContextMenu, handleClick])

    const handleDeleteServer = () => {
        socket.emit('deleteServer', serverId);
        dispatch(deleteServerAction(serverId));
        navigate('/skid/@me');
    }

    const handleLeaveServer = () => {
        dispatch(leaveServerAction(serverId));
        navigate('/skid/@me');
    }

    return (
        <>
            <NewServerInvite show={showNewInviteModal} close={setShowNewInviteModal} />
            <NewCategory show={showNewCategoryModal} close={setShowNewCategoryModal} />
            <NewChannel categoryId={newChannelCategoryId} setCategoryId={setNewChannelCategoryId} show={showNewChannelModal} close={setShowNewChannelModal} />
            <UserInfo />
            <nav className={`channel-bar background-secondary noselect ${showReminder && 'rHeight'}`}>
                <section className="server-name" onClick={() => setShowServerContextMenu(!showServerContextMenu)}>
                    <h2 className="server-name-header font-primary">{server.name} <FaChevronDown className="server-name-chevron" /></h2>
                    <ul ref={contextMenuRef} className={`context-menu ${showServerContextMenu && 'on'}`}>
                        {serverId !== global._id ? <>
                            <li className="context-menu-item blue text-blue" onClick={() => setShowNewInviteModal(true)}>
                                <button>Invite People</button>
                            </li>
                            <div className="context-menu-divider"></div>
                            <li className="context-menu-item blue" onClick={() => setShowNewCategoryModal(true)}>
                                <button>Create Category</button>
                            </li>
                            <li className="context-menu-item blue" onClick={() => { }}>
                                <button>Create Channel</button>
                            </li>
                            <div className="context-menu-divider"></div>
                            {auth._id !== server.owner && <li className="context-menu-item red" onClick={() => handleLeaveServer()}>
                                <button>Leave Server</button>
                            </li>}
                            {auth._id === server.owner && <li className="context-menu-item red" onClick={() => handleDeleteServer()}>
                                <button>Delete Server</button>
                            </li>}
                        </> : <>
                            <li className="context-menu-item blue text-blue">
                                <button>Do Nothing</button>
                            </li>
                        </>}
                    </ul>
                </section>
                <div className="channel-bar-items" >
                    <div className="channels">
                        {
                            allServerCategories.map((category, i) => {
                                return (
                                    <Category key={i} category={category} setCategoryId={setNewChannelCategoryId} setShowNewChannelModal={setShowNewChannelModal} />
                                )
                            })
                        }
                    </div>
                    <div className="lilskiddiv">

                    </div>
                </div>
            </nav>
        </>
    );
};


const Category = (props) => {
    const [showCategoryChannels, setShowCategoryChannels] = useState(true);
    const { serverId, channelId } = useParams();
    const allChannels = useSelector(state => state.channel.allServerChannels);

    return (
        <div className="category">
            <div className="category-header text-channel-colour-group">
                {showCategoryChannels ? <FaChevronDown className={`category-chevron colour-group-item`} onClick={() => setShowCategoryChannels(!showCategoryChannels)} /> :
                    <FaChevronRight className="category-chevron colour-group-item" onClick={() => setShowCategoryChannels(!showCategoryChannels)} />}
                <span className="category-header-text font-display colour-group-item" onClick={() => setShowCategoryChannels(!showCategoryChannels)} >{props.category.name.toUpperCase()}</span>
                <FaPlus className="category-add colour-group-item" onClick={() => {props.setShowNewChannelModal(true); props.setCategoryId(props.category._id)}} />
            </div>
            <div className="children">
                {
                    allChannels.filter((c) => c.category === props.category._id).map((channel, i) => {
                        return (showCategoryChannels &&
                            <Link to={`/skid/${serverId}/${channel._id}`} key={i}>
                                <div className={`channel text-channel-colour ${channelId === channel._id ? 'selected' : '' }`}>
                                    <svg width={24} height={24} viewBox="0 0 24 24" className='channel-hashtag text-channel-colour' aria-hidden="true"><path fill="currentColor"clipRule="evenodd" d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"></path></svg>
                                    <span className="channel-title font-primary">{channel.name}</span>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    );
};


export default ChannelBar
