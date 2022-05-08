import axios from 'axios';

const URI = process.env.NODE_ENV === 'production' ? 'https://skid.today' : 'http://localhost:5001';

export const disableAccount =  () => axios.post(URI + `/api/v1/user/disableAccount`, {}, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
});