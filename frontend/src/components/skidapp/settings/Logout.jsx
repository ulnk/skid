import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { logoutAction } from '../../../actions/user'

const Logout = (props) => {
    const dispatch = useDispatch();
    const errors = useSelector(state => state.errors)

    const handleKeyPress = useCallback( (e) => {
        if (e.key === "Escape") props.close(false)
        if (e.key === "Enter") document.getElementById('submit-logout').click();
    }, [props]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress, false);
        return () => document.removeEventListener('keydown', handleKeyPress, false);
    }, [handleKeyPress])

    return (
        <div className={`modal-underbody ${props.show && 'show'}`} >
            <div className={`modal-container-app background-primary ${props.show && 'show'}`}>
                <div className="modal-form">
                    <div className="modal-form-header-app small-header">
                        <span className="modal-header-title-app">Log Out</span>
                        <span className={`modal-header-desc-app smaller-text ${errors.logout && 'error-modal-app'}`}>Are you sure you want to log out?  {errors.logout && `- ${errors.logout}` }</span>
                    </div>
                </div>
                <div className="options-container small-header background-secondary">
                    <button type="button" className="cancel-button" onClick={() => props.close(false)}>Cancel</button>
                    <button type="button" onClick={() => {
                        if (!props.show) return;
                        dispatch(logoutAction());
                    }} id="submit-logout" className="submit-button err">Log Out</button>
                </div>
            </div>
        </div>
    );
}

export default Logout