import axios from 'axios';

const URI = process.env.PROD ? 'https://skid.today' : 'http://localhost:5001';

export const getAllMessages = (serverId, channelId) => serverId && channelId ? axios.get(URI + `/api/v1/message/getAllMessages?serverId=${serverId}&channelId=${channelId}`, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : null;