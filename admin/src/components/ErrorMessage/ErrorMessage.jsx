import { useDispatch, useSelector } from 'react-redux';
import './ErrorMessage.css';
import { useEffect, useState } from 'react';
import { userErrorClear } from '../../redux/features/user.slice';
import { productClearError } from '../../redux/features/product.slice';

export const SetError = () => {
  const error1 = useSelector(state => state.product.error || '');
  const error2 = useSelector(state => state.user.error || '');
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  const error = error1.length > 0 ? error1 : error2.length > 0 ? error2 : '';

  useEffect(() => {
    if (error.length > 0) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        dispatch(userErrorClear());
        dispatch(productClearError());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  return (
    isVisible && (
      <p className={`floating-error-message ${!isVisible ? 'hidden' : ''}`}>
        {error}
      </p>
    )
  );
};
