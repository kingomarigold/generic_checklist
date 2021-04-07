import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedIn: false,
  name: '',
  token: '',
  roles: ''
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log('In reducer, Login - ', action)
      state.loggedIn = true
      state.name = action.payload.name
      state.token = action.payload.token
      state.roles = action.payload.roles
    },
    logout: (state) => {
      console.log('In reducer, Logout')
      state.loggedIn = false
      state.name = ''
      state.token = ''
      state.roles = ''
    },
    refreshToken: (state, action) => {
      state.token = action.payload.token
    }
  }
})

export const { login, logout, refreshToken } = UserSlice.actions

export const userName = (state) => state.user.name
export const token = (state) => state.user.token
export const roles = (state) => state.user.roles
export const loggedIn = (state) => state.user.loggedIn
export const admin = (state) => state.user.roles.includes('ROLE_ADMIN')
export const clinician = (state) => state.user.roles.includes('ROLE_USER')

export default UserSlice.reducer
