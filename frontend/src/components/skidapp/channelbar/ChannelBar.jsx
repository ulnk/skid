import React, { useState, useEffect, useRef } from 'react'
import { FaChevronDown, FaPlus, FaHashtag, FaChevronRight } from 'react-icons/fa';
import { useParams, Link, useNavigate } from 'react-router-dom';

import './ChannelBar.css';
import { useSelector, useDispatch } from 'react-redux';

// import { getServer, deleteServer, leaveServer, checkReminder, hasInvite } from '../../../actions/servers';
import { useSocket } from '../../../contexts/socket';

import NewCategory from '../../skidapp/modals/newcategory/NewCategory';
import NewChannel from '../../skidapp/modals/newchannel/NewChannel';
import NewServerInvite from '../modals/newserverinvite/NewServerInvite';

import UserInfo from './UserInfo';

const ChannelBar = () => {
    // const [showContext, setShowContext] = useState(false);
    // const [showCategoryModal, setShowCategoryModal] = useState(false);
    // const [showChannelModal, setShowChannelModal] = useState([false, '']);
    // const [showNewServerInviteModal, setShowNewServerInviteModal] = useState(false);
    // const contextRef = useRef();
    
    // const show = useSelector(state => state.other.reminder)
    // const server = useSelector(state => state.server.currentServer);
    // const auth = useSelector(state => state.user);

    // const { serverId } = useParams();
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const socket = useSocket();

    // useEffect(() => {
    //     dispatch(hasInvite(serverId));
    //     dispatch(getServer(serverId));
    //     dispatch(checkReminder());
    // }, [dispatch, serverId]);
    
    // useEffect(() => {
    //     document.addEventListener('click', handleClick)
    //     return () => document.removeEventListener('click', handleClick)
    // }, [showContext])
    
    // const handleClick = (e) => {
    //     if (!showContext) return;
    //     if (!contextRef.current.contains(e.target)) return setShowContext(false);
    // }

    // const handleDeleteServer = () => {
    //     socket.emit('deleteServer', serverId);
    //     dispatch(deleteServer(serverId));
    //     navigate('/skid/@me');
    // }

    // const handleLeaveServer = () => {
    //     dispatch(leaveServer(serverId));
    //     navigate('/skid/@me');
    // }

    // return (
    //     server.id ?
    //         (<>
    //             {showNewServerInviteModal && <NewServerInvite close={setShowNewServerInviteModal} />}
    //             {showCategoryModal && <NewCategory close={setShowCategoryModal} />}
    //             {showChannelModal[0] && <NewChannel categoryId={showChannelModal[1]} close={setShowChannelModal} />}
    //             <UserInfo />
    //             <nav className={`channel-bar background-secondary noselect ${show && 'rHeight'}`}>
    //                 <div className="channel-bar-items" >
    //                     <section className="server-name" onClick={() => setShowContext(!showContext)}>
    //                         <h2 className="server-name-header font-primary">{server.name}</h2>
    //                         <FaChevronDown className="server-name-chevron" />
    //                         {/* {showContext && */}
    //                             <ul ref={contextRef} className={`context-menu ${showContext && 'on'}`}>
    //                                 <li className="context-menu-item blue" onClick={() => setShowCategoryModal(true)}>
    //                                     <button>Create Category</button>
    //                                 </li>
    //                                 {serverId !== '625c7d70df1a464bb9d6d059' ? <>
    //                                     <li className="context-menu-item blue" onClick={() => setShowNewServerInviteModal(true)}>
    //                                         <button>Create Server Invite</button>
    //                                     </li>
    //                                     {auth.id !== server.owner && <li className="context-menu-item red" onClick={() => handleLeaveServer()}>
    //                                         <button>Leave Server</button>
    //                                     </li>}
    //                                     {auth.id === server.owner && <li className="context-menu-item red" onClick={() => handleDeleteServer()}>
    //                                         <button>Delete Server</button>
    //                                     </li>}
    //                                 </>: null}
    //                             </ul>
    //                         {/* } */}
    //                     </section>
    //                     <div className="channels">
    //                         {
    //                             server.categorys.map((category, i) => {
    //                                 return (
    //                                     <Category key={i} category={category} setShowChannelModal={setShowChannelModal} />
    //                                 )
    //                             })
    //                         }
    //                     </div>
    //                 </div>
    //             </nav>
    //         </>) : null
    // )

    return null;
}


// const Category = (props) => {
//     const [showItems, setShowItems] = useState(true);
//     const { sId, cId } = useParams();
//     return (
//         <div className="category">
//             <div className="category-header text-channel-colour-group">
//                 {showItems ? <FaChevronDown className={`category-chevron colour-group-item`} onClick={() => setShowItems(!showItems)} /> :
//                     <FaChevronRight className="category-chevron colour-group-item" onClick={() => setShowItems(!showItems)} />}
//                 <span className="category-header-text font-display colour-group-item" onClick={() => setShowItems(!showItems)} >{props.category.categoryName.toUpperCase()}</span>
//                 <FaPlus className="category-add colour-group-item" onClick={() => props.setShowChannelModal([true, props.category._id])} />
//             </div>
//             <div className="children">
//                 {
//                     props.category.allChannels.map((channel, i) => {
//                         return (showItems &&
//                             <Link to={`/skid/${sId}/${channel._id}`} key={i}>
//                                 <div className={`channel text-channel-colour ${cId === channel._id ? 'selected' : '' }`}>
//                                     <FaHashtag className="channel-hashtag text-channel-colour" />
//                                     <span className="channel-title font-primary">{channel.channelName}</span>
//                                 </div>
//                             </Link>
//                         )
//                     })
//                 }
//             </div>
//         </div>
//     )
// }


export default ChannelBar
