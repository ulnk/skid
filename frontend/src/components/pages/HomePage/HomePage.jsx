import React from 'react'

import { Link } from 'react-router-dom'

import '../../homepage/homepage.css'
import '../../skidapp/skidapp.css'

// Componenets
import HomeNavbar from '../../homepage/navbar/HomeNavbar'


const HomePage = () => {
    let messages = [
        'Blasting NBA Youngboy on OBlock, been in the game since \'02.',
        'P2P Encryption.',
        '14.2 Million Bots Connected.',
        'Pushin\' P.',
        'Central Cee > OBlock.',
        'OBlock smoking on Tooka.',
        'Build using BQN.',
        'You wouldn\'t steel a car.',
        'Gunna & Future - pushin P (feat. Young Thug) [Official Video]',
        'I can rhyme Orange and Banana. Bornana.',
        'Miria Botnet < Brixton Botnet.',
        'NOTDS Multitool.'
    ]

    const r1 = Math.floor(Math.random() * messages.length)
    const r2 = Math.floor(Math.random() * messages.length)

    const t1 = messages[r1]
    messages = messages.filter((item) => {
        return item !== t1
    })
    
    const t2 = messages[r2]
    messages = messages.filter((item) => {
        return item !== t2
    })

    return (
        <div className="home-body">
            <HomeNavbar />
            <div className="home-header">
                <h1 className="home-header-title">{t1}</h1>
                <span className="home-header-desc">{t2}</span>
                <div className="home-buttons-container">
                    <a href="https://github.com/ulnkos/skidcordprod"><button className="home-github-main">Check out our GitHub!</button></a>
                    <Link to="/skid/@me"><button className="home-login-main">Open skidrocks in your browser</button></Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage
