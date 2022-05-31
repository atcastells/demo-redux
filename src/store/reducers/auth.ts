import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: ''
    },
    reducers: {
        loginReducer: (state, action) => {
            state.user = action.payload.user,
            state.token = action.payload.token
        },
        logoutReducer : (state) => {
            state.user = null,
            state.token = ''
        }
    }
})

export const {loginReducer, logoutReducer} = authSlice.actions

export default authSlice.reducer