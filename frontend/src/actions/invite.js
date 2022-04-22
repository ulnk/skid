import { getInviteFromServer } from '../api/invite/getInviteFromServer';
import { getServerFromInvite } from '../api/invite/getServerFromInvite';
import { createInvite } from '../api/invite/createInvite';
import { joinInvite } from '../api/invite/joinInvite';

export const getInviteFromServerAction = (serverId) => async (dispatch) =>  {
    try {
        const { data } = await getInviteFromServer(serverId);
        dispatch({ type: 'GET_INVITE', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const getServerFromInviteAction = (inviteCode) => async (dispatch) =>  {
    try {
        const { data } = await getServerFromInvite(inviteCode);
        dispatch({ type: 'GET_SERVER_FROM_INVITE', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const createInviteAction = (serverId, inviteCode) => async (dispatch) =>  {
    try {
        const { data } = await createInvite(serverId, inviteCode);
        dispatch({ type: 'CREATE_INVITE', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const joinInviteAction = (inviteCode) => async (dispatch) =>  {
    try {
        const { data } = await joinInvite(inviteCode);
        dispatch({ type: 'JOIN_INVITE', payload: data });
    } catch(e) {
        console.log(e)
    }
}