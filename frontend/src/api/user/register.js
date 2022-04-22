import axios from 'axios';

const URI = process.env.PROD ? 'https://skid.today' : 'http://localhost:5001';

export const register =  (username, password) => username && password ? axios.post(URI + `/api/v1/user/register`, { username, password }) : null; 