import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    isAuth: false,
    loading: false,
    error: ''
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        loginStart : (state) => {
            state.loading = true;
        },
        loginSuccess : (state,{payload}) => {
            state.user = payload;
            state.isAuth = true;
            state.loading = false;
            state.error = '';
        },
        loginFail: (state,{payload})=>{
            state.error = payload;
            state.isAuth = false;
            state.loading = false;
        },
        logoutStart: (state)=>{
            state.loading = false
        },
        logoutSuccess: (state,payload)=>{
            state.error = ''
            state.isAuth = false
            state.user = {}
        },
        logoutFail: (state,{payload})=>{
            state.error = payload
            state.loading = false
            state.isAuth = true
        }
    }
})

export default AuthSlice.reducer
export const {
    loginStart,
    loginSuccess,
    loginFail,
    logoutStart,
    logoutSuccess,
    logoutFail
} = AuthSlice.actions