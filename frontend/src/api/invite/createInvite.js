import axios from 'axios';

const URI = process.env.PROD ? 'https://skid.today' : 'http://localhost:5001';

export const createInvite = (serverId, inviteCode) => serverId ? axios.post(URI + `/api/v1/invite/createInvite`, { serverId, inviteCode }, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : null;