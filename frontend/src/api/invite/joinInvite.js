import axios from 'axios';

const URI = process.env.PROD ? 'https://skid.today' : 'http://localhost:5001';

export const joinInvite = (inviteCode) => inviteCode ? axios.post(URI + `/api/v1/invite/joinInvite`, { inviteCode },{
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : null;