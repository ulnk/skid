import { login } from '../api/user/login';
import { test } from '../api/user/test';
import { register } from '../api/user/register';
import { image } from '../api/user/image';
import { disableAccount } from '../api/user/disableAccount';
import { deleteAccount } from '../api/user/deleteAccount';
import { getAllFriends } from '../api/user/getAllFriends';
import { addFriend } from '../api/user/addFriend';

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
        dispatch({ type: 'LOGOUT', payload: null });
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

export const getAllFriendsAction = () => async (dispatch) => {
    try {
        const { data } = await getAllFriends();
        dispatch({ type: 'ALL_FRIENDS', payload: data });
    } catch (e) {
        console.log(e)
    }
}

export const addFriendAction = (friendName) => async (dispatch) => {
    try {
        const { data } = await addFriend(friendName);
        console.log(data)
        dispatch({ type: 'ALL_FRIENDS', payload: data });
    } catch (e) {
        console.log(e)
    }
}