import axios from 'axios';

const URI = process.env.PROD ? 'https://skid.today' : 'http://localhost:5001';

export const getAllChannels = (serverId, categoryId) => serverId && categoryId ? axios.get(URI + `/api/v1/channel/getAllChannels?serverId=${serverId}&categoryId=${categoryId}`, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : null;