import axios from 'axios';

const URI = process.env.NODE_ENV === 'production' ? 'https://skid.today' : 'http://localhost:5001';

export const deleteMessage = (messageId) => messageId ? axios.post(URI + `/api/v1/friend/deleteMessage`, { messageId }, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : null; 