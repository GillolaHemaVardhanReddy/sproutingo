import React, { useState } from 'react'
import './CreateProduct.css'
import axios from 'axios'


const CreateProduct = () => {

    const [formData, setFormData] = useState({
      name: '',
      available: true,
      price: '',
      discount: '',
      thumb_img: null,
      desc: '',
      category: 'dryfruits',
      tags: ''
    });

    const handleChange = (e) =>{
        const { name, value, type, files } = e.target;
        if (type === 'file') {
          setFormData({ ...formData, [name]: files[0] });
        } else {
          setFormData({ ...formData, [name]: value });
        }
    }

    const handleSubmit = async (e) =>{
      try{
        e.preventDefault();
        const resp = await axios.post('/product/',formData,{
          withCredentials:true
        })
        console.log(resp)
      }catch(err){
        console.log(err.message)
      }
    }
  return (
    
   
    <div className='product-create-container'>
        <form className='product-create-form' onSubmit={handleSubmit}>
            <div>
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' placeholder='Name of the product' required onChange={handleChange}/>
            </div>   
            <div>
                <label htmlFor='available'>Availability</label>
                <select name='available' onChange={handleChange}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
            </div>
            <div>
                <label htmlFor='price'>Price</label>
                <input type='number' name='price' placeholder='Price of product' required onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor='discount'>Discount</label>
                <input type='number' name='discount' placeholder='Discount between 0-100' required onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor='thumb_img'>Image</label>
                <input type='file' name='thumb_img' onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor='desc'>Description</label>
                <textarea name='desc' placeholder='Description of 10-150 char' required onChange={handleChange} cols='72' rows='5'></textarea>

            </div>
            <div>
                <label htmlFor='category'>Type</label>
                <select name='category' required onChange={handleChange}>
                    <option value='dryfruits'>Dryfruits</option>
                    <option value='sproutes'>Sproutes</option>
                </select>
            </div>
            <div>
                <label htmlFor='category'>Tags</label>
                <input name='tags' type='text' placeholder='Separate tags by commas' onChange={handleChange} required/>
            </div>
            <div>
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default CreateProduct
