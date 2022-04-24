import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import '../../homepage/homepage.css';
import '../../skidapp/skidapp.css';

import { FaGithub } from 'react-icons/fa';

import HomeNavbar from '../../homepage/navbar/HomeNavbar';

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
        'Cookie Clicker?',
        'When it rains, it pours.',
        'Mike Amiri, Mike Amiri.',
    ];

    let used = [];
    const selectQuote = () => {
        const index = Math.floor(Math.random() * messages.length);
        let selectedMsg = messages[index];
        if (used.includes(messages[index])) return selectQuote();
        used.push(messages[index]);
        return selectedMsg;
    };

    const [quotes, setQuotes] = useState([selectQuote(), selectQuote()]);
    const [count, setCount] = useState(0);

    const regenQuotes = () => {
        setQuotes([selectQuote(), selectQuote()]);
        used = [];
    };

    const handleClick = (e) => {
        setCount(c => c+=1);
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [])

    return (<>
            <div className="home-body">
                <HomeNavbar />
                <div className="home-header">
                    <h1 className="home-header-title">{quotes[0]}</h1>
                    <span className="home-header-desc">{quotes[1]}</span>
                    <div className="home-buttons-container">
                        <a href="https://github.com/ulnk/skid"><button className="home-github-main"><FaGithub className='github-icon' />Check out our GitHub!</button></a>
                        <Link to="/skid/@me"><button className="home-login-main">Open Skid in your browser</button></Link>
                        {count > 200 && <a href="https://horion.download/injector"><button onClick={regenQuotes} className="home-red-main">Download Wordle</button></a>}
                        {/* {count > 50 && <button onClick={regenQuotes} className="home-regen-main">Regenerate Quotes!</button>} */}
                    </div>
                </div>
            </div>
            <div className="home-bottom">
                {count<200 &&<button onClick={() => setCount(200)} className="home-regen-bottom"></button>}
            </div>
        </>
    );
};

export default HomePage;
