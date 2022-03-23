import * as api from '../api/index';

export const getServers = () => async (dispatch) =>  {
    try {
        const { data } = await api.getServers();
        dispatch({ type: 'GET_ALL_SERVERS', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const getServer = (sId) => async (dispatch) =>  {
    if (!sId) return
    try {
        const { data } = await api.getServer(sId);
        if (!data) return;
        dispatch({ type: 'GET_CURRENT_SERVER', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const removeServer = (sId) => async (dispatch) =>  {
    if (!sId) return
    try {
        dispatch({ type: 'REMOVE_SERVER', payload: sId });
    } catch(e) {
        console.log(e)
    }
}

export const checkReminder = (setter) => async (dispatch) =>  {
    try {
        dispatch({ type: 'REMINDER', payload: setter ? setter : JSON.parse(localStorage.getItem('showReminder'))});
    } catch(e) {
        console.log(e)
    }
}


export const deleteServer = (sId) => async (dispatch) =>  {
    if (!sId) return
    try {
        const { data } = await api.deleteServer(sId);
        if (!data) return;
        dispatch({ type: 'DELETE_SERVER', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const getChannel = (cId, sId) => async (dispatch) =>  {
    try {
        const { data } = await api.getChannel(cId, sId);
        if (!data) return;
        dispatch({ type: 'GET_CURRENT_CHANNEL', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const getMessage = (message) => async (dispatch) =>  {
    try {
        dispatch({ type: 'GET_MESSAGE', payload: message });
    } catch(e) {
        console.log(e)
    }
}

export const sendMessage = (cId, sId, message) => async (dispatch) =>  {
    try {
        const { data } = await api.sendMessage(cId, sId, message);
        if (!data) return;
        dispatch({ type: 'SEND_MESSAGE', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const addServer = (serverName) => async (dispatch) =>  {
    try {
        const { data } = await api.addServer(serverName);
        if (!data) return;
        dispatch({ type: 'ADD_SERVER', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const addServer2 = async (serverName) => {
    try {
        const { data } = await api.addServer(serverName);
        if (!data) return;
        return data
    } catch(e) {
        console.log(e)
    }
}

export const addCategory = (categoryName, sId) => async (dispatch) =>  {
    try {
        const { data } = await api.addCategory(categoryName, sId);
        if (!data) return;
        dispatch({ type: 'ADD_CATEGORY', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const addChannel = (sId, categoryId, channelName) => async (dispatch) =>  {
    try {
        const { data } = await api.addChannel(sId, categoryId, channelName);
        if (!data) return;
        dispatch({ type: 'ADD_CHANNEL', payload: data });
    } catch(e) {
        console.log(e)
    }
}