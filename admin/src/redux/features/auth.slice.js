import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: {},
    isAuth: false,
    loading: false,
    error: ''
}

export const fetchUser = createAsyncThunk('auth/fetchuser',async ({email,password})=>{
    try{
        const resp = await axios.post('/auth/signin', { email, password });
        if(resp.data.success && resp.data.data.role==='admin') return resp.data.data
        else throw new Error("Only admins are allowed");
    }catch(err){   
        if (err.response && err.response.data && err.response.data.message) {
          throw new Error(err.response.data.message);
        } else {
          throw err
        }
    }
})

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logoutStart:(state)=>{
            state.loading = true;
        },
        logoutSuccess : (state,{payload})=>{
            console.log(payload)
            state.isAuth = false;
            state.user = {}
            state.error = ''
            state.loading = false
        },
        logoutFail : (state,{payload})=>{
            state.error = payload
        },
        clearError: (state) => {
            state.error = '';
        },
    },
    extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchUser.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.user = payload
        state.isAuth = true;
      })
      .addCase(fetchUser.rejected, (state, {error}) => {
        state.loading = false;
        state.error = error.message
        state.isAuth = false
      });
  },
})

export default AuthSlice.reducer


export const {
    logoutStart,
    logoutSuccess,
    logoutFail,
    clearError
} = AuthSlice.actions