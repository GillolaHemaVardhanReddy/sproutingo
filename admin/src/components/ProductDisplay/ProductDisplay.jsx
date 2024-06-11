import React, { useEffect, useState } from 'react';
import './ProductDisplay.css';
import axios from 'axios';
import { uploadFile } from '../../helper/uploadFile';

const ProductCard = ({ name, desc, disc, price, cat, dis_price, tags, image, avail, id, refresh }) => {
  const [edit, setEdit] = useState(false);
  const [product, setProduct] = useState({
    name: name || '',
    desc: desc || '',
    discount: disc || 0,
    dis_price: dis_price || '',
    price: price || 0,
    category: cat || '',
    tags: tags || '',
    available: avail || false,
    image: image
  });

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files.length > 0) {
      const uploadPhoto = await uploadFile(files[0]);
      console.log(uploadPhoto.url);
      setProduct(prev => ({
        ...prev,
        image: uploadPhoto?.url
      }));
    } else {
      setProduct(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEdit = async () => {
    setEdit(prev => !prev);
    if (edit) {
      try {
        const discountedPrice = product.price - (product.price * (product.discount / 100));
        const updatedProduct = { ...product, dis_price: discountedPrice };
        const resp = await axios.put(`/product/${id}`, updatedProduct);
        console.log(resp);
        refresh(); // Call refresh to fetch updated product list
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handleDelete = async () => {
    try {
      const resp = await axios.delete(`/product/${id}`);
      if (resp.data.success) {
        refresh(); // Call refresh to fetch updated product list
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <tr className='individual-product'>
      <td>{edit ? <input type='file' name='image' onChange={handleChange} /> : <img src={product.image} alt='Product' className='product-image' />}</td>
      <td>{edit ? <input type='text' value={product.name} name='name' onChange={handleChange} /> : product.name}</td>
      <td>{edit ? <input type='text' value={product.desc} name='desc' onChange={handleChange} /> : product.desc}</td>
      <td>{edit
        ? <select value={product.available} onChange={handleChange} name='available'>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select> 
        : product.available ? "Yes" : "No"}
      </td>
      <td>{edit ? <input type='number' value={product.discount} name='discount' onChange={handleChange} /> : product.discount ? `${product.discount}%` : ''}</td>
      <td>Rs. {edit ? <input type='number' value={product.price} name='price' onChange={handleChange} /> : product.price}</td>
      <td>Rs. {edit ? product.dis_price : product.dis_price}</td>
      <td>{edit ? <input type='text' value={product.category} name='category' onChange={handleChange} /> : product.category}</td>
      <td>{edit ? <input type='text' value={product.tags} name='tags' onChange={handleChange} /> : product.tags}</td>
      <td className='product-btn'>
        <button className='edit-btn' onClick={handleEdit}>{edit ? 'Submit' : 'Edit'}</button>
        <button className='delete-btn' onClick={handleDelete}>Delete</button>
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
      <th>Discount Price</th>
      <th>Category</th>
      <th>Tags</th>
      <th>Actions</th>
    </tr>
  );
};

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchData = async () => {
    const resp = await axios.get('/product/');
    setProducts(resp.data.data);
  };

  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  const refresh = () => {
    setRefreshKey(prev => prev + 1);
  };

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
                image={item.thumb_img}
                dis_price={item.dis_price}
                refresh={refresh}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default ProductDisplay;