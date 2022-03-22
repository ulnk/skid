import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { addCategory } from '../../../../actions/servers'

import './NewCategory.css'

const NewCategory = (props) => {
    const [categoryName, setCategoryName] = useState('')
    const dispatch = useDispatch()

    const { sId } = useParams();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addCategory(categoryName, sId))
        setCategoryName('')
        props.close(false)
    }

    return (
        <form className="modal-underbody" onSubmit={handleSubmit}>
            <div className="modal-container background-primary">
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
                    <button onClick={() => props.close(false)} className="cancel-button">Cancel</button>
                    <button type="submit" className="submit-button">Create category</button>
                </div>
            </div>
        </form>
    )
}

export default NewCategory
