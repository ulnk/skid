import axios from 'axios';

const URI = process.env.PROD ? 'https://skid.today' : 'http://localhost:5001';

export const deleteMessage = (messageId) => messageId ? axios.post(URI + `/api/v1/message/deleteMessage`, { messageId }, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : null; 