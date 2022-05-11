import axios from 'axios';

const URI = process.env.NODE_ENV === 'production' ? 'https://skid.today' : 'http://localhost:5001';

export const createMessage = (content, friendId, small) => content && friendId ? axios.post(URI + `/api/v1/friend/createMessage`, { content, friendId, small }, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : 'awd'; 