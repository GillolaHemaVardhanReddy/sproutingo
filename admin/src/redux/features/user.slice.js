import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    userDetails: [],
    loading: false,
    error: ''
};

export const fetchUserDetail = createAsyncThunk(
  'user/fetchuserdetail',
  async ()=>{
    try{
      const resp = await axios.get(`/user/all`)
      if(resp.data.success){
        return resp.data.data
      }
    }catch(err){
      if(err.response){
        throw new Error(err.response.data.message)
      }
      else throw err.message
    }
  }
)

export const searchUserDetail = createAsyncThunk(
  'user/searchuserdetail',
  async (q)=>{
    try{
      const resp = await axios.get(`/user/search?q=${q}`)
      if(resp.data.success){
        return resp.data.data
      }
    }catch(err){
      if(err.response){
        throw new Error(err.response.data.message)
      }
      else throw err.message
    }
  }
)

const userDetailsSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userDetailLoading: (state) => {
            state.loading = true
            state.error = '';
          },
          userDetailSuccess : (state,{payload})=>{
            state.loading = false;
            state.userDetails = payload;
            state.error = '';
          },
          userDetailFail : (state,{error})=>{
            state.loading = false;
            state.error = error.message
          },
          userDetailClear : (state)=>{
            state.loading = false;
            state.error = ''
            state.userDetails = []
          },
          userErrorClear : (state)=>{
            state.error = ''
          }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchUserDetail.pending, (state) => {
            userDetailsSlice.caseReducers.userDetailLoading(state);
          })
          .addCase(fetchUserDetail.fulfilled, (state, {payload}) => {
           userDetailsSlice.caseReducers.userDetailSuccess(state, {payload});
          })
          .addCase(fetchUserDetail.rejected, (state, {error}) => {
           userDetailsSlice.caseReducers.userDetailFail(state, {error});
          })
          .addCase(searchUserDetail.pending, (state) => {
            userDetailsSlice.caseReducers.userDetailLoading(state);
          })
          .addCase(searchUserDetail.fulfilled, (state, {payload}) => {
           userDetailsSlice.caseReducers.userDetailSuccess(state, {payload});
          })
          .addCase(searchUserDetail.rejected, (state, {error}) => {
           userDetailsSlice.caseReducers.userDetailFail(state, {error});
          })
        }
});

export const {userDetailClear , userErrorClear} = userDetailsSlice.actions

export default userDetailsSlice.reducer