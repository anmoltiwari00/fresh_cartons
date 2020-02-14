import { takeLatest, put, select, takeEvery, call } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';

import * as authActions from './actions';
import * as sharedActions from '../../shared/SharedActions';
import service from './service';
import NavigationService from '../../../NavigationService';

export function* signUp(data) {
  try {
    const userData = yield call(service.signUp, data.payload);
    if(userData.status === 200) {
      console.log(userData);
      put(authActions.signupSuccess(userData.data));
      AsyncStorage.setItem('@user', userData.data.Authorization).then(res => NavigationService.navigate('Home'));
    } else {
      yield put(sharedActions.error(userData.data));
    }
  } catch (err) {
    yield put(sharedActions.error(err));
  }
}

export function* login(data) {
  try {
    const userData = yield call(service.login, data.payload);
    if(userData.status === 200) {
      console.log(userData);
      put(authActions.loginSuccess(userData.data));
      AsyncStorage.setItem('@user', userData.data.Authorization).then(res => NavigationService.navigate('Home'));
    } else {
      console.log(userData.data)
      yield put(sharedActions.error(userData.data));
    }
  } catch (err) {
    yield put(sharedActions.error(err));
  }
}

export const loginSaga = [
  takeEvery('SIGNUP', signUp),
  takeEvery('LOGIN', login)
];
