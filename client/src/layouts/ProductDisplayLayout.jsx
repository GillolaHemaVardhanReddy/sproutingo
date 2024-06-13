import React from 'react'
import './css/ProductDisplayLayout.css'
import OrderMenu from '../components/OrderMenu/OrderMenu'
import { Outlet } from 'react-router-dom'

const ProductDisplayLayout = () => {
  return (
    <div className='product-page-layout'>
      <OrderMenu/>
      <Outlet/>
    </div>
  )
}

export default ProductDisplayLayout
