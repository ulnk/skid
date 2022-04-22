import axios from 'axios';

const URI = process.env.PROD ? 'https://skid.today' : 'http://localhost:5001';

export const getAllMessages = (serverId, categoryId, channelId) => serverId && categoryId && channelId ? axios.get(URI + `/api/v1/message/getMessages?serverd=${serverId}&categoryId=${categoryId}&channelId=${channelId}`, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : null;