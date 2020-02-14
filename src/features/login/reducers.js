const defaultState = null;

const reducer =  (state = defaultState, action) => {
 switch (action.type) {
   case 'SIGNUP_SUCCESS':
    return {
     ...state,
     signup_success: action.payload
    }
   case 'LOGIN_SUCCESS':
    return {
     ...state,
     login_success: action.payload
    }
   default:
    return state
 }
}

export default reducer;
