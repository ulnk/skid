import axios from 'axios';

const URI = process.env.NODE_ENV === 'production' ? 'https://skid.today' : 'http://localhost:5001';

export const getYoutubeData = (id) => id && axios.post(URI + `/api/v1/youtube/getYoutubeData`, { id }, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
});