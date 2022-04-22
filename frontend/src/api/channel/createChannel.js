import axios from 'axios';

const URI = process.env.PROD ? 'https://skid.today' : 'http://localhost:5001';

export const createChannel =  (serverId, categoryId, channelName) => serverId && categoryId && channelName ? axios.post(URI + `/api/v1/channel/createChannel`, { serverId, categoryId, channelName }, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : null; 