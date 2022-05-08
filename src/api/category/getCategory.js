import axios from 'axios';

const URI = process.env.NODE_ENV === 'production' ? 'https://skid.today' : 'http://localhost:5001';

export const getCategory = (categoryId) => categoryId ? axios.get(URI + `/api/v1/category/getCategory?categoryId=${categoryId}`, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : null;