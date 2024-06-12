import React, { useState } from 'react';
import './css/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { loginFail, loginStart, loginSuccess } from '../redux/features/auth.slice'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      setError('');
      try {
        dispatch(loginStart())
        const resp = await axios.post('/auth/signin', { email, password });
        console.log(resp.data)
        if (resp.data.success && resp.data.data.role==='admin') {
          // localStorage.setItem('isAuth', 'true');
          dispatch(loginSuccess(resp.data.data))
          navigate('/admin/manage'); 
        } else {
          dispatch(loginFail('Only admins are allowed'))
          setError('Invalid login credentials Only admins are allowed');
        }
      } catch (err) {
        dispatch(loginFail(err.message))
        setError('Error logging in. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
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