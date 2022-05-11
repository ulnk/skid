import axios from 'axios';

const URI = process.env.NODE_ENV === 'production' ? 'https://skid.today' : 'http://localhost:5001';

export const getAllMessages = (friendId) => friendId ? axios.get(URI + `/api/v1/friend/getAllMessages?friendId=${friendId}`, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : null;