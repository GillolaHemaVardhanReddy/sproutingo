import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const [userDetails,setUserDetails] = useState({})
  const [disable,setDisable] = useState(false)
  const handleChange = (e)=>{
    setUserDetails(prev=>{
      return{...prev,[e.target.name]:e.target.value}
      })
    }
    const submitForm = async (e)=>{
      e.preventDefault()
      const resp = await axios.post('/auth/signup',userDetails)
      if(resp.data.success) setDisable(true)
    }

  return (
    <>
      <form onSubmit={submitForm}>
        <input type='text' required name='name' onChange={handleChange}/>
        <input type='email' required name='email' onChange={handleChange}/>
        <input type='password' required name='password' onChange={handleChange}/>
        <button type='submit' disabled={disable}>Submit</button>
      </form>
      <p>have an account? <Link to='/auth/signin'>Login</Link></p>
    </>
  )
}

export default SignUp