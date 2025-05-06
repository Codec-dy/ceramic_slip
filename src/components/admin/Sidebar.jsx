import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'


const Sidebar = ({toggle}) => {
  const nav = useNavigate()
  const [left,setLeft] = useState('-left-80')
  useEffect(() => {
    if(toggle){
      setLeft('left-0')
    }else{
      setLeft('-left-1000')
    }
  },[toggle])
  
  return (
    <div className={'fixed sm:relative flex flex-col gap-4 min-w-[300px] bg-gray-800 text-white p-4 h-screen w-3/4 sm:left-0 sm:w-1/4 '+left}>
        <h1 onClick={()=>{nav('/admin/dashboard/')}} className='text-2xl font-semibold text-left cursor-pointer'>Admin Dashboard</h1>
        <div className='flex flex-col gap-4'>
            <Link to={'/admin/dashboard/slips'} className='text-lg font-semibold'>Ceramic Slips</Link>
            <Link to={'/admin/dashboard/settings'} className='text-lg font-semibold'>Settings</Link>
            <div><Link onClick={()=>{sessionStorage.setItem("adminToken",false) }} to={'/admin/wp-admin'} className='text-lg font-semibold'>Logout</Link></div>
        </div>

    </div>
  )
}

export default Sidebar