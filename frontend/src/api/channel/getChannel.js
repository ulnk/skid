import axios from 'axios';

const URI = process.env.PROD ? 'https://skid.today' : 'http://localhost:5001';

export const getChannel = (channelId) => channelId ? axios.get(URI + `/api/v1/channel/getChannel?channelId=${channelId}`, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : null;