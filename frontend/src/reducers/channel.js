const initialState = () => {
    return {
        currentChannel : {},
        allServerChannels: []
    }
}

//eslint-disable-next-line
export default (state = initialState(), action) => {
    switch (action.type) {
        case 'GET_ALL_CHANNELS':
            if (!action.payload) return state;
            return { ...state, allServerChannels: [...action.payload] };
        case 'GET_CHANNEL':
            if (!action.payload) return state;
            return { ...state, currentChannel: action.payload };
        case 'DELETE_CHANNEL':
            if (!action.payload) return state;
            return { ...state, allServerChannels: [...action.payload] };
        default:
            return state;
    }
}