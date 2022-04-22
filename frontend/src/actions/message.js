import { getAllMessages } from "../api/message/getAllMessages";
import { getMessage } from "../api/message/getMessage";
import { createMessage } from "../api/message/createMessage";
import { deleteMessage } from "../api/message/deleteMessage";

export const getAllMessagesAction = (serverId, categoryId, channelId) => async (dispatch) =>  {
    try {
        const { data } = await getAllMessages(serverId, categoryId, channelId);
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

export const createMessageAction = (content, serverId, categoryId, channelId) => async (dispatch) =>  {
    try {
        const { data } = await createMessage(content, serverId, categoryId, channelId);
        dispatch({ type: 'CREATE_MESSAGE', payload: data });
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
