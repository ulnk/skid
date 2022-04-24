import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

// import { addCategory } from '../../../../actions/servers'
import { createCategoryAction } from '../../../../actions/category'

import './NewCategory.css'

const NewCategory = (props) => {
    const [categoryName, setCategoryName] = useState('')
    const dispatch = useDispatch()

    const { serverId } = useParams();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createCategoryAction(serverId, categoryName))
        setCategoryName('')
        props.close(false)
    }

    const handleKeyPress = (e) => {
        if (e.key === "Escape") props.close(false)
        if (e.key === "Enter") document.getElementById('submit-new-category').click();
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress, false);
        return () => document.removeEventListener('keydown', handleKeyPress, false);
    }, [])

    return (
        <form className={`modal-underbody ${props.show && 'show'}`} onSubmit={handleSubmit}>
            <div className={`modal-container-app background-primary ${props.show && 'show'}`}>
                <div className="modal-form">
                    <div className="modal-form-header">
                        <span className="modal-header-title">Create category</span>
                    </div>
                    <div className="modal-form-input-container">
                        <span className="modal-form-input-header">CATEGORY NAME</span>
                        <input type="text" className="modal-form-input" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="New category"/>
                    </div>
                </div>
                <div className="options-container background-secondary">
                    <button type="button" onClick={() => props.close(false)} className="cancel-button">Cancel</button>
                    <button type="submit" id="submit-new-category" className="submit-button">Create category</button>
                </div>
            </div>
        </form>
    );
}

export default NewCategory
