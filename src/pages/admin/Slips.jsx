import React, { useContext, useEffect } from 'react'
import AdminTemplate from '../../components/admin/AdminTemplate'
import { Context } from '../../context/CeramicContext'
import { fetchData } from '../../crud'
import SlipsWidget from '../../components/admin/SlipsWidget'
import AdminEditDelete from '../../components/admin/AdminEditDelete'
import { assets } from '../../assets/assets'

const Slips = () => {
   
    const {api,slips,setSlips} = useContext(Context)
    
  useEffect(() => {
    document.title = 'Ceramic Slips | Admin Dashboard'
    fetchData(api+"api/getFormData",setSlips)
},[])
  console.log(slips.length)
  return (
    <AdminTemplate>
    <div  className='flex flex-col gap-3 overflow-y-auto w-full p-4'>
        <h1 className='text-2xl font-semibold text-left'>Ceramic Slips</h1>
        {slips.length==0 && <div className='flex flex-col sm:justify-center items-center h-full w-full'>
          <img src={assets.placeholder}/>
          <p className='text-gray-500 text-3xl'>No Forms to display</p>
          </div>}
        {slips.length>0 && slips.map((slip, index) => <div key={index} ><SlipsWidget data={slip} /><AdminEditDelete id={slip._id}/></div>)}
    </div>
    </AdminTemplate>
  )
}

export default Slips