import React from 'react'
import './CreateProduct.css'

const CreateProduct = () => {
  return (
    <div className='product-create-container'>
        <form className='product-create-form'>
            <div>
                <label htmlFor='name'>name</label>
                <input type='text' name='name' placeholder='name of the product'/>
            </div>   
            <div>
                <label htmlFor='available'>Availability</label>
                <select name='available'>
                    <option value={true}>yes</option>
                    <option value={false}>no</option>
                </select>
            </div>
            <div>
                <label htmlFor='price'>Price</label>
                <input type='number' name='price' placeholder='price of product'/>
            </div>
            <div>
                <label htmlFor='discount'>discount</label>
                <input type='number' name='discount' placeholder='discount between 0-100'/>
            </div>
            <div>
                <label htmlFor='thumb_img'>image</label>
                <input type='file' name='thumb_img'/>
            </div>
            <div>
                <label htmlFor='desc'>Description</label>
                <input type='text' name='desc' placeholder='description of 10-150 char'/>
            </div>
            <div>
                <label htmlFor='category'>Type</label>
                <select name='category'>
                    <option value='dryfruits'>Dryfruits</option>
                    <option value='sproutes'>Sproutes</option>
                </select>
            </div>
            <div>
                <label htmlFor='category'>Tags</label>
                <input name='tags' type='text' placeholder='separate tags by commas'/>
            </div>
        </form>
    </div>
  )
}

export default CreateProduct
