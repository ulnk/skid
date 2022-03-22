import axios from 'axios';

let URI = 'https://skid.rocks'
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    URI = 'http://localhost:5000';
};

export const login = (userLoginData) => axios.post(URI + '/api/login', userLoginData)

export const register = (userRegisterData) => axios.post(URI + '/api/register', userRegisterData)

export const changePfp = (data) => axios.post(URI + '/api/app/changePfp', data, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
});

export const getServers = () => axios.get(URI + '/api/app/getservers', {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
});

export const getServer = (sId) => sId ? axios.get(URI + `/api/app/getserver?sid=${sId}`, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
}) : null;

export const deleteServer = (serverId) =>  axios.post(URI + `/api/app/deleteserver`, { serverId }, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
});

export const getChannel = (cId, sId) =>  axios.get(URI + `/api/app/getchannel?sid=${sId}&cid=${cId}`, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
});

export const sendMessage = (channelId, serverId, messageContent) =>  axios.post(URI + `/api/app/addmessage`, { serverId, channelId, messageContent }, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
});

export const pseudoMessage = (channelId, serverId, messageContent) =>  axios.post(URI + `/api/app/pseudomessage`, { serverId, channelId, messageContent }, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
});


export const addServer = (serverName) =>  axios.post(URI + `/api/app/addserver`, { serverName }, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
});

export const addCategory = (categoryName, sId) =>  axios.post(URI + `/api/app/addcategory`, { categoryName, sId }, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
});

export const addChannel = (sId, categoryId, channelName) =>  axios.post(URI + `/api/app/addchannel`, { sId, categoryId, channelName }, {
    headers: {
        'x-auth-token': localStorage.getItem("token"),
    }
});