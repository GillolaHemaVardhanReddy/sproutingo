import React, { useState } from 'react';
import './css/CreateProduct.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { uploadFile } from '../helper/uploadFile';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    available: true,
    price: '',
    discount: '',
    thumb_img: '',
    dis_price: '',
    desc: '',
    category: 'dryfruits',
    tags: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files.length > 0) {
      try {
        const uploadPhoto = await uploadFile(files[0]);
        setFormData(prevFormData => ({ ...prevFormData, [name]: uploadPhoto.url }));
      } catch (error) {
        setUploadError('File upload failed. Please try again.');
      }
    } else if (name === 'tags') {
      setFormData(prev => ({ ...prev, [name]: value.split(',') }));
    } else {
      setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const discountedPrice = formData.price - (formData.price * (formData.discount / 100));
      const updatedFormData = { ...formData, dis_price: discountedPrice };
      const resp = await axios.post('/product/', updatedFormData, {
        withCredentials: true
      });
      if (resp.data.success) {
        navigate('/admin/manage/products');
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className='product-create-container'>
      <form className='product-create-form' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' placeholder='Name of the product' required onChange={handleChange} />
        </div>
        <div>
          <label htmlFor='available'>Availability</label>
          <select name='available' onChange={handleChange} value={formData.available}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div>
          <label htmlFor='price'>Price</label>
          <input type='number' name='price' placeholder='Price of product' required onChange={handleChange} />
        </div>
        <div>
          <label htmlFor='discount'>Discount</label>
          <input type='number' name='discount' placeholder='Discount between 0-100' required onChange={handleChange} />
        </div>
        <div>
          <label htmlFor='thumb_img'>Image</label>
          <input type='file' name='thumb_img' onChange={handleChange} />
          {uploadError && <p className="error">{uploadError}</p>}
        </div>
        <div>
          <label htmlFor='desc'>Description</label>
          <textarea name='desc' placeholder='Description of 10-150 char' required onChange={handleChange} cols='72' rows='5'></textarea>
        </div>
        <div>
          <label htmlFor='category'>Type</label>
          <select name='category' required onChange={handleChange} value={formData.category}>
            <option value='dryfruits'>Dryfruits</option>
            <option value='sproutes'>Sprouts</option>
          </select>
        </div>
        <div>
          <label htmlFor='tags'>Tags</label>
          <input name='tags' type='text' placeholder='Separate tags by commas' required onChange={handleChange} />
        </div>
        <div>
          <button type='submit' disabled={isSubmitting}>Submit</button>
        </div>
      </form>
      <button onClick={goBack}>Back</button>
    </div>
  );
};

export default CreateProduct;