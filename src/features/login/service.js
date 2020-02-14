import axios from 'axios';
import { BASE_URL } from 'react-native-dotenv'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

const service = {
  signUp: data => {
    return instance.post('/auth/signup', data)
      .then(res => res)
      .catch(err => err.response)
  },
  login: data => {
    return instance.post('/auth/login', data)
      .then(res => res)
      .catch(err => err.response)
  }
}

export default service;
