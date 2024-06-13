import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  refreshCounter: 0,
};

const refreshSlice = createSlice({
  name: 'refresh',
  initialState,
  reducers: {
    incrementRefreshCounter: (state) => {
      state.refreshCounter += 1;
    },
  },
});

export const { incrementRefreshCounter } = refreshSlice.actions;
export default refreshSlice.reducer; 
