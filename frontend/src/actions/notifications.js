export const notifyChannelAndServer = (serverId, channelId) => async (dispatch) =>  {
    try {
        dispatch({ type: 'NOTIFY_SERVER_CHANNEL', payload: { serverId, channelId } });
    } catch(e) {
        console.log(e);
    }
}