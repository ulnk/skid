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
        'Built using BQN.',
        'You wouldn\'t steal a car.',
        'Gunna & Future - pushin P (feat. Young Thug) [Official Video]',
        'I can rhyme Orange and Banana. Bornana.',
        'Miria Botnet < Brixton Botnet.',
        'NOTDS Multitool.',
        'Killer Whales at SeaWorld™️',
        'Osaka > Brush & Cyan > Horion.',
        'skid  oxygen when?',
        'Jesus died for chocolate eggs.',
        'Visual Basic Botnet.',
        'decrypt0r.cs',
    ]

    let used = [];

    const selectQuote = () => {
        const index = Math.floor(Math.random() * messages.length);
        let selectedMsg = messages[index];
        if (used.includes(messages[index])) return selectQuote();
        used.push(messages[index]);
        return selectedMsg;
    }

    return (
        <div className="home-body">
            <HomeNavbar />
            <div className="home-header">
                <h1 className="home-header-title">{selectQuote()}</h1>
                <span className="home-header-desc">{selectQuote()}</span>
                <div className="home-buttons-container">
                    <a href="https://github.com/ulnk/skid"><button className="home-github-main">Check out our GitHub!</button></a>
                    <Link to="/skid/@me"><button className="home-login-main">Open Skid in your browser</button></Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage
