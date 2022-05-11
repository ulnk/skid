const initialState = () => {
    return {}
}

//eslint-disable-next-line
export default (state = initialState(), action) => {
    switch (action.type) {
        case 'ERROR':
            return { ...state, [action.payload.type]: action.payload.message };
        default:
            return state;
    }
}