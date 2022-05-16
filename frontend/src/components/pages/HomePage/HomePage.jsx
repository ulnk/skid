import React, { useEffect, useState } from 'react';

import '../../homepage/homepage.css';
import '../../skidapp/skidapp.css';

import { FaGithub } from 'react-icons/fa';

import HomeNavbar from '../../homepage/navbar/HomeNavbar';

const HomePage = () => {
    let messages = [
        'Blasting NBA Youngboy on OBlock, been in the game since \'02',
        'P2P Encryption',
        '14.2 Million Bots Connected',
        'Pushin\' P',
        'Central Cee > OBlock',
        'OBlock smoking on Tooka',
        'Built using BQN',
        'You wouldn\'t steal a car',
        'Gunna & Future - pushin P (feat. Young Thug) [Official Video]',
        'I can rhyme Orange and Banana. Bornana',
        'Miria Botnet < Brixton Botnet',
        'NOTDS Multitool',
        'Killer Whales at SeaWorld™️',
        'Osaka > Horion',
        'skid  oxygen when?',
        'Jesus died for chocolate eggs',
        'Visual Basic Botnet',
        'decrypt0r.cs',
        'Cookie Clicker?',
        'When it rains, it pours',
        'Mike Amiri, Mike Amiri',
        'Trap House Mob',
        'Horion Wallet Miner',
        'One Bot Botnet™️',
        'horion.site',
        'Dill Pickel',
        'Snipping Tool is BIOS',
        'Talyer Pinger',
        'Project Hell Booter Panel',
        'Tupac Boota',
        'Python has bad GUI\'s'
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
                        <span onClick={() => {
                            window.location = "https://github.com/ulnk/skid"
                        }}><button className="home-github-main"><FaGithub className='github-icon' />Check out our GitHub!</button></span>
                        <span onClick={() => {
                            window.location = "/skid/@me"
                        }}><button className="home-login-main">Open Skid in your browser</button></span>
                        {<span onClick={() => {
                            // window.location = "https://cdn.skid.today/WordleGame.exe"
                        }}><button onClick={regenQuotes} className="home-red-main">{count}</button></span>}
                        {/* {count > 50 && <button onClick={regenQuotes} className="home-regen-main">Regenerate Quotes!</button>} */}
                    </div>
                </div>
            </div>
            <div className="home-bottom">
                {/* {count<200 &&<button onClick={() => setCount(200)} className="home-regen-bottom"></button>} */}
            </div>
        </>
    );
};

export default HomePage;
