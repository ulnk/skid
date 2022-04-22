import axios from 'axios';

const URI = process.env.PROD ? 'https://skid.today' : 'http://localhost:5001';

export const image = (imageLink) => imageLink ? axios.post(URI + `/api/v1/user/image`, { imageLink }, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : null;