import { getAllMessages } from "../api/message/getAllMessages";
import { getMessage } from "../api/message/getMessage";
import { createMessage } from "../api/message/createMessage";
import { deleteMessage } from "../api/message/deleteMessage";

export const getAllMessagesAction = (serverId, channelId) => async (dispatch) =>  {
    try {
        const { data } = await getAllMessages(serverId, channelId);
        dispatch({ type: 'GET_ALL_MESSAGES', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const getMessageAction = (messageId) => async (dispatch) =>  {
    try {
        const { data } = await getMessage(messageId);
        dispatch({ type: 'GET_MESSAGE', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const addMessageToAll = (message) => async (dispatch) =>  {
    try {
        dispatch({ type: 'ADD_MESSAGE_TO_ALL', payload: message });
    } catch(e) {
        console.log(e)
    }
}

export const createMessageAction = (content, serverId, categoryId, channelId, small) => async (dispatch) =>  {
    try {
        await createMessage(content, serverId, categoryId, channelId, small);
        // dispatch({ type: 'CREATE_MESSAGE', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const deleteMessageAction = (messageId) => async (dispatch) =>  {
    try {
        const { data } = await deleteMessage(messageId);
        dispatch({ type: 'DELETE_MESSAGE', payload: data });
    } catch(e) {
        console.log(e)
    }
}
