import React, { useState } from 'react';
import { MdMic, MdMicOff } from 'react-icons/md';
import { HiCog } from 'react-icons/hi';
import { useSelector } from 'react-redux';

import UserOptions from '../settings/UserSettings';

const UserInfo = (props) => {
    const [showSettings, setShowSettings] = useState(false);
    const [muted, setMuted] = useState(false);
    const user = useSelector(state => state.user);
    return (
        <>
            <UserOptions close={setShowSettings} class={`${showSettings && 'active'}`} />
            <section className={`user-info background-secondary-alt ${props.className}`}>
                <div className="profile-container">
                    <img className="profile-image" src={user.image || 'https://cdn.skid.rocks/img/1f0bfc0865d324c2587920a7d80c609b.png'} alt="" />    
                    <div className="profile-name-container">
                        <span className="profile-name">{user.username}</span>
                        <small className="profile-tag">{user._id}</small>
                    </div>
                </div>
                <div className="buttons-container">
                    <div className="button-wrapper" onClick={() => setMuted(!muted)}>
                        <span className="button-tool">{!muted ? 'Mute' : 'Unmute'}</span>
                        {!muted ? <MdMic className="button" /> : <MdMicOff className="button" />}
                    </div>
                    <div className="button-wrapper" onClick={() => setShowSettings(true)}>
                        <span className="button-tool">Settings</span>
                        <HiCog className="button" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default UserInfo;
