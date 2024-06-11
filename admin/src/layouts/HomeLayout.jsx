import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'
import './css/HomeLayout.css'

const HomeLayout = () => {
  return (
    <div className='home-container'>
      <Sidebar/>
      <Outlet/> 
    </div>
  )
}

export default HomeLayout
