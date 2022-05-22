import React, { useEffect, useState } from 'react';

import './Embed.css';

import { getYoutubeData } from '../../../api/youtubeData';

const Embed = (props) => {
    const [data, setData] = useState({});
    
    useEffect(() => {
        (async () => {
            const { data } = await getYoutubeData(props.ytid);
            setData(data);
        })()
    }, [props.ytid]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <>
            <div className="embed-body">
                <div className="side-color" style={{ 'backgroundColor': props.color }} />
                <div className="embed-flex">
                    <span className="embed-author">{props.author}</span>
                    <span className="embed-title">{data.channelTitle}</span>
                    <span onClick={() => window.location = `https://www.youtube.com/watch?v=${props.ytid}`} className="embed-link-title">{data.title}</span>
                    <iframe className='embed-video' src={`https://www.youtube.com/embed/${props.ytid}`} title={props.ytid} frameborder="0" allow="fullscreen" />
                </div>

            </div>
        </>
    );
}

export default Embed;