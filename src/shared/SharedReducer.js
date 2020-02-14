const defaultState = null;

const reducer =  (state = defaultState, action) => {
 switch (action.type) {
  case 'ERROR':
   return {
    ...state,
    error: action.payload
   }
  default:
   return state
 }
}

export default reducer;
