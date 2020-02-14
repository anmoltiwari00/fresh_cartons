// Imports: Dependencies
import { all, fork} from 'redux-saga/effects';
// Imports: Redux Sagas
import { loginSaga } from './src/features/login/loginSaga';
// Redux Saga: Root Saga
export default function* rootSaga () {
  yield all([
    ...loginSaga
  ]);
};
