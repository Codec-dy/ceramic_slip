import React, { useContext, useEffect } from 'react'
import AdminTemplate from '../../components/admin/AdminTemplate'
import Button from '../../components/Button'
import { changeUser, fetchData } from '../../crud'
import { Context } from '../../context/CeramicContext'

const Settings = () => {
  const [admin,SetAdmin] = React.useState({})
  const {api} = useContext(Context)
  useEffect(() => {
    document.title = 'Settings | Admin Dashboard'
    // Fetch settings data if needed
  },[])

  const handleChange = (e) => {
    e.preventDefault()
    const retVal = changeUser(`${api}api/adminChange`,admin)
  }
  
  return (
    <AdminTemplate>
    <div  className='flex flex-col gap-5 overflow-y-auto w-full p-4'>
        <h1 className='text-2xl font-semibold text-left'>Change Admin Logins</h1>
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-4 items-baseline'>
          <label className='text-gray-700 text-sm font-bold mb-2'>username</label>
          <input type="email" className='border border-gray-300 rounded-md p-2 w-full' placeholder='Enter new email' onChange={(e)=>{SetAdmin({...admin,user:e.target.value})}} />
        </div>
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-4 items-baseline'>
          <label className='text-gray-700 text-sm font-bold mb-2'>password</label>
          <input type="password" className='border border-gray-300 rounded-md p-2 w-full' placeholder='Enter new email' onChange={(e)=>{SetAdmin({...admin,password:e.target.value})}} />
        </div>
        <Button text="Change" perform={handleChange}/>
    </div>
    </AdminTemplate>
  )
}

export default Settings