import React from 'react'
import AdminEditDelete from './AdminEditDelete'
import { useNavigate } from 'react-router-dom'

const SlipsWidget = (data) => {
    const nav = useNavigate()
    const handleClick = () => {
        nav('/admin/dashboard/slips/preview/'+data.data._id)
    }
  return (
    <div onClick={handleClick} className='flex flex-col cursor-pointer'>
    <div className='flex flex-row gap-4 bg-white shadow-md border-gray-400 rounded-sm p-4 mb-1'>
        <div className=' max-w-[300px]'>
        <img src={data.data.imageDetails[0].file_url} alt="slip" className='w-full h-64 object-contain rounded-md mb-4' />
        </div>
        <div>
            <h1 className='text-xl font-semibold mb-2'>{data.data.name}</h1>
            <div className='flex flex-row gap-2'>
                <p className='font-semibold'>Date:</p>
                <p>{data.data.date}</p>
            </div>
            <div className='flex flex-row gap-2'>
                <p className='font-semibold'>Email:</p>
                <p>{data.data.email}</p>
            </div>
            <div className='flex flex-row gap-2'>
                <p className='font-semibold'>Phone:</p>
                <p>{data.data.phone}</p>
            </div>
            <div className='flex flex-row gap-2'>
                <p className='font-semibold'>Total Cost:</p>
                <p>${data.data.totalCost}</p>
            </div>
            {data.data.dateContacted && <div className='flex flex-row gap-2'>
                <p className='font-semibold'>Date Contacted:</p>
                <p>{data.data.dateContacted}</p>
            </div>}
        </div>
        </div>
    </div>
  )
}

export default SlipsWidget