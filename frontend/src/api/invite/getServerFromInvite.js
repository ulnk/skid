import axios from 'axios';

const URI = process.env.NODE_ENV === 'production' ? 'https://skid.today' : 'http://localhost:5001';

export const getServerFromInvite = (inviteCode) => inviteCode ? axios.get(URI + `/api/v1/invite/getServerFromInvite?inviteCode=${inviteCode}`, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : null;