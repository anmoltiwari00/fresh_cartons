// Imports: Dependencies
import {combineReducers} from 'redux';
// Imports: Reducers
import AuthReducer from './src/features/login/reducers';
import SharedReducer from './src/shared/SharedReducer';
// Redux: Root Reducer
const rootReducer = combineReducers({
  auth: AuthReducer,
  shared: SharedReducer
});
// Exports
export default rootReducer;
