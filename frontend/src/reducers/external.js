//INVITE_SERVER
//eslint-disable-next-line
export default (state = { inviteServer: {} }, action) => {
    switch (action.type) {
        case 'INVITE_SERVER':
            return { ...state, inviteServer: action.payload };
        default:
            return state;
    }
}