//eslint-disable-next-line
export default (state = { notify: [] }, action) => {
    switch (action.type) {
        case 'NOTIFY_SERVER_CHANNEL':
            console.log(action.payload)
            // return { ...state, notify: [action.payload, ...state.notify] };
            break
        default:
            return state;
    }
}