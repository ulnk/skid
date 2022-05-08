const initialState = () => {
    return {
        finishLoadingInvite: false,
        finishLoadingUser: false,
        finishLoadingServer: false,
        finishLoadingAll: false
    }
}

//eslint-disable-next-line
export default (state = initialState(), action) => {
    switch (action.type) {
        case 'LOAD':
            return state;
        default:
            return state;
    }
}