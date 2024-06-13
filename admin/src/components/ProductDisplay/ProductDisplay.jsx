import { useEffect, useState } from 'react';
import './ProductDisplay.css';
import ProductCard from '../ProductCard/ProductCard';
import { incrementRefreshCounter } from '../../redux/features/refresh.slice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/features/product.slice';

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
  const refreshCounter = useSelector(state=>state.refresh.refreshCounter)
  const productState = useSelector(state=>state.product.products)
  const dispatch = useDispatch()
  const [products,setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchProducts())
    };
    fetchData();
  }, [refreshCounter,dispatch]);
 

  useEffect(() => {
    setProducts(productState);
  }, [productState]);

  const refreshhandle = () => {
    dispatch(incrementRefreshCounter());
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
                refresh={refreshhandle}
                isdeleted={item.isdeleted}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default ProductDisplay;