import { getAllMessages } from "../api/friend/getAllMessages";
import { getMessage } from "../api/friend/getMessage";
import { createMessage } from "../api/friend/createMessage";
import { deleteMessage } from "../api/friend/deleteMessage";

export const getAllFriendMessagesAction = (serverId, channelId) => async (dispatch) =>  {
    try {
        const { data } = await getAllMessages(serverId, channelId);
        dispatch({ type: 'GET_ALL_MESSAGES_FRIEND', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const getFriendMessageAction = (messageId) => async (dispatch) =>  {
    try {
        const { data } = await getMessage(messageId);
        dispatch({ type: 'GET_MESSAGE_FRIEND', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const addFriendMessageToAll = (message) => async (dispatch) =>  {
    try {
        dispatch({ type: 'ADD_MESSAGE_TO_ALL_FRIEND', payload: message });
    } catch(e) {
        console.log(e)
    }
}

export const createFriendMessageAction = (content, friendId, small) => async (dispatch) =>  {
    try {
        const { data } = await createMessage(content, friendId, small);
        // dispatch({ type: 'CREATE_MESSAGE_FRIEND', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const deleteFriendMessageAction = (messageId) => async (dispatch) =>  {
    try {
        const { data } = await deleteMessage(messageId);
        dispatch({ type: 'DELETE_MESSAGE_FRIEND', payload: data });
    } catch(e) {
        console.log(e)
    }
}
