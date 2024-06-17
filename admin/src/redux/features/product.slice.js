import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { userDetailClear } from './user.slice'
import { complaintClear } from './complaint.slice'


const initialState = {
  products:[],
  loading:false,
  error:""
}

export const fetchProducts = createAsyncThunk(
  'product/fetchproduct',
  async (_, { dispatch, rejectWithValue })=>{
    try{
      const resp = await axios('/product/')
      if(resp.data.success){
        dispatch(userDetailClear())
        dispatch(complaintClear())
        return resp.data.data 
      }
    }catch(err){
      dispatch(userDetailClear())
      dispatch(complaintClear())
      if(err.response){
        throw new Error(err.response.data.message)
      }
      else throw err.message
    }
  }
)

export const productSearch = createAsyncThunk(
  'product/searchproduct',
  async (q,{ dispatch, rejectWithValue })=>{
    try{
      const resp = await axios(`/product/search?q=${q}`)
      if(resp.data.success){
        return resp.data.data 
      }else{
        throw new Error("Failed to load data")
      }
    }catch(err){
      console.log(err)
      if(err.response){
        throw new Error(err.response.data.message)
      }
      else throw err.message
    }
  }
)

const productSlice = createSlice({
  name:"product",
  initialState,
  reducers:{
    loadingState: (state) => {
      state.loading = true
      state.error = '';
    },
    successState : (state,{payload})=>{
      state.loading = false;
      state.products = payload;
      state.error = '';
    },
    failState : (state,{error})=>{
      state.loading = false;
      state.error = error.message
    },
    clearState : (state)=>{
      state.loading = false;
      state.error = ''
      state.products = []
    },
    productClearError : (state)=>{
      state.error = ''
    },
    clearProduct : (state)=>{
      state.error = '';
      state.products = [];
      state.loading = false;
    }
  },
  extraReducers:(builder)=>{
    builder
      .addCase(fetchProducts.pending, (state) => {
        productSlice.caseReducers.loadingState(state);
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        productSlice.caseReducers.successState(state, { payload });
      })
      .addCase(fetchProducts.rejected, (state, { error }) => {
        productSlice.caseReducers.failState(state, { error });
      })
      .addCase(productSearch.pending, (state) => {
        productSlice.caseReducers.loadingState(state);
      })
      .addCase(productSearch.fulfilled, (state, { payload }) => {
        productSlice.caseReducers.successState(state, { payload });
      })
      .addCase(productSearch.rejected, (state, { error }) => {
        console.log(error)
        productSlice.caseReducers.failState(state, { error });
      })
  }
})

export const {clearState , productClearError , clearProduct} = productSlice.actions

export default productSlice.reducer