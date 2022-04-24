import axios from 'axios';

const URI = process.env.PROD ? 'https://skid.today' : 'http://localhost:5001';

export const createMessage = (content, serverId, categoryId, channelId) => content && serverId && categoryId && channelId ? axios.post(URI + `/api/v1/message/createMessage`, { content, serverId, categoryId, channelId }, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : 'awd'; 