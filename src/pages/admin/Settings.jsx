import React, { useContext, useEffect } from 'react'
import AdminTemplate from '../../components/admin/AdminTemplate'
import Button from '../../components/Button'
import { changeUser, fetchData } from '../../crud'
import { Context } from '../../context/CeramicContext'

const Settings = () => {
  const [admin,SetAdmin] = React.useState({})
  const [code,SetCode] = React.useState({})
  const [user,SetUser] = React.useState({})
  const [show,SetShow] = React.useState(false)
  const {api} = useContext(Context)
  useEffect(() => {
    document.title = 'Settings | Admin Dashboard'
    // Fetch settings data if needed
    fetchData(`${api}api/getCode`,SetUser,"single")
  },[])

  const handleChange = (e) => {
    e.preventDefault()
    const retVal = changeUser(`${api}api/adminChange`,admin)
  }
  const handleChange2 = (e) => {
    e.preventDefault()
    const retVal = changeUser(`${api}api/adminChange`,code)
  }
  return (
    <AdminTemplate>
      <div className='flex flex-col gap-5 overflow-y-auto w-full p-4'>
    <div  className='flex flex-col gap-5 w-full p-4'>
        <h1 className='text-2xl font-semibold text-left'>Change Admin Logins</h1>
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-4 items-baseline'>
          <label className='text-gray-700 text-sm font-bold mb-2'>username</label>
          <input type="email" className='border border-gray-300 rounded-md p-2 w-full' placeholder='Enter new email' onChange={(e)=>{SetAdmin({...admin,user:e.target.value})}} />
        </div>
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-4 items-baseline'>
          <label className='text-gray-700 text-sm font-bold mb-2'>password</label>
          <div className='flex flex-row border border-gray-300 rounded-md p-2 w-full'><input className='flex-1'  type={show?"text":"password"}  placeholder='Enter new email' onChange={(e)=>{SetAdmin({...admin,password:e.target.value})}} /><div className='w-fit'><span className='p-3 cursor-pointer' onClick={()=>{SetShow(!show)}}>{show?"hide":"show"}</span></div></div>
        </div>
        <Button text="Change Admin Logins" perform={handleChange}/>
    </div>
    <div className='flex flex-col gap-5 w-full p-4'>
        <h1 className='text-2xl font-semibold text-left'>Change Code for submitting form</h1>
        <div className='flex flex-row gap-2'><label>Current Code:</label><span>{user.code}</span></div>
        <div className='flex flex-col gap-1  items-baseline'>
          <label className='text-gray-700 text-xl font-bold mb-2'>New Code</label>
          <input type="text" className='border border-gray-300 rounded-md p-2 w-full' placeholder='Enter new code' onChange={(e)=>{SetCode({...code,code:e.target.value})}} />
        </div>
        <Button text="Change Code" perform={handleChange2} />
    
    </div>
    </div>

    </AdminTemplate>
  )
}

export default Settings