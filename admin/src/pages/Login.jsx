import React, { useEffect, useState } from 'react';
import './css/Login.css';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { fetchUser } from '../redux/features/auth.slice'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setError] = useState('');
  const { loading, error, isAuth } = useSelector((state) => state.auth);
  const handleEmailChange = (e) => { 
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
    } else {
      dispatch(fetchUser({email,password}))
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/admin/manage');
    }
    if(error){
      setError(error)
    }
  }, [isAuth, error, navigate]);


  return (
    <div className="login-container">
      <h2>Login</h2>
      {err && <p className="error">{err}</p>}
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