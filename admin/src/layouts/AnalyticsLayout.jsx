import React from 'react'
import './css/AnalyticsLayout.css'
import AnalyticsNavBar from '../components/AnalyticsNavBar/AnalyticsNavBar'
import { Outlet } from 'react-router-dom'

const AnalyticsLayout = () => {
  return (
    <div className='analytics-layout-container'>
      <AnalyticsNavBar/>
      <Outlet/>
    </div>
  )
}

export default AnalyticsLayout
