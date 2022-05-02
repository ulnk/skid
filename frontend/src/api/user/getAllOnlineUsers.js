import axios from 'axios';

const URI = process.env.NODE_ENV === 'production' ? 'https://skid.today' : 'http://localhost:5001';

export const getAllOnlineUsers = (serverId) => axios.get(URI + `/api/v1/user/getAllOnlineUsers?serverId=${serverId}`, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
});