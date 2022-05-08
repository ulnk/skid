import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { createChannelAction } from '../../../../actions/channel'

import { FaHashtag } from 'react-icons/fa'
import { ImVolumeMedium } from 'react-icons/im'

import './NewChannel.css'

const NewChannel = (props) => {
    const [channelName, setChannelName] = useState('');
    const dispatch = useDispatch();

    const { serverId } = useParams();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!props.show) return;
        dispatch(createChannelAction(serverId, props.categoryId, channelName));
        setChannelName('');
        props.setCategoryId('');
        props.close(false);
    }

    const handleKeyPress = useCallback( (e) => {
        if (e.key === "Escape") props.close(false)
        if (e.key === "Enter") document.getElementById('submit-new-channel').click();
    }, [props]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress, false);
        return () => document.removeEventListener('keydown', handleKeyPress, false);
    }, [handleKeyPress])

    return (
        <form className={`modal-underbody ${props.show && 'show'}`} onSubmit={handleSubmit}>
            <div className={`modal-container-app background-primary ${props.show && 'show'}`}>
                <div className="modal-form">
                    <div className="modal-form-header">
                        <span className="modal-header-title">Create text channel</span>
                        <small className="modal-header-desc">in {props.categoryId}</small>
                    </div>
                    <div className="modal-select-container">
                        <span className="modal-select-header">CHANNEL TYPE</span>
                        <div className="modal-type-container">
                            <div className="modal-select-type modal-selected-type">
                                <div className="select-check-wrapper"><div className="select-check"/></div>
                                <FaHashtag className="select-type-icon" />
                                <div className="select-type-info">
                                    <span className="select-type-name">Text Channel</span>
                                    <small className="select-type-desc">Post images, GIFs, opinions and puns</small>
                                </div>
                            </div>
                            <div className="modal-select-type modal-select-hover">
                                <div className="unselect-check-wrapper"><div className="unselect-check"/></div>
                                <ImVolumeMedium className="select-type-icon" />
                                <div className="select-type-info">
                                    <span className="select-type-name">Voice Channel</span>
                                    <small className="select-type-desc">Hang out with voice, video and screen sharing</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-form-input-container">
                        <span className="modal-form-input-header">CHANNEL NAME</span>
                        <input type="text" className="modal-form-input" value={channelName} onChange={(e) => {setChannelName(e.target.value)}} placeholder="new-channel"/>
                    </div>
                </div>
                <div className="options-container background-secondary">
                    <button type="button" onClick={() => {props.setCategoryId('');props.close(false)}} className="cancel-button">Cancel</button>
                    <button type="submit" id="submit-new-channel" className="submit-button">Create channel</button>
                </div>
            </div>
        </form>
    );
}

export default NewChannel
