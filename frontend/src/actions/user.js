import { login } from '../api/user/login';
import { register } from '../api/user/register';
import { image } from '../api/user/image';

export const loginAction = (username, password) => async (dispatch) =>  {
    try {
        const { data } = await login(username, password);
        dispatch({ type: 'LOGIN', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const registerAction = (username, password) => async (dispatch) =>  {
    try {
        const { data } = await register(username, password);
        dispatch({ type: 'REGISTER', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const imageAction = (imageLink) => async (dispatch) =>  {
    try {
        const { data } = await image(imageLink);
        dispatch({ type: 'IMAGE', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const logoutAction = () => async (dispatch) =>  {
    try {
        dispatch({ type: 'LOGOUT', payload: null });
    } catch(e) {
        console.log(e)
    }
}