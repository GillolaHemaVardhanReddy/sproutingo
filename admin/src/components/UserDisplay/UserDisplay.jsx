import React from 'react'
import './UserDisplay.css'
import searchIcon from '../../assets/search_.png'

const UserDisplay = () => {
  return (
    <div className='user-display-container'>
      <div className='search'>
        <input type='text' placeholder='Search...' />
        <img src={searchIcon} alt='Search' className='search-icon'/>
      </div>
        <table className='user-display-table'>
            <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>User Since</th>
                <th>Action</th>
            </tr>
            <tr>
                <td>Username</td>
                <td>Email</td>
                <td>Address</td>
                <td>Phone</td>
                <td>User Since</td>
                <td><button className='del-btn'>Delete</button></td>
            </tr>
        </table>
    </div>
  )
}

export default UserDisplay