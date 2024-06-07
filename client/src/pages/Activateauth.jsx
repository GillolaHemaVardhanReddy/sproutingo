import React, {  } from 'react'
import {useLocation,redirect} from 'react-router-dom'
import axios from 'axios'

const Activateauth = () => {
    const token = useLocation().pathname.split("/")[3]
    const activateAccount = async ()=>{
        try{
            const resp = await axios.post('/auth/activate-account',{token})
            console.log(resp.data.success)
            if(resp.data.success){
                return redirect('/')
            }
        }catch(err){
            console.log(err)
        }
    }
  return (
    <>
        <div>
            <h1>Welcome Back!</h1>    
            <h3>Ready get Started</h3>
            <button onClick={activateAccount}>Activate</button>
        </div> 
    </>
  )
}

export default Activateauth
