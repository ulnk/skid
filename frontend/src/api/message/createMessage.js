import axios from 'axios';

const URI = process.env.NODE_ENV === 'production' ? 'https://skid.today' : 'http://localhost:5001';

export const createMessage = (content, serverId, categoryId, channelId, small) => content && serverId && categoryId && channelId ? axios.post(URI + `/api/v1/message/createMessage`, { content, serverId, categoryId, channelId, small }, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : 'awd'; 