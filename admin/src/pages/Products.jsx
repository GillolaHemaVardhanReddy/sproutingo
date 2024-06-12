import React from 'react'
import './css/Products.css'
import ProductDisplay from '../components/ProductDisplay/ProductDisplay'
import SearchBar from '../components/SearchBar/SearchBar'
// import { useLoaderData } from 'react-router-dom'

const Products = () => {
  // const data = useLoaderData()
  return (
    <div className='products-container'>
      <SearchBar/>
      <ProductDisplay/>
    </div>
  )
}

export default Products
