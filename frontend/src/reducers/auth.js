import jwtDecode from 'jwt-decode';

const initial = () => {
    const currentToken = localStorage.getItem('token')

    try {
        return {
            token: localStorage.getItem('token'), 
            data: {
                username: jwtDecode(currentToken).data.username || '', 
                userId: jwtDecode(currentToken).data.userId || '', 
                userRole: jwtDecode(currentToken).data.userRole || '',
                pfpUrl: jwtDecode(currentToken).data.profileUrl || ''
            }
        }
    } catch {
        return {
            token: localStorage.getItem('token'), 
            data: {
                username: '', 
                userId: '', 
                userRole: '',
                pfpUrl: ''
            }
        }
    }
}

const setJwt = (action) => {
    const newJwt = action.payload.jwt;
    const userJwt = jwtDecode(newJwt);
    console.log(userJwt)
    localStorage.setItem('token', newJwt)
    return { ...initial(), ...userJwt, token: newJwt };
}

//eslint-disable-next-line
export default (state = initial(), action) => {
    switch (action.type) {
        case 'LOGIN':
            return setJwt(action);
        case 'LOGOUT':
            localStorage.setItem('token', null)
            return { ...initial() };
        case 'REGISTER':
            return setJwt(action);
        case 'PROFILEPICTURE':
            return setJwt(action);
        default:
            return state;
    }
}