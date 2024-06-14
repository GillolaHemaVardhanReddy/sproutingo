import React, { useEffect, useRef } from 'react';
import './ComplaintDisplay.css';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';
import {useDispatch, useSelector} from 'react-redux'
import {FetchComplaints, searchComplaint} from '../../redux/features/complaint.slice'
function ComplaintDisplay() {
  const dispatch = useDispatch();
  const searchInputRef = useRef();
  const items = useSelector(state => state.complaint.complaints)

  useEffect(()=>{
    dispatch(FetchComplaints())
  }, [dispatch]);
  

  const handleSearch = ()=>{
    const q = searchInputRef.current.value
    dispatch(searchComplaint(q))
  }

  const handleSolve = async (id) => {
    await axios.put(`/complaint/${id}`);
    dispatch(FetchComplaints())
  };

  const handleDelete =  async (id) =>{
      try{
          const userConfirmed = window.confirm(`Are you sure you want to delete ?`);
      if(userConfirmed){
        //delete
        try{
          const r = await axios.delete(`/complaint/${id}`);
          dispatch(FetchComplaints())
        } catch(err) {
          console.log("error deleting complaints",err);
        }
      }
      }  catch(err){
      console.log(err);
    }
  }

  return (
    <div className="complaint-display-container">
      <div className="complaint-display">
        <div className="complaint-navbar">
          <p>Complaints</p>
        </div>
        <div className="search-container">
          <input
              type='text'
              placeholder='Search....'
              ref={searchInputRef}
            /> 
            <div className='btn'>
              <button onClick={handleSearch}>Search</button>
            </div>
        </div>
        <table className="complaint-display-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Complaint</th>
              <th>Raised </th>
              <th>Address</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.userId.name}</td>
                <td>{item.complaint}</td>
                <td>
                <p>{item?.createdAt && <ReactTimeAgo date={new Date(item.createdAt)} locale="en-US" />}</p>
                  </td>
                <td>{item.userId.address[0].street}</td>
                <td>{item.userId.phone}</td>
                <td className="btn-class">
                  <button
                    className={`solve-btn ${item.isResolved ? 'resolved' : ''}`}
                    onClick={() => handleSolve(item._id)}
                  >
                    { item.isResolved ? 'Resolved' : 'Solve'}
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComplaintDisplay;