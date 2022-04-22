import axios from 'axios';

const URI = process.env.PROD ? 'https://skid.today' : 'http://localhost:5001';

export const deleteChannel =  (channelId) => channelId ? axios.post(URI + `/api/v1/channel/deleteChannel`, { channelId }, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : null; 