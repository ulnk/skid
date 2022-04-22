const initialState = () => {
    return {
        currentMessage : {}, // i dont even know what this means
        allChannelMessages: []
    }
}

//eslint-disable-next-line
export default (state = initialState(), action) => {
    switch (action.type) {
        case 'GET_ALL_MESSAGES':
            if (!action.payload) return state;
            return { ...state, allChannelMessages: [...action.payload] };
        case 'GET_MESSAGE':
            if (!action.payload) return state;
            return { ...state, currentMessage: action.payload };
        case 'DELETE_MESSAGE':
            if (!action.payload) return state;
            return state;
        default:
            return state;
    }
}