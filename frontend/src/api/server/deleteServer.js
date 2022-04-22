import axios from 'axios';

const URI = process.env.PROD ? 'https://skid.today' : 'http://localhost:5001';

export const deleteServer = (serverId) => serverId ? axios.post(URI + `/api/v1/server/deleteServer`, { serverId }, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : null;