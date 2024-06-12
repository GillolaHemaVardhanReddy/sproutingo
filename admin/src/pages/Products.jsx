import React from 'react'
import './css/Products.css'
import ProductDisplay from '../components/ProductDisplay/ProductDisplay'
// import { useLoaderData } from 'react-router-dom'

const Products = () => {
  // const data = useLoaderData()
  return (
    <div className='products-container'>
      <ProductDisplay/>
    </div>
  )
}

export default Products
