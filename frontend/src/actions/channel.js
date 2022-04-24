import { getAllChannels } from '../api/channel/getAllChannels';
import { getChannel } from '../api/channel/getChannel';
import { createChannel } from '../api/channel/createChannel';
import { deleteChannel } from '../api/channel/deleteChannel';

export const getAllChannelsAction = (serverId) => async (dispatch) =>  {
    try {
        if (!serverId) return
        const { data } = await getAllChannels(serverId);
        dispatch({ type: 'GET_ALL_CHANNELS', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const getChannelAction = (channelId) => async (dispatch) =>  {
    try {
        const { data } = await getChannel(channelId);
        dispatch({ type: 'GET_CHANNEL', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const createChannelAction = (serverId, categoryId, channelName) => async (dispatch) =>  {
    try {
        const { data } = await createChannel(serverId, categoryId, channelName);
        dispatch({ type: 'CREATE_CHANNEL', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const deleteChannelAction = (channelId) => async (dispatch) =>  {
    try {
        const { data } = await deleteChannel(channelId);
        dispatch({ type: 'CREATE_CHANNEL', payload: data });
    } catch(e) {
        console.log(e)
    }
}