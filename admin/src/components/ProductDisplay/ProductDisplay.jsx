import { useEffect, useState } from 'react';
import './ProductDisplay.css';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';


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
                tags={item.tags.join()}
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