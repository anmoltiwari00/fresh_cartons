export const signup = data => ({
  type: 'SIGNUP',
  payload: data
});

export const signupSuccess = data => ({
  type: 'SIGNUP_SUCCESS',
  payload: data
})

export const login = data => ({
  type: 'LOGIN',
  payload: data
});

export const loginSuccess = data => ({
  type: 'LOGIN_SUCCESS',
  payload: data
})
