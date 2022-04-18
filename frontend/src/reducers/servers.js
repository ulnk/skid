//eslint-disable-next-line
export default (state = { invites: [], all: [], current: {}, channel: { allMessages: [], channelName: '' } }, action) => {
    switch (action.type) {
        case 'GET_ALL_SERVERS':
            return { ...state, all: [...action.payload] };
        case 'GET_CURRENT_SERVER':
            return { ...state, current: action.payload };
        case 'GET_CURRENT_CHANNEL':
            return { ...state, channel: action.payload };
        case 'ADD_SERVER':
            return { ...state, all: [...state.all, action.payload] };
        case 'JOIN_INVITE':
            return { ...state, all: [...state.all, action.payload] };
        case 'HAS_INVITE':
            return { ...state, invites: [...state.invites, { ...action.payload }] };
        case 'REMOVE_SERVER':
            return { ...state, all: [...state.all].filter(server => {
                return server._id !== action.payload ? server : null 
            }) };
        case 'DELETE_SERVER':
            return { ...state, all: [...state.all].filter(server => {
                return server._id !== action.payload ? server : null 
            }) };
        case 'GET_MESSAGE':
            return { ...state, channel: { allMessages: [action.payload, ...state.channel.allMessages] } };
        case 'SEND_MESSAGE':
            return { ...state, channel: { allMessages: [action.payload, ...state.channel.allMessages] } };
        case 'ADD_CATEGORY':
            return { ...state, current: { ...state.current, allCategorys: [...state.current.allCategorys, action.payload] } };
        case 'ADD_CHANNEL':
            return { ...state, current: action.payload };
        case 'REMINDER':
                return { ...state, reminder: action.payload };
        default:
            return state;
    }
}