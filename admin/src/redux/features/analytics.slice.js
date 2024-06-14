import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productAnalytics: []
};

const AnalyticSlice = createSlice({
  name: 'refresh',
  initialState,
  reducers: {
    
  },
});

export const {  } = AnalyticSlice.actions;
export default AnalyticSlice.reducer; 
