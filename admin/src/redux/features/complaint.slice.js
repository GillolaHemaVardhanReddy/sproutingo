import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
  complaints: [],
  loading: false,
  error: "",
}

export const FetchComplaints = createAsyncThunk(
    "complaint/fetchcomplaints",
    async(_, { dispatch, rejectWithValue }) => {
        try{
            const resp = await axios.get('/complaint/');
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


export const searchComplaint = createAsyncThunk(
  "complaint/searchcomplaints",
  async (q,{ dispatch, rejectWithValue }) => {
      try{
          const resp = await axios.get(`/complaint/search?q=${q}`);
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
              state.complaints = payload;
              state.error = '';
            },
            complaintFail : (state,{error})=>{
              state.loading = false;
              state.error = error.message
            },
            complaintClear : (state)=>{
              state.loading = false;
              state.error = ''
              state.complaints = []
              
            }
          },
        extraReducers: (builder) => {
            builder
                .addCase(FetchComplaints.pending, (state) =>{
                    complaintSlice.caseReducers.complaintLoad(state);
                })
                .addCase(FetchComplaints.fulfilled, (state,{payload}) =>{
                    complaintSlice.caseReducers.complaintSuccess(state,{payload});
                })
                .addCase(FetchComplaints.rejected, (state,{error}) =>{
                    complaintSlice.caseReducers.complaintFail(state,{error});
                })
                .addCase(searchComplaint.pending, (state) =>{
                  complaintSlice.caseReducers.complaintLoad(state);
                })
                .addCase(searchComplaint.fulfilled, (state,{payload}) =>{
                    complaintSlice.caseReducers.complaintSuccess(state,{payload});
                })
                .addCase(searchComplaint.rejected, (state,{error}) =>{
                    complaintSlice.caseReducers.complaintFail(state,{error});
                })
              
        }
    }
)



export const {complaintClear} = complaintSlice.actions
export default complaintSlice.reducer