const initialState = () => {
    return {
        currentServer : {},
        allServers: []
    }
}

//eslint-disable-next-line
export default (state = initialState(), action) => {
    switch (action.type) {
        case 'JOIN_INVITE':
            if (!action.payload) return state;
            return { ...state, currentServer: action.payload, allServers: [...state.allServers, action.payload] };
        case 'GET_ALL_SERVERS':
            if (!action.payload) return state;
            return { ...state, allServers: [...action.payload] };
        case 'GET_SERVER':
            if (!action.payload) return state;
            return { ...state, currentServer: action.payload };
        case 'DELETE_SERVER':
            if (!action.payload) return state;
            return { ...state, allServers: [...action.payload] };
        case 'LEAVE_SERVER':
            if (!action.payload) return state;
            return { ...state, allServers: [...action.payload] };
        default:
            return state;
    }
}