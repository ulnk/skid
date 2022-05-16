import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { checkReminder } from '../../../actions/other';

import './Reminder.css';
import { ReactComponent as Close } from '../../../assets/close.svg';

const Reminder = () => {
    const [showReminder, setShowReminder] = useState(JSON.parse(localStorage.getItem('reminder')));
    const dispatch = useDispatch();

    const hideReminder = () => {
        setShowReminder(false);
        localStorage.setItem('reminder', JSON.stringify(false));
        dispatch(checkReminder(false));
    };

    useEffect(() => {
        if (localStorage.getItem('reminder') === null) {
            localStorage.setItem('reminder', true);
            dispatch(checkReminder(true));
        }
    }, [dispatch]);

    return (
        <>
            {showReminder && <div className="reminder">
                <div className="reminder-title">
                    Have you heard of notds? Check out their amazing mutitool! 
                    <a href="https://github.com/jugoslovenska/notds" className="reminder-button">click here!</a>
                </div>
                <Close className='reminder-close' onClick={() => hideReminder()}/>
            </div>}
        </>
    );
};

export default Reminder;
