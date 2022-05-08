import axios from 'axios';

const URI = process.env.NODE_ENV === 'production' ? 'https://skid.today' : 'http://localhost:5001';

export const register =  (username, password, email) => username && password && email ? axios.post(URI + `/api/v1/user/register`, { username, password, email }) : null; 