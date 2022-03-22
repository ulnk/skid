import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { MdClose } from 'react-icons/md';

import { useDispatch } from 'react-redux';
import { checkReminder } from '../../../actions/servers';

import './Reminder.css';

const Reminder = () => {
    const [show, setShow] = useState(JSON.parse(localStorage.getItem('showReminder')));
    const dispatch = useDispatch();

    const setFalse = () => {
        setShow(false);
        localStorage.setItem('showReminder', false);
        dispatch(checkReminder(false))
    }

    useEffect(() => {
        if (localStorage.getItem('showReminder') === null) {
            localStorage.setItem('showReminder', true);
        }
    }, [])

    return (
        <>
            {show && <div className="reminder">
                <div className="reminder-title">
                    Have you heard of shire sounds? Check out their amazing radio station! 
                    <a href="https://shiresoundsradio.co.uk/" className="reminder-button">click here!</a>
                </div>
                <MdClose className='reminder-close' onClick={() => setFalse()}/>
            </div>}
        </>
    );
};

export default Reminder;
