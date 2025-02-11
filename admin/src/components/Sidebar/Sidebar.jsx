import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='side-bar-container'>
      <Link to='products' className='side-bar-link'><p>Products</p></Link>
      <Link to='users' className='side-bar-link'><p>Users</p></Link>
      <Link to='orders' className='side-bar-link'><p>Orders</p></Link>
      <Link to='complaints' className='side-bar-link'><p>Complaints</p></Link>
      <Link to='analytics' className='side-bar-link'><p>Analytics</p></Link>
      <Link to='newfeatures' className='side-bar-link'><p>New Feature</p></Link>
    </div>
  )
}

export default Sidebar
