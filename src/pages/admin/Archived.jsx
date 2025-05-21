import React, { useContext, useEffect, useState } from 'react'
import AdminTemplate from '../../components/admin/AdminTemplate'
import { Context } from '../../context/CeramicContext'
import { fetchData, sortSlips } from '../../crud'
import SlipsWidget from '../../components/admin/SlipsWidget'
import AdminEditDelete from '../../components/admin/AdminEditDelete'
import { assets } from '../../assets/assets'


const Archived = () => {
   const [sortType, setSortType] = useState('date')
   const [from,setFrom] = useState('hl')
    const {api,setSlips,slips} = useContext(Context)
    const [filter,setFilter] = useState([])
    
    
  useEffect(() => {
    document.title = 'Ceramic Slips | Admin Dashboard'
    fetchData(api+"api/getFormData",setSlips,"completed")
},[])
  

  useEffect(() => {
    sortSlips(slips,setFilter,from,sortType)
    console.log("here1")
  },[slips,sortType,from])


  return (
    <AdminTemplate>
    <div  className='flex flex-col gap-3 overflow-y-auto w-full p-4'>
       <div className='flex flex-row justify-between items-center'> 
        <h1 className='text-2xl font-semibold text-left'>Archived Slips</h1> 
        <div className='flex flex-row gap-2'>
          <select value={sortType} onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300  text-sm p-4'>
              <option value="none">Sort by: None</option>
              <option value="name">Sort by: Name</option>
              <option value="date">Sort by: Date</option>
              <option value="price">Sort by: Price</option>
            </select>
            <select value={from} onChange={(e)=>setFrom(e.target.value)} className='border-2 border-gray-300  text-sm p-4'>
              <option value="lh">Ascending</option>
              <option value="hl">Descending</option>
              
            </select>
        </div>
       </div>
        {filter.length==0 && <div className='flex flex-col sm:justify-center items-center h-full w-full'>
          <img src={assets.placeholder}/>
          <p className='text-gray-500 text-3xl'>No Forms to display</p>
          </div>}
        {filter.length>0 && filter.map((slip, index) => <div key={index} ><SlipsWidget data={slip} /></div>)}
    </div>
    </AdminTemplate>
  )
}

export default Archived