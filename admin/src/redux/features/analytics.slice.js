import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  productAnalytics: [],
  loading: false,
  error: ''
};

export const fetchProductAnalytic = createAsyncThunk(
  'analytics/fetchproductanalytic',
  async ()=>{
    try{
      console.log('entered analytics')
      const resp = await axios('/analytics/products/like')
     return resp.data.data
    }catch(err){
      if(err.response){
        console.log(err.response.data)
      }
      return err
    }
  }
)

const AnalyticSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    analyticStartState: (state)=>{
      state.loading= true;
      state.error= ''
    },
    analyticSuccessState : (state,{payload})=>{
      state.loading = false;
      state.error = '';
      state.productAnalytics = payload;
    },
    analyticFailState: (state,{error})=>{
      state.loading = false;
      state.error = error.message;
      state.productAnalytics = [];
    },
    analyticsProductClear: (state)=>{
      state.loading = false;
      state.error = '';
      state.productAnalytics = []
    }
  },
  extraReducers: (builder)=>{
    builder
      .addCase(fetchProductAnalytic.pending, (state)=>{
        AnalyticSlice.caseReducers.analyticStartState(state)
      })
      .addCase(fetchProductAnalytic.fulfilled, (state,{payload})=>{
        AnalyticSlice.caseReducers.analyticSuccessState(state,{payload})
      })
      .addCase(fetchProductAnalytic.rejected, (state,{payload})=>{
        AnalyticSlice.caseReducers.analyticFailState(state,{payload})
      })
  }
});

export const { analyticsProductClear } = AnalyticSlice.actions;
export default AnalyticSlice.reducer; 
