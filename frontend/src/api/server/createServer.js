import axios from 'axios';

const URI = process.env.NODE_ENV === 'production' ? 'https://skid.today' : 'http://localhost:5001';

export const createServer = (serverName) => serverName ? axios.post(URI + `/api/v1/server/createServer`, { serverName }, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : null;