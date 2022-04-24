import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose } from 'react-icons/md';

import './UserSettings.css';
import { imageAction, logoutAction } from '../../../actions/user';

const UserSettings = (props) => {
    const [image, setImage] = useState('');
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    useEffect(() => {
        setImage(user.image)
    }, [user]);

    const handleImageChange = (e) => {
        e.preventDefault();
        dispatch(imageAction(image));
    };

    return (
        <>
            <div className={`settings ${props.class}`}>
                <div className="close" onClick={() => props.close(false)}>
                    <MdClose size="18" />
                </div>
                <section className='tabs'>
                    <ul className='tab-buttons-container'>
                        <div className="tab-section">
                            <span className="font-display section-title">USER SETTINGS</span>
                            <div className="section-items">
                                <button className="section-button text-channel-colour selected" >My Account</button>
                                <button className="section-button text-channel-colour" >User Profile</button>
                                <button className="section-button text-channel-colour" >Privacy & Safety</button>
                                <button className="section-button text-channel-colour" >Authorised Apps</button>
                                <button className="section-button text-channel-colour" >Connections</button>
                            </div>
                        </div>
                        <div className="divider-options" />
                        <form className="tab-section" onSubmit={() => { dispatch(logoutAction()) }}>
                            <button type="submit" className="section-button logout text-channel-colour" >Logout</button>
                        </form>
                    </ul>
                </section>
                <section className='options'>
                    <div className="header-title-option">My Account</div>
                    <form className="option" onSubmit={handleImageChange}>
                        <span className="option-title">Profile Picture URL</span>
                        <input type="url" className="modal-form-input-o" pattern="https://.*" value={image || 'https://cdn.skid.rocks/img/1f0bfc0865d324c2587920a7d80c609b.png'} onChange={(e) => setImage(e.target.value)} placeholder="" />
                        <button type='submit' className='submit-button-save'>Save</button>
                    </form>
                </section>
            </div>
        </>
    );
};

export default UserSettings;
