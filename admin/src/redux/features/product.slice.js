import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
  products:[],
  loading:false,
  error:""
}

export const fetchProducts = createAsyncThunk(
  'product/fetchproduct',
  async ()=>{
    try{
      const resp = await axios('/product/')
      if(resp.data.success){
        return resp.data.data 
      }else{
        throw new Error("Failed to load data")
      }
    }catch(err){
      if(err.response){
        throw new Error(err.response.data.message)
      }
      else throw err.message
    }
  }
)

export const productSearch = createAsyncThunk(
  'product/searchproduct',
  async (q)=>{
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

  },
  extraReducers:(builder)=>{
    builder
      .addCase(fetchProducts.pending,(state)=>{
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled,(state,{payload})=>{
        state.loading = false;
        state.products = payload;
      })
      .addCase(fetchProducts.rejected,(state,{error})=>{
        state.loading = false;
        state.error = error.message
      })
      .addCase(productSearch.pending,(state)=>{
        state.loading = true
      })
      .addCase(productSearch.fulfilled,(state,{payload})=>{
        state.loading = false;
        state.products = payload;
      })
      .addCase(productSearch.rejected,(state,{error})=>{
        state.loading = false;
        state.error = error.message
      })
  }
})

export default productSlice.reducer