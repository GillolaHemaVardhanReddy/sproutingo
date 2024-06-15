import React from 'react'
import { Outlet } from 'react-router-dom'
import ComplaintDisplay from '../components/Complaints/ComplaintDisplay'
import './css/Complaints.css'

function Complaints() {
  return (
    <div className="complaints-container">
        <ComplaintDisplay />
        <Outlet />
    </div>
  )
}

export default Complaints