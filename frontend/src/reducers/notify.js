const initialState = () => {
    return {
        notify: []
    }
}

//eslint-disable-next-line
export default (state = initialState(), action) => {
    switch (action.type) {
        case 'NOTIFY_SERVER_CHANNEL':
            return state;
        default:
            return state;
    }
}