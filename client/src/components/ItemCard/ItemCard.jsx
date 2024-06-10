import React, { useRef } from 'react'
import './ItemCard.css'
import veg_image from '../../Assets/veg_icon.png'
import sample_item from '../../Assets/sample_item.jpg'

const ItemCard = () => {
  const referReadMore = useRef()
  const handleReadMore = ()=> referReadMore.current.classList.toggle('read-more-text')
  return (
    <div className='card-holder'>
      <div className='card-left'>
        <div className='card-category-holder'>
          <img src={veg_image} alt=''/>
        </div>
        <h3>
          Bread Omlette
        </h3>
        <p className='card-price'>₹150</p>
          <div className='read-more-container'>
            <p className='card-detail-text'>
              Cal-420.20,Fats-24.50,Carbs-29.13,Protein-21.82
              [Brown 
              <span ref={referReadMore} className='read-more-text'>
                Bread] Omelette wrapped around Whole Wheat 
                brown bread and stuffed with cheese
              </span>
            </p>
            <span className='read-more-btn' onClick={handleReadMore}>...more</span>
          </div>
      </div>
      <div className='card-right'>
        <img src={sample_item} alt=''/>
        <p className='card-add-button'>Add</p>
        <p className='card-customizable'>customizable</p>
      </div>
    </div>
  )
}

export default ItemCard
