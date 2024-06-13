import React from 'react'
import './AnalyticsNavbar.css'
import { Link } from 'react-router-dom'

const AnalyticsNavBar = () => {
  return (
    <div className='analytics-nav-bar-container'>
      <Link to='products' className='product-analytics-btn'><p>Products</p></Link>
      <Link to='users' className='product-analytics-btn'><p>Users</p></Link>
      <Link to='orders' className='product-analytics-btn'><p>Orders</p></Link>
    </div>
  )
}

export default AnalyticsNavBar