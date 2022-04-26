import React, { useState, useEffect, useCallback, useRef } from 'react'
import { FaChevronDown, FaPlus, FaHashtag, FaChevronRight } from 'react-icons/fa';
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
        server._id ?
            <>
                <NewServerInvite show={showNewInviteModal} close={setShowNewInviteModal} />
                <NewCategory show={showNewCategoryModal} close={setShowNewCategoryModal} />
                <NewChannel categoryId={newChannelCategoryId} setCategoryId={setNewChannelCategoryId} show={showNewChannelModal} close={setShowNewChannelModal} />
                <UserInfo />
                <nav className={`channel-bar background-secondary noselect ${showReminder && 'rHeight'}`}>
                    <div className="channel-bar-items" >
                        <section className="server-name" onClick={() => setShowServerContextMenu(!showServerContextMenu)}>
                            <h2 className="server-name-header font-primary">{server.name}</h2>
                            <FaChevronDown className="server-name-chevron" />
                            <ul ref={contextMenuRef} className={`context-menu ${showServerContextMenu && 'on'}`}>
                                {serverId !== '625c7d70df1a464bb9d6d059' ? <>
                                    <li className="context-menu-item blue text-blue" onClick={() => setShowNewInviteModal(true)}>
                                        <button>Invite People</button>
                                    </li>
                                    <li className="context-menu-item blue" onClick={() => setShowNewCategoryModal(true)}>
                                        <button>Create Category</button>
                                    </li>
                                    {auth._id !== server.owner && <li className="context-menu-item red" onClick={() => handleLeaveServer()}>
                                        <button>Leave Server</button>
                                    </li>}
                                    {auth._id === server.owner && <li className="context-menu-item red" onClick={() => handleDeleteServer()}>
                                        <button>Delete Server</button>
                                    </li>}
                                </>: null}
                            </ul>
                        </section>
                        <div className="channels">
                            {
                                allServerCategories.map((category, i) => {
                                    return (
                                        <Category key={i} category={category} setCategoryId={setNewChannelCategoryId} setShowNewChannelModal={setShowNewChannelModal} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </nav>
            </> : 
            <nav className={`channel-bar background-secondary noselect ${showReminder && 'rHeight'}`}>
                <div className="channel-bar-items" >
                    <section className="server-name">
                    </section>
                    <div className="channels">
                    </div>
                </div>
            </nav>
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
                                    <FaHashtag className="channel-hashtag text-channel-colour" />
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
