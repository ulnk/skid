export const checkReminder = (setter) => async (dispatch) =>  {
    try {
        dispatch({ type: 'REMINDER', payload: setter ? setter : JSON.parse(localStorage.getItem('showReminder'))});
    } catch(e) {
        console.log(e)
    }
}

export const test = () => async (dispatch) =>  {
    console.log(dispatch)
    dispatch({ type: 'TEST', payload: '123'});
}