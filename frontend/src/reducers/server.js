const initialState = () => {
    return {
        currentServer : {},
        global : {},
        allServers: [],
        allOnlineUsers: [],
        allOfflineUsers: []
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
        case 'CREATE_SERVER':
            if (!action.payload) return state;
            return { ...state, allServers: [...state.allServers, action.payload] };
        case 'GET_SERVER':
            if (!action.payload) return state;
            return { ...state, currentServer: action.payload };
        case 'DELETE_SERVER':
            if (!action.payload) return state;
            return { ...state, allServers: state.allServers.filter((server => server._id !== action.payload)) };
        case 'LEAVE_SERVER':
            if (!action.payload) return state;
            return { ...state, allServers: state.allServers.filter((server => server._id !== action.payload)) };
        case 'GET_ALL_ONLINE_USERS':
            if (!action.payload) return state;
            return { ...state, allOnlineUsers: [...action.payload.online], allOfflineUsers: [...action.payload.offline] };
        case 'GLOBAL_SERVER':
            if (!action.payload) return state;
            return { ...state, global: action.payload };
        default:
            return state;
    }
}