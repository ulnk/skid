import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose } from 'react-icons/md';

import DeleteAccount from './DeleteAccount';
import DisableAccount from './DisableAccount';
import ChangePassword from './ChangePassword';
import Logout from './Logout';

import './UserSettings.css';
import '../../css/myaccount.css';

import { imageAction } from '../../../actions/user';

const UserSettings = (props) => {
    const [image, setImage] = useState('');
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    const [showDisableAccount, setShowDisableAccount] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    useEffect(() => {
        setImage(user.image);
    }, [user]);

    const handleImageChange = (e) => {
        e.preventDefault();
        dispatch(imageAction(image));
    };

    return (
        <>
            <Logout show={showLogout} close={setShowLogout} />
            <DeleteAccount show={showDeleteAccount} close={setShowDeleteAccount} />
            <DisableAccount show={showDisableAccount} close={setShowDisableAccount} />
            <ChangePassword show={showChangePassword} close={setShowChangePassword} />
            <div className={`settings ${props.class}`}> 
                <section className='tabs'>
                    <ul className='tab-buttons-container'>
                        <div className="tab-section">
                            <span className="font-display section-title">USER SETTINGS</span>
                            <div className="section-items">
                                <button className="section-button text-channel-colour selected">My Account</button>
                                <button className="section-button text-channel-colour">User Profile</button>
                                <button className="section-button text-channel-colour">Privacy & Safety</button>
                                <button className="section-button text-channel-colour">Authorised Apps</button>
                                <button className="section-button text-channel-colour">Connections</button>
                            </div>
                        </div>
                        <div className="tabs-divider" />
                        <div className="tab-section">
                            <button type="button" onClick={() => setShowLogout(true)}  className="section-button logout text-channel-colour" >Logout</button>
                        </div>
                    </ul>
                </section>
                <section className='options'>
                    <div className="options-inner">
                        <div className="header-title-option">My Account</div>
                        <form className="option" onSubmit={handleImageChange}>
                            <div className="my-account-container">
                                <div className="my-account-banner"></div>
                                <div className="my-account-info">
                                    <img className="my-account-image" src={user.image || ''} alt='user' />
                                    <div className="myaccount-user-tag">
                                        <span className="user-tag-name">{user.username}</span>
                                        <span className="user-tag-id">#{user._id}</span>
                                    </div>
                                </div>
                                <div className="my-account-fields">
                                    <ul className="account-field-container">
                                        <li className="account-field">
                                            <div className="account-field-values">
                                                <span className="account-field-header">USERNAME</span>
                                                <span className="account-field-value">{user.username}<span className="account-field-value-alt">#{user._id}</span></span>
                                            </div>
                                            <button type='button' className="account-field-button">
                                                Edit
                                            </button>
                                        </li>
                                        <li className="account-field">
                                            <div className="account-field-values">
                                                <span className="account-field-header">EMAIL</span>
                                                <span className="account-field-value">************@{user.email?.split('@')[1]}</span>
                                            </div>
                                            <button type='button' className="account-field-button">
                                                Edit
                                            </button>
                                        </li>
                                        <li className="account-field">
                                            <div className="account-field-values">
                                                <span className="account-field-header">PHONE NUMBER</span>
                                                <span className="account-field-value">********1337</span>
                                            </div>
                                            <button type='button' className="account-field-button">
                                                Edit
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                        <div className="options-divider"></div>
                        <div className="option" >
                            <div className="password-box">
                                <div className="header-title-option">Password and Authentication</div>
                                <button type='submit' onClick={(e) => {
                                    e.preventDefault();
                                    setShowChangePassword(true);
                                }} className='normal-button'>Change Password</button>
                            </div>
                            <div className="option-description">
                                <div className="option-description-header">TWO-FACTOR AUTHENTICATION</div>
                                <div className="option-description-body">Protect your Discord account with an extra layer of security. Once configured, you'll be required to enter both your password and an authentication code from your mobile phone in order to sign in.</div>
                            </div>
                            <button type='submit' className='normal-button no-hover'>Enable Two-Factor Auth</button>
                        </div>
                        <div className="options-divider"></div>
                        <div className="option" >
                            <div className="option-description">
                                <div className="option-description-header">ACCOUNT REMOVAL</div>
                                <div className="option-description-body">Disabling your account means you can recover it at any time after taking this action.</div>
                            </div>
                            <div className="row">
                                <button type='button' onClick={(e) => {
                                    e.preventDefault();
                                    setShowDisableAccount(true);
                                }} className='normal-button red'>Disable Account</button>
                                <button type='button' onClick={(e) => {
                                    e.preventDefault();
                                    setShowDeleteAccount(true);
                                }} className='normal-button red-hollow'>Delete Account</button>
                            </div>
                        </div>
                        {/* <div className="options-divider"></div>
                        <div className="header-title-option">Profile Picture URL</div>
                        <form className="option" onSubmit={handleImageChange}>
                            <input type="url" className="modal-form-input-o" pattern="https://.*" value={image || 'https://cdn.skid.today/img/1f0bfc0865d324c2587920a7d80c609b.png'} onChange={(e) => setImage(e.target.value)} placeholder="" />
                            <button type='submit' className='submit-button-save'>Save</button>
                            </form>  */}
                    </div>
                    <div className="close" onClick={() => props.close(false)}>
                        <MdClose size="18" />
                    </div>
                </section>
                <div className="extend"></div>
            </div>
        </>
    );
};

export default UserSettings;
