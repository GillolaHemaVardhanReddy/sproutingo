import React from 'react'
import {Outlet} from 'react-router-dom'

const UserLayout = () => {
  return (
    <div className='users-container'>
        <Outlet />
    </div>
  )
}

export default UserLayout