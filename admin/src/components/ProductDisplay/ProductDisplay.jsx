import React, { useEffect, useState } from 'react';
import './ProductDisplay.css';
import card_image from '../../assets/sample_item.jpg';
import axios from 'axios';

const ProductCard = ({ name, desc, disc, price, cat, tags, image, avail, id }) => {
  const [edit, setEdit] = useState(false);
  const [product, setProduct] = useState({
    name: name || '',
    desc: desc || '',
    discount: disc || 0,
    price: price || 0,
    category: cat || '',
    tags: tags || '',
    available: avail || false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = async (e) => {
    setEdit((prev) => !prev);
    if (e.target.innerHTML === 'Submit') {
      try{
        const resp = await axios.put(`/product/${id}`, product);
        console.log(resp)
      }catch(err){
        console.log(err.message)
      }
    }
  };

  return (
    <tr className='individual-product'>
      <td><img src={image} alt='Product' className='product-image' /></td>
      <td>{edit ? <input type='text' value={product.name} name='name' onChange={handleChange} /> : product.name}</td>
      <td>{edit ? <input type='text' value={product.desc} name='desc' onChange={handleChange} /> : product.desc}</td>
      <td>{edit
        ? <select value={product.available} onChange={handleChange} name='available'>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select> 
        : product.available ? "Yes" : "No"}
      </td>
      <td>{edit ? <input type='number' value={product.discount} name='discount' onChange={handleChange} /> : product.discount ? `${product.discount}%` : ''}</td>
      <td>Rs. {edit ? <input type='number' value={product.price} name='price' onChange={handleChange} /> : product.price}</td>
      <td>{edit ? <input type='text' value={product.category} name='category' onChange={handleChange} /> : product.category}</td>
      <td>{edit ? <input type='text' value={product.tags} name='tags' onChange={handleChange} /> : product.tags}</td>
      <td className='product-btn'>
        <button className='edit-btn' onClick={handleEdit}>{edit ? 'Submit' : 'Edit'}</button>
        <button className='delete-btn'>Delete</button>
      </td>
    </tr>
  );
};

const ProductHead = () => {
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
  );
};

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get('/product/');
      setProducts(resp.data.data);
    };
    fetchData();
  }, []);

  console.log(products);

  return (
    <div className='product-card'>
      <table className='product-table'>
        <thead>
          <ProductHead />
        </thead>
        <tbody>
          {
            products.map(item => (
              <ProductCard
                key={item._id}
                id={item._id}
                avail={item.available}
                name={item.name}
                desc={item.desc}
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
  );
};

export default ProductDisplay;