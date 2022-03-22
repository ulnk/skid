import * as api from '../api/index'

export const login = (usercred) => async (dispatch) =>  {
    try {
        const { data } = await api.login(usercred);
        dispatch({ type: 'LOGIN', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const logout = () => async (dispatch) =>  {
    try {
        dispatch({ type: 'LOGOUT', payload: null });
    } catch(e) {
        console.log(e)
    }
}

export const register = (usercred) => async (dispatch) =>  {
    try {
        const { data } = await api.register(usercred);
        dispatch({ type: 'REGISTER', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const changePfp = (datato) => async (dispatch) =>  {
    try {
        const { data } = await api.changePfp(datato);
        dispatch({ type: 'PROFILEPICTURE', payload: data });
    } catch(e) {
        console.log(e)
    }
}