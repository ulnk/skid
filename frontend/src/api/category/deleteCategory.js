import axios from 'axios';

const URI = process.env.PROD ? 'https://skid.today' : 'http://localhost:5001';

export const deleteCategory =  (categoryId) => categoryId ? axios.post(URI + `/api/v1/category/deleteCategory`, { categoryId }, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : null; 