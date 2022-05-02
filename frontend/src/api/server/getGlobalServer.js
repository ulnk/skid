import axios from 'axios';

const URI = process.env.NODE_ENV === 'production' ? 'https://skid.today' : 'http://localhost:5001';

export const getGlobalServer = () => axios.get(URI + `/api/v1/server/getGlobalServer`, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
});