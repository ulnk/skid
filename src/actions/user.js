import { login } from '../api/user/login';
import { test } from '../api/user/test';
import { register } from '../api/user/register';
import { image } from '../api/user/image';
import { disableAccount } from '../api/user/disableAccount';
import { deleteAccount } from '../api/user/deleteAccount';

export const loginAction = (username, password) => async (dispatch) =>  {
    try {
        const { data } = await login(username, password);
        dispatch({ type: 'LOGIN', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const registerAction = (username, password, email) => async (dispatch) =>  {
    try {
        const { data } = await register(username, password, email);
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

export const testAction = (username, password) => async (dispatch) =>  {
    try {
        const { data } = await test(username, password);
        dispatch({ type: 'AUTH', payload: data });
    } catch(e) {
        console.log(e)
    }
}

export const disableAccountAction = () => async (dispatch) =>  {
    try {
        const { data } = await disableAccount();
        dispatch({ type: 'LOGOUT', payload: data });
    } catch {

    }
}

export const deleteAccountAction = () => async (dispatch) =>  {
    try {
        const { data } = await deleteAccount();
        dispatch({ type: 'LOGOUT', payload: data });
    } catch(e) {
        console.log(e)
    }
}
