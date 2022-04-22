import axios from 'axios';

const URI = process.env.PROD ? 'https://skid.today' : 'http://localhost:5001';

export const getAllServers = () => axios.get(URI + `/api/v1/server/getAllServers`, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
});