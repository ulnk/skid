import React from 'react'
import { Link } from 'react-router-dom'

import './HomeNavbar.css'

const HomeNavbar = () => {
    return (
        <div className="home-navbar">
            <div className="left-items">
                <h1 className="left-title"><span className="title-color-change">skid</span> <span className='smol'>v1.3.0</span></h1>
                <a href="https://github.com/ulnk/skid" className="left-item">Features</a>
                <a href="https://github.com/ulnk/skid" className="left-item">GitHub</a>
                <a href="https://github.com/ulnk/skid" className="left-item">About</a>
            </div>
            <div className="right-items">
                <Link to="/login"><button className="login-button">Login</button></Link>
            </div>
        </div>
    )
}

export default HomeNavbar