export const notifyChannelAndServer = (serverId, channelId) => async (dispatch) =>  {
    try {
        dispatch({ type: 'NOTIFY_SERVER_CHANNEL', payload: { serverId, channelId } });
    } catch(e) {
        console.log(e);
    }
}

export const notifyUnreadMessage = (msg) => async (dispatch) =>  {
    try {
        dispatch({ type: 'UNREAD_DM', payload: msg });
    } catch(e) {
        console.log(e);
    }
}

export const clearUnreadMessage = (id) => async (dispatch) =>  {
    try {
        dispatch({ type: 'CLEAR_DM', payload: id });
    } catch(e) {
        console.log(e);
    }
}