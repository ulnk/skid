import { getAllServers } from '../api/server/getAllServers';
import { getServer } from '../api/server/getServer';
import { createServer } from '../api/server/createServer';
import { deleteServer } from '../api/server/deleteServer';
import { leaveServer } from '../api/server/leaveServer';

export const getAllServersAction = () => async (dispatch) =>  {
    try {
        const { data } = await getAllServers();
        dispatch({ type: 'GET_ALL_SERVERS', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const getServerAction = (serverId) => async (dispatch) =>  {
    try {
        const { data } = await getServer(serverId);
        dispatch({ type: 'GET_SERVER', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const createServerAction = (serverName) => async (dispatch) =>  {
    try {
        const { data } = await createServer(serverName);
        dispatch({ type: 'CREATE_SERVER', payload: data });
    } catch(e) {
        console.log(e)
    }
}


export const deleteServerAction = (serverId) => async (dispatch) =>  {
    try {
        const { data } = await deleteServer(serverId);
        dispatch({ type: 'DELETE_SERVER', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const leaveServerAction = (serverId) => async (dispatch) =>  {
    try {
        const { data } = await leaveServer(serverId);
        dispatch({ type: 'LEAVE_SERVER', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const hideServerAction = (serverId) => async (dispatch) =>  {
    try {
        dispatch({ type: 'HIDE_SERVER', payload: serverId });
    } catch(e) {
        console.log(e)
    }
}