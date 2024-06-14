import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    complaints: [],
    loading: false,
    error: "",
}

export const fetchComplaints = createAsyncThunk(
    "complaint/fetchcomplaints",
    async() => {
        try{
            const resp = await axios('/complaint/');
            if(resp.data.success ) return resp.data.data
            else throw new Error("Failed to fetch Complaints");
        }catch(err){   
            if (err.response && err.response.data && err.response.data.message) {
              throw new Error(err.response.data.message);
            } else {
              throw err
            }
        }
    }
)



const complaintSlice = createSlice(
    {
        name: "complaints",
        initialState,
        reducers:{
            complaintLoad: (state) => {
              state.loading = true
              state.error = '';
            },
            complaintSuccess : (state,{payload})=>{
              state.loading = false;
              state.products = payload;
              state.error = '';
            },
            complaintFail : (state,{error})=>{
              state.loading = false;
              state.error = error.message
            },
            complaintClear : (state)=>{
              state.loading = false;
              state.error = ''
              state.products = []
              
            }
          },
        extraReducers: (builder) => {
            builder
                .addCase(fetchComplaints.pending, (state) =>{
                    complaintSlice.caseReducers.complaintLoad(state);
                })
                .addCase(fetchComplaints.fulfilled, (state,{payload}) =>{
                    complaintSlice.caseReducers.complaintSuccess(state,{payload});
                })
                .addCase(fetchComplaints.rejected, (state,{error}) =>{
                    complaintSlice.caseReducers.complaintFail(state,{error});
                })
        }
    }
)



export const {complaintClear} = complaintSlice.actions
export default complaintSlice.reducer

