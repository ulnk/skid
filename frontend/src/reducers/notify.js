const initialState = () => {
    return {
        notify: [],
        unreadMessages: JSON.parse(localStorage.getItem('unread')) || []
    }
}

//eslint-disable-next-line
export default (state = initialState(), action) => {
    switch (action.type) {
        case 'UNREAD_DM':
            const foundMessage = state.unreadMessages.filter(unreadMsg => unreadMsg.owner === action.payload.owner)[0];
            if (foundMessage) {
                const allUnreadMessages = state.unreadMessages.filter(unreadMsg => unreadMsg.owner !== action.payload.owner);
                localStorage.setItem('unread', JSON.stringify(allUnreadMessages));
                return { ...state, unreadMessages: [ { ownerName: foundMessage.ownerName, owner: foundMessage.owner, image: foundMessage.image, count: foundMessage.count + 1 }, ...allUnreadMessages] }
            }

            const newUnreadDm = [{ ownerName: action.payload.ownerName, owner: action.payload.owner, image: action.payload.image, count: 1 }, ...state.unreadMessages];
            localStorage.setItem('unread', JSON.stringify(newUnreadDm));
            return { ...state, unreadMessages: newUnreadDm }
        case 'CLEAR_DM':
            const alertToClear = state.unreadMessages.filter(unreadMsg => unreadMsg.owner === action.payload)[0];
            if (!alertToClear) return { ...state };
            const messagesWithoutDM = state.unreadMessages.filter(unreadMsg => unreadMsg.owner !== action.payload);
            localStorage.setItem('unread', JSON.stringify(messagesWithoutDM));
            return { ...state, unreadMessages: [...messagesWithoutDM] }    
        case 'NOTIFY_SERVER_CHANNEL':
            return state;
        default:
            return state;
    }
}