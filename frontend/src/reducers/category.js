const initialState = () => {
    return {
        currentCategory : {},
        allServerCategories: []
    }
}

//eslint-disable-next-line
export default (state = initialState(), action) => {
    switch (action.type) {
        case 'GET_ALL_CATEGORIES':
            if (!action.payload) return state;
            return { ...state, allServerCategories: [...action.payload] };
        case 'GET_CATEGORY':
            if (!action.payload) return state;
            return { ...state, currentCategory: action.payload };
        case 'DELETE_CATEGORY':
            if (!action.payload) return state;
            return { ...state, allServerCategories: [...action.payload] };
        default:
            return state;
    }
}