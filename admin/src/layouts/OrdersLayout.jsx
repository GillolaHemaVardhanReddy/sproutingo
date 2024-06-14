import React from 'react'
import { Outlet } from 'react-router-dom'
import OrderNavbar from '../components/OrderNavbar/OrderNavbar'
import "./css/OrdersLayout.css"
const OrdersLayout = () => {
  return (
    <>
    <div className='orderLayout'>
     <OrderNavbar/>
     <Outlet/>
     </div>
    </>
  )
}

export default OrdersLayout