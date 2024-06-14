import React, { useState, useEffect } from 'react'
import './UserDisplay.css'
import { useDispatch, useSelector } from 'react-redux'
import searchIcon from '../../assets/search_icon.png'
import axios from 'axios'
import ReactTimeAgo from 'react-time-ago';
import { fetchUserDetail } from '../../redux/features/user.slice';

const UserDisplay = () => {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('latest');

  const fetchUsers = async () => {
    try {
      const resp = await axios.get('/user/all');
      setUsers(resp.data.data);
    } catch (err) {
      console.log('Error fetching users', err)
    }
  };

const userDetails = useSelector(state=>state.user.userDetails)
console.log(userDetails)

  useEffect(() => {
    fetchUsers();
    dispatch(fetchUserDetail())
  }, [dispatch]);


  const handleSearchInputChange = (e) => {
    const q = e.target.value.toLowerCase()
    console.log(q)
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortOrder === 'latest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });


  const filteredUsers = ()=>{
    let query = searchQuery;
    if(searchQuery==='active'){
      query = false
    }else if(searchQuery==='deleted' || searchQuery==='delete'){
        query = true
    }
    return sortedUsers.filter(user => 
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      (typeof user.phone === 'number' && user.phone.toString().includes(query)) ||
      user.address.some(address =>
        Object.values(address).some(value =>
          String(value).toLowerCase().includes(query)
        )
      ) ||
      user.isdeleted === query
    );
  }

  return (
    <div className='user-display-container'>
      <div className='search'>
        <input
          type='text'
          placeholder='Search...'
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <img src={searchIcon} alt='Search' className='search-icon' />
      </div>
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
          {filteredUsers().map(user => {
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
