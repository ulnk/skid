import axios from 'axios';

const URI = process.env.NODE_ENV === 'production' ? 'https://skid.today' : 'http://localhost:5001';

export const login =  (username, password) => username && password ? axios.post(URI + `/api/v1/user/login`, { username, password }) : null; 