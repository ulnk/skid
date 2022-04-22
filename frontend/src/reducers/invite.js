const initialState = () => {
    return {
        serverFromInvite: {},
        allInvites: []
    }
}

//eslint-disable-next-line
export default (state = initialState(), action) => {
    switch (action.type) {
        case 'GET_SERVER_FROM_INVITE':
            if (!action.payload) return { ...state, serverFromInvite: {} };
            return { ...state, serverFromInvite: action.payload };
        case 'GET_INVITE':
            if (!action.payload) return state;
            return { ...state, allInvites: [action.payload, ...state.allInvites] };
        case 'CREATE_INVITE':
            if (!action.payload) return state;
            return { ...state, allInvites: [action.payload, ...state.allInvites] };
        default:
            return state;
    }
}