import React, { useContext, useState } from 'react'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../crud';
import { Context } from '../../context/CeramicContext';
import { toast } from 'react-toastify';

const Admin = () => {
    const [loginDetails, setLoginDetails] = useState({});
    const {api} = useContext(Context)
    const navigate = useNavigate();
    const login = async(event) => {
        event.preventDefault()
        try{
          const retVal = await adminLogin(api+"api/admin-login",loginDetails)  
          console.log(retVal)
          if (retVal){
            sessionStorage.setItem('adminToken', true)
            navigate('/admin/dashboard')
            toast.success("Login Successful")
          } else{
            toast.error("Invalid Credentials")
          }
          
       }catch(err){
           console.log(err)
           }
       }
    
  return (
    <div className='p-4'>
        <div className='flex flex-col gap-4 p-4 w-screen sm:max-w-[520px]  mx-auto mt-20'>
        <h1 className='text-2xl font-semibold text-left'>Admin Login</h1>
        <input onChange={(e)=>setLoginDetails({...loginDetails, username:e.target.value})} placeholder="Username" type='text' className='w-full border border-gray-300 p-2'/>
        <input onChange={(e)=>setLoginDetails({...loginDetails, password: e.target.value})} placeholder="Password" type='password' className='w-full border border-gray-300 p-2'/>
        <Button text='Login' perform={login}/>
        </div>
    </div>
  )
}

export default Admin