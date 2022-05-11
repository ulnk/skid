import axios from 'axios';

const URI = process.env.NODE_ENV === 'production' ? 'https://skid.today' : 'http://localhost:5001';

export const getAllFriends = () => axios.get(URI + `/api/v1/user/getAllFriends`, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
});