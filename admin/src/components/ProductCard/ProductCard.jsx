import React from 'react'
import './ProductCard.css'
import { useState } from 'react';
import axios from 'axios';
import { uploadFile } from '../../helper/uploadFile';

const ProductCard = ({ name, desc, disc, price, cat, dis_price, tags, image, avail, id, refresh, isdeleted }) => {
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
      thumb_img: image ,
      isdeleted : isdeleted
    });
  
    const handleChange = async (e) => {
      const { name, value, type, files } = e.target;
        if (type === 'file' && files.length > 0) {
          const uploadPhoto = await uploadFile(files[0]);
          console.log(uploadPhoto.url);
          setProduct(prev => ({
            ...prev,
            thumb_img: uploadPhoto?.url
          }));
      }else if(name==='tags'){
        setProduct(prev => ({ ...prev, [name]: value.split(',') }));
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
          refresh();
        } catch (err) {
          console.log(err.message);
        }
      }
    };
  
    const handleDelete = async (e) => {
      try {
        const userConfirmed = window.confirm(`Are you sure you want to ${e.target.innerHTML} ${product.name}?`);
        if(e.target.innerHTML === 'Recover'){
          if (userConfirmed) {
            const resp = await axios.get(`/product/${id}`)
            if(resp.data.success){
              refresh();
            }
          }
        }else{
          if (userConfirmed) {
            const resp = await axios.delete(`/product/${id}`);
            if (resp.data.success) {
              refresh();
            }
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    };
  
    return (
      <tr className='individual-product'>
        <td>{edit ?<input type='file' name='thumb_img' onChange={handleChange} /> : <img src={product.thumb_img} alt='Product' className='product-image' />}</td>
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
          <button className='delete-btn' onClick={handleDelete}>{
            product.isdeleted ? 'Recover' : 'Delete'  
          }</button>
        </td>
      </tr>
    );
  };

export default ProductCard