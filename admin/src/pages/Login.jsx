import React, { useEffect, useState } from 'react';
import './css/Login.css';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { fetchUser } from '../redux/features/auth.slice'
import { SetError } from '../components/ErrorMessage/ErrorMessage';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  let error = ''

  const handleEmailChange = (e) => { 
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (error.length > 0) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer); 
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      error = 'Please enter both email and password.';
    } else {
      dispatch(fetchUser({email,password}))
    }
  };



  return (
    <div className="login-container">
      <h2>Login</h2>
      <SetError vanish={isVisible} error={error} />
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;