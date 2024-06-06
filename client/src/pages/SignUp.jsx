import React, { useState } from 'react'
import axios from 'axios'

const SignUp = () => {
  const [userDetails,setUserDetails] = useState({})
  const handleChange = (e)=>{
    setUserDetails(prev=>{
      return{...prev,[e.target.name]:e.target.value}
      })
    }
    const submitForm = async (e)=>{
      e.preventDefault()
      const resp = await axios.post('/auth/signup',userDetails)
      
    }

  return (
    <>
      <form onSubmit={submitForm}>
        <input type='text' required name='name' onChange={handleChange}/>
        <input type='email' required name='email' onChange={handleChange}/>
        <input type='password' required name='password' onChange={handleChange}/>
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default SignUp
