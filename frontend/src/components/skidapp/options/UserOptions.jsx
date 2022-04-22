import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../../../actions/login';
import { MdClose } from 'react-icons/md';

import './UserOptions.css';
import { useState } from 'react';
// import { changePfp } from '../../../actions/login';
import { useLayoutEffect } from 'react';

const UserOptions = (props) => {
    // const dispatch = useDispatch();
    // const [pfpUrl, setPfpUrl] = useState('');
    // const user = useSelector(state => state.user);

    // useLayoutEffect(() => {
    //     setPfpUrl(user.image)
    // }, [user]);

    // const handlePfpChange = (e) => {
    //     e.preventDefault();
    //     dispatch(changePfp({ url: pfpUrl, jwt: user.token }));
    // }

    // return (
    //     <>
    //         <div className={`settings ${props.class}`}>
    //             <div className="close" onClick={() => props.close(false)}>
    //                 <MdClose size="18" />
    //             </div>
    //             <section className='tabs'>
    //                 <ul className='tab-buttons-container'>
    //                     <div className="tab-section">
    //                         <span className="font-display section-title">USER SETTINGS</span>
    //                         <div className="section-items">
    //                             <button className="section-button text-channel-colour selected" >My Account</button>
    //                             {/* <button className="section-button text-channel-colour" >User Profile</button>
    //                             <button className="section-button text-channel-colour" >Privacy & Safety</button>
    //                             <button className="section-button text-channel-colour" >Authorised Apps</button>
    //                             <button className="section-button text-channel-colour" >Connections</button> */}
    //                         </div>
    //                     </div>
    //                     <div className="divider-options" />
    //                     <form className="tab-section" onSubmit={() => { dispatch(logout()) }}>
    //                         <button type="submit" className="section-button logout text-channel-colour" >Logout</button>
    //                     </form>
    //                 </ul>
    //             </section>
    //             <section className='options'>
    //                 <div className="header-title-option">My Account</div>
    //                 <form className="option" onSubmit={handlePfpChange}>
    //                     <span className="option-title">Profile Picture URL</span>
    //                     <input type="url" className="modal-form-input-o" pattern="https://.*" value={pfpUrl || 'https://cdn.skid.rocks/img/1f0bfc0865d324c2587920a7d80c609b.png'} onChange={(e) => setPfpUrl(e.target.value)} placeholder="" />
    //                     <button type='submit' className='submit-button-save'>Save</button>
    //                 </form>
    //             </section>
    //         </div>
    //     </>
    // );
    return null;
};

export default UserOptions;
