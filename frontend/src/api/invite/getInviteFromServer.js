import axios from 'axios';

const URI = process.env.PROD ? 'https://skid.today' : 'http://localhost:5001';

export const getInviteFromServer = (serverId) => serverId ? axios.get(URI + `/api/v1/invite/getInviteFromServer?serverId=${serverId}`, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : null;