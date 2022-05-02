import jwtDecode from 'jwt-decode';

const initialState = (token) => {
    const currentToken = token || JSON.parse(localStorage.getItem('token'));

    try {
        return {
            token: currentToken, 
            ...jwtDecode(currentToken).data,
            auth: false
        }
    } catch {
        return {
            token: JSON.stringify(null),
            auth: false
        }
    }
}

//eslint-disable-next-line
export default (state = initialState(), action) => {
    switch (action.type) {
        case 'LOGIN':
            if (!action.payload) return { ...initialState() };
            localStorage.setItem('token', JSON.stringify(action.payload.jwt));
            return { ...initialState(action.payload.jwt) };
        case 'LOGOUT':
            localStorage.setItem('token', JSON.stringify(null))
            return { ...initialState() };
        case 'REGISTER':
            if (!action.payload) return { ...initialState() };
            localStorage.setItem('token', JSON.stringify(action.payload.jwt));
            return { ...initialState(action.payload.jwt) };
        case 'IMAGE':
            if (!action.payload) return state;
            return { ...initialState(action.payload.jwt) };
        case 'AUTH':
            return { ...state, auth: action.payload.auth }
        default:
            return state;
    }
}