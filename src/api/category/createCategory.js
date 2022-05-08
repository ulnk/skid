import axios from 'axios';

const URI = process.env.NODE_ENV === 'production' ? 'https://skid.today' : 'http://localhost:5001';

export const createCategory = (serverId, categoryName) => serverId && categoryName ? axios.post(URI + `/api/v1/category/createCategory`, { serverId, categoryName }, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : null; 