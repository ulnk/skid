const initialState = () => {
    return {
        reminder : {}
    }
}

//eslint-disable-next-line
export default (state = initialState(), action) => {
    switch (action.type) {
        case 'REMINDER':
            return { ...state, reminder: action.payload };
        case 'TEST':
            console.log('test')
            return state;
        default:
            return state;
    }
}