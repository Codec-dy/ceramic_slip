import React from 'react'
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
        <img src={data.data.imageDetails[0].file_url} alt="slip" className='w-full h-64 min-w-[100px] max-w-[200px] object-contain rounded-md mb-4' />
        </div>
        <div>
            <h1 className='text-xl font-semibold mb-2'>{data.data.name}</h1>
            <div className='flex flex-row gap-2'>
                <p className='font-semibold'>Date:</p>
                <p style={{"overflowWrap":"anywhere"}}>{data.data.date}</p>
            </div>
            <div className='flex flex-row gap-2'>
                <p className='font-semibold'>Email:</p>
                <p style={{"overflowWrap":"anywhere"}}>{data.data.email}</p>
            </div>
            <div className='flex flex-row gap-2'>
                <p className='font-semibold'>Phone:</p>
                <p style={{"overflowWrap":"anywhere"}}>{data.data.phone}</p>
            </div>
            {data.data.shipping=="yes" && <div className='flex flex-row gap-2'>
                <p className='font-semibold'>Shipping Cost:</p>
                <p style={{"overflowWrap":"anywhere"}}>${data.data.shippingCost}</p>
            </div>}
            <div className='flex flex-row gap-2'>
                <p className='font-semibold'>Total Cost:</p>
                <p style={{"overflowWrap":"anywhere"}}>${data.data.totalCost}</p>
            </div>
            {data.data.dateContacted && <div className='flex flex-row gap-2'>
                <p className='font-semibold'>Date Contacted:</p>
                <p style={{"overflowWrap":"anywhere"}}>{data.data.dateContacted}</p>
            </div>}
        </div>
        </div>
    </div>
  )
}

export default SlipsWidget