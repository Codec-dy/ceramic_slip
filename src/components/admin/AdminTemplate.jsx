import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { assets } from '../../assets/assets'

const AdminTemplate = (props) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const handleMenuClick = () => {
    if(menuOpen){
      setMenuOpen(false)
      
    }else{
      setMenuOpen(true)
    }
  }
  return (
    <div className=''>
      <img onClick={handleMenuClick} src={assets.menu} className='w-[30px] m-3 sm:hidden'/>
    <div className='flex flex-row gap-3 w-screen h-screen overflow-hidden bg-gray-100'>
        <Sidebar toggle={menuOpen}/>
        <div className='overflow-y-scroll w-full'>{props.children}</div>
        
    </div>
    </div>
  )
}

export default AdminTemplate