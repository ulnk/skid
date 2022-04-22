import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

// import { addChannel } from '../../../../actions/servers'

// eslint-disable-next-line
import { FaHashtag } from 'react-icons/fa'
// eslint-disable-next-line
import { ImVolumeMedium } from 'react-icons/im'

import './NewChannel.css'

const NewChannel = (props) => {
    // const [channelName, setChannelName] = useState('');
    // const dispatch = useDispatch();

    // const { sId } = useParams();
    
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(addChannel(sId, props.categoryId, channelName));
    //     setChannelName('');
    //     props.close([false, '']);
    // }

    // const handleKeyPress = (e) => {
    //     if (e.key === "Escape") props.close(false)
    //     if (e.key === "Enter") document.getElementById('submit-new-channel').click();
    // }

    // useEffect(() => {
    //     document.addEventListener('keydown', handleKeyPress, false);
    //     return () => document.removeEventListener('keydown', handleKeyPress, false);
    // }, [])

    // return (
    //     <form className="modal-underbody" onSubmit={handleSubmit}>
    //         <div className="modal-container background-primary">
    //             <div className="modal-form">
    //                 <div className="modal-form-header">
    //                     <span className="modal-header-title">Create text channel</span>
    //                     <small className="modal-header-desc">in {props.categoryId}</small>
    //                 </div>
    //                 <div className="modal-select-container">
    //                     <span className="modal-select-header">CHANNEL TYPE</span>
    //                     <div className="modal-type-container">
    //                         <div className="modal-select-type modal-selected-type">
    //                             <div className="select-check-wrapper"><div className="select-check"/></div>
    //                             <FaHashtag className="select-type-icon" />
    //                             <div className="select-type-info">
    //                                 <span className="select-type-name">Text Channel</span>
    //                                 <small className="select-type-desc">Post images, GIFs, opinions and puns</small>
    //                             </div>
    //                         </div>
    //                         <div className="modal-select-type modal-select-hover">
    //                             <div className="unselect-check-wrapper"><div className="unselect-check"/></div>
    //                             <ImVolumeMedium className="select-type-icon" />
    //                             <div className="select-type-info">
    //                                 <span className="select-type-name">Voice Channel</span>
    //                                 <small className="select-type-desc">Hang out with voice, video and screen sharing</small>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="modal-form-input-container">
    //                     <span className="modal-form-input-header">CHANNEL NAME</span>
    //                     <input type="text" className="modal-form-input" value={channelName} onChange={(e) => {setChannelName(e.target.value)}} placeholder="new-channel"/>
    //                 </div>
    //             </div>
    //             <div className="options-container background-secondary">
    //                 <button onClick={() => props.close([false, ''])} className="cancel-button">Cancel</button>
    //                 <button type="submit" id="submit-new-channel" className="submit-button">Create channel</button>
    //             </div>
    //         </div>
    //     </form>
    // )

    return null
}

export default NewChannel
