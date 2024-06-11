import React, { useEffect, useState } from 'react'
import './ProductDisplay.css'
import card_image from '../../assets/sample_item.jpg'
import axios from 'axios'


const ProductCard = ({name,desc,disc,price,cat,tags,image,avail})=>{
  return (
    <tr>
      <td><img src={image} alt='Product' className='product-image' /></td>
      <td>{name}</td>
      <td>{desc}</td>
      <td>{avail?"yes":"No"}</td>
      <td>{disc}%</td>
      <td>Rs. {price}</td>
      <td>{cat}</td>
      <td>{tags}</td>
      <td>
        <button className='edit-btn'>Edit</button>
        <button className='delete-btn'>Delete</button>
      </td>
    </tr>
  )
}

const ProductHead = ()=>{
  return (
    <tr>
      <th>Image</th>
      <th>Name</th>
      <th>Description</th>
      <th>Available</th>
      <th>Discount</th>
      <th>Price</th>
      <th>Category</th>
      <th>Tags</th>
      <th>Actions</th>
    </tr>
  )
}
const ProductDisplay = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async ()=>{
      const resp = await axios.get('/product/')
      setProducts(resp.data.data)
    }
    fetchData()
  }, []);
console.log(products)
  return (
    <div className='product-card'>
        <table className='product-table'>
            <thead>
              <ProductHead/>
            </thead>
            <tbody>
                {
                  products.map(item => ( <ProductCard
                      key={item._id}
                      avail={item.available}
                      name={item.name}
                      desc={item.description}
                      disc={item.discount}
                      price={item.price}
                      cat={item.category}
                      tags={item.tags}
                      image={card_image}
                    />
                  ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default ProductDisplay