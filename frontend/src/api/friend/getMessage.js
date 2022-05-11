import axios from 'axios';

const URI = process.env.NODE_ENV === 'production' ? 'https://skid.today' : 'http://localhost:5001';

export const getMessage = (messageId) => messageId ? axios.get(URI + `/api/v1/friend/getMessage?messageId=${messageId}`, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : null;