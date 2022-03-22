import React, { useState, useLayoutEffect } from 'react'
import { FaChevronDown, FaPlus, FaHashtag, FaChevronRight } from 'react-icons/fa';
import { useParams, Link, useNavigate } from 'react-router-dom';

import './ChannelBar.css';
import { useSelector, useDispatch } from 'react-redux';

import { getServer, deleteServer } from '../../../actions/servers';

import NewCategory from '../../skidapp/modals/newcategory/NewCategory';
import NewChannel from '../../skidapp/modals/newchannel/NewChannel';

import UserInfo from './UserInfo';

const ChannelBar = () => {
    const [showContext, setShowContext] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showChannelModal, setShowChannelModal] = useState([false, '']);
    const [show] = useState(JSON.parse(localStorage.getItem('showReminder')));

    const { sId } = useParams();
    const server = useSelector(state => state.servers.current);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(getServer(sId));
    }, [dispatch, sId]);

    const handleDeleteServer = () => {
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
                        <section className="server-name" onClick={() => setShowContext(true)}>
                            <h2 className="server-name-header font-primary">{server.serverName}</h2>
                            <FaChevronDown className="server-name-chevron" />
                            {showContext &&
                                <ul className="context-menu">
                                    <li className="context-menu-item blue" onClick={() => setShowCategoryModal(true)}>
                                        <button>Create Category</button>
                                    </li>
                                    <li className="context-menu-item red" onClick={() => handleDeleteServer()}>
                                        <button>Delete Server</button>
                                    </li>
                                </ul>
                            }
                        </section>
                        <div className="channels">
                            {
                                server.allCategorys.map((category, i) => {
                                    return (
                                        <Category i={i} category={category} setShowChannelModal={setShowChannelModal} />
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
        <div className="category" key={props.category._id}>
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
                            <Link to={`/skid/${sId}/${channel._id}`}>
                                <div className={`channel text-channel-colour ${cId === channel._id ? 'selected' : '' }`} key={i}>
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