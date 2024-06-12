import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: {},
    loading: false,
    error: ''
}

export const fetchProducts = createAsyncThunk('product/fetchProducts',async ()=>{
    try{
        const resp = await axios('/product/display');
        return resp.data.data
    }catch(err){   
        if (err.response && err.response.data && err.response.data.message) {
          throw new Error(err.response.data.message);
        } else {
          throw err
        }
    }
})

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        clearError: (state) => {
            state.error = '';
        },
    },
    extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchProducts.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.products = payload
      })
      .addCase(fetchProducts.rejected, (state, {error}) => {
        state.loading = false;
        state.error = error.message
      });
  },
})

export default productSlice.reducer


export const {
    clearError,
} = productSlice.actions