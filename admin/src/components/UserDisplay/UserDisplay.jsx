import React, { useState, useEffect } from 'react'
import './UserDisplay.css'
import { useDispatch, useSelector } from 'react-redux'
import ReactTimeAgo from 'react-time-ago';
import { fetchUserDetail } from '../../redux/features/user.slice';
import { SetError } from '../ErrorMessage/ErrorMessage';
import SearchBar from '../SearchBar/SearchBar';

const UserDisplay = () => {
  const dispatch = useDispatch()
  const [sortOrder, setSortOrder] = useState('latest');

  let userDetails = useSelector(state=>state.user.userDetails)

  useEffect(() => {
    dispatch(fetchUserDetail())
  }, [dispatch]);


  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  userDetails = [...userDetails].sort((a, b) => {
    if (sortOrder === 'latest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  return (
    <div className='user-display-container'>
      <SetError/>
      <SearchBar type="searchUserDetail"/>
      <table className='user-display-table'>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>User Since
              <div className='sort-by'>
                <select value={sortOrder} onChange={handleSortChange}>
                  <option value='latest'>Latest</option>
                  <option value='oldest'>Oldest</option>
                </select>
              </div>
            </th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {userDetails.map(user => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.address.map((address, index) => (
                    <div key={index}>
                      <p><b>Type : </b> {address.address_type}</p>
                      <p><b>City : </b> {address.city}</p>
                      <p><b>Street : </b>{address.street}</p>
                      <p><b>House No : </b> {address.house_no}</p>
                      <p><b>Pincode : </b> {address.pincode}</p>
                      <p><b>State : </b> {address.state}</p>
                      <p><b>Country : </b> {address.country}</p>
                    </div>
                  ))}
                </td>
                <td>{user.phone}</td>
                <td>
                  <p><ReactTimeAgo date={new Date(user.createdAt)} locale="en-US" /></p>
                </td>
                <td>{user.isdeleted ? 'Deleted' : 'Active'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UserDisplay
