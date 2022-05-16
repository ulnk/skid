import axios from 'axios';

const URI = process.env.NODE_ENV === 'production' ? 'https://skid.today' : 'http://localhost:5001';

export const createMessage = (content, server, category, channel, small) => content && server && category && channel ? axios.post(URI + `/api/v1/message/createMessage`, { content, server, category, channel, small }, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : 'awd'; 