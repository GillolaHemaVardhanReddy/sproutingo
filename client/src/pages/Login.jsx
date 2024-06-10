import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [userDetails,setUserDetails] = useState({})
  const [disable,setDisable] = useState(false)
  const handleChange = (e)=>{
    setUserDetails(prev=>{
      return{...prev,[e.target.name]:e.target.value}
      })
    }
    const submitForm = async (e)=>{
      e.preventDefault()
      const resp = await axios.post('/auth/signin',userDetails)
      if(resp.data.success) setDisable(true)
    }
  return (
    <>
      <form onSubmit={submitForm}>
        <input type='email' required name='email' onChange={handleChange}/>
        <input type='password' required name='password' onChange={handleChange}/>
        <button type='submit' disabled={disable}>Submit</button>
      </form>
      <p>Don't have an account? <Link to='/auth/signup'>signup</Link></p>
    </>
  )
}

export default Login
