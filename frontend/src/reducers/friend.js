const initialState = () => {
    return {
        currentMessage: {},
        allChannelMessages: []
    }
}

//eslint-disable-next-line
export default (state = initialState(), action) => {
    switch (action.type) {
        case 'GET_ALL_MESSAGES_FRIEND':
            if (!action.payload) return state;
            return { ...state, allChannelMessages: [...action.payload] };
        case 'ADD_MESSAGE_TO_ALL_FRIEND':
            if (!action.payload) return state;
            return { ...state, allChannelMessages: [action.payload, ...state.allChannelMessages] };
        case 'GET_MESSAGE_FRIEND':
            if (!action.payload) return state;
            return { ...state, currentMessage: action.payload };
        case 'CREATE_MESSAGE_FRIEND':
            if (!action.payload) return state;
            return { ...state, currentMessage: action.payload, allChannelMessages: [action.payload, ...state.allChannelMessages]};
        case 'DELETE_MESSAGE_FRIEND':
            if (!action.payload) return state;
            return state;
        default:
            return state;
    }
}