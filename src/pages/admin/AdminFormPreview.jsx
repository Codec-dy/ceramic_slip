import React, { useContext, useEffect, useState } from 'react'
import { Edit, fetchData } from '../../crud'
import TwoFields from '../../components/admin/TwoFields'
import Table from '../../components/admin/Table'
import Button from '../../components/Button'
import AdminTemplate from '../../components/admin/AdminTemplate'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../context/CeramicContext'
import Email from '../../components/admin/Email'


const AdminFormPreview = () => {
    const [form,Setform] = useState({})
    const [adminDate,SetAdminDate] = useState({})
    const nav = useNavigate();
    const { id } = useParams();
    const {api } = useContext(Context)
    useEffect(() => {
        document.title = 'Admin Dashboard | Ceramic Slips'
        if(id){
        fetchData(api+"api/getFormData?id="+id,Setform)
        }
    },[])
    useEffect(() => {
        SetAdminDate({dateContacted:form.dateContacted})
    },[form])
    const handleEdit = async (e) => {
        e.preventDefault()
        const retVal = await Edit(api+"api/edit?id="+id,adminDate)
    }
    const handleClick = () => {
        nav('/admin/dashboard/slips')
    }
    
    return (
        
        <div className='flex flex-col bg-gray-100 p-3 gap-4  w-full overflow-y-auto'>
            <h1 onClick={handleClick} className='text-red-600 font-extrabold text-3xl cursor-pointer'>X</h1>
        <div className='flex flex-col items-center bg-gray-100 p-3 gap-7 max-w-[640px] w-full'>
            <h1 className="text-3xl sm:text-6xl givColor font-bold underline">ArtHaus Ceramic Slip</h1>
            <div className='w-full'>
                <TwoFields Label1="Full Name" Label2="Date" type1="text" type2="date" placeholder1="Enter your full name" name1="name" name2="date" placeholder2="Enter Date" value1={form.name} value2={form.date}/>
                <TwoFields Label2="Email" Label1="Phone" type2="email" type1="Enter phone number" placeholder2="Enter Your Email" name1="phone" name2="email" placeholder1="Enter Your Phone Number"  value1={form.phone} value2={form.email}/>
                <TwoFields Label1="Address" type1="text" name1="address"  placeholder1="Enter your address"  value1={form.address} />
                 <div className="mb-4 w-full flex gap-5 flex-row items-center content-center">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Need Shipping
                    </label>
                    <div className='flex flex-row gap-2'>
                        <input type="radio" className="scale-150" name='shipping' value="yes" checked={form.shipping === 'yes'} disabled/>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Yes
                        </label>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <input type="radio" className="scale-150" name='shipping' value="no" checked={form.shipping === 'no'} disabled/>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            No
                        </label>
                    </div>
                </div>
                
                <Table imageDetails={form.imageDetails} totalCost={form.totalCost}/>
                <div className='flex justify-center items-center my-3'>
                    <span className='flex-1 border border-gray-400 h-[1px]'></span>
                    <span className='flex-1 text-center max-w-[100px]'>Staff Use Only</span>
                    <span className='flex-1 border border-gray-400 h-[1px]'></span>
                </div>
                <div>
                    <Email onSubmit={(emailData) => console.log(emailData)} to={form.email} />
                </div>
                <div className='flex justify-baseline items-baseline sm:gap-7'>
                    <label className='w-fit font-semibold'>Date Contacted</label>
                    <input type="date" className='border border-gray-400 p-2  border-t-0 border-x-0' name='dateContacted' onChange={(e)=>SetAdminDate({dateContacted:e.target.value})} value={adminDate.dateContacted}/>
                </div>
                <div className='w-full mt-6'><Button text="Submit" perform={handleEdit}/></div>
            </div>
        </div>
        </div>
   
      )
    
}

export default AdminFormPreview