import React, { useContext, useEffect, useState } from 'react'
import TwoFields from '../components/TwoFields'
import { assets } from '../assets/assets'
import { Context } from '../context/CeramicContext'
import Button from '../components/Button'
import Table from '../components/Table'
import axios from 'axios'
import { submit } from '../crud'
import { s } from 'framer-motion/client'

const Form = () => {

    const {shippingCost,setUploadedFiles,setCost,uploadedFiles,setUser,user,api,Cost} = useContext(Context)
    const [loading, setLoading] = useState(false)
    const handleFileUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
            setUploadedFiles((prevFiles) => [...prevFiles, {file: file, Initials:'', Cost:''}])
        }
    }

    const handleDelete = (index) => {
        setUploadedFiles((prevFiles) =>{ 
            const newFiles = prevFiles.filter((_, i) => i !== index)
            const totalCost = newFiles.reduce((acc, file) => acc + parseFloat(file.Cost || 0), 0);
            setCost(totalCost);
            return newFiles
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()      
        user.totalCost = Cost
        console.log(user)
        try{
       const retVal = await submit(api+"api/formUpload",user,uploadedFiles,setLoading)       

       if(retVal){
        setUser({name:'',email:'',phone:'',address:'',shipping:'',shippingCost:0,date:user.date, totalCost:0,Code:''})
        setUploadedFiles([])
        setCost(0)
        setLoading(false)
       }else{
        setLoading(false)
       }
    }catch(err){
        console.log(err)
        setLoading(false)
        }
    }


    useEffect(() => {
        document.title = 'ArtHaus Ceramic Slip'
        // Fetch settings data if needed
       
    },[])
  return (
    <div className='flex flex-col bg-gray-100 p-3 gap-4  w-full'>
     <div className='flex flex-col items-center bg-gray-100 p-3 gap-7 max-w-[640px] w-full min-h-screen'>
        <h1 className="text-3xl sm:text-6xl givColor font-bold underline">ArtHaus Ceramic Slip</h1>
        <form>
        {loading && 
          
             <div className="loader "></div> 
           
            }
        {!loading && ( <> <TwoFields Label1="Full Name" Label2="Date" type1="text" type2="date" placeholder1="Enter your full name" name1="name" name2="date" placeholder2="Enter Date"/>
            <TwoFields Label2="Email" Label1="Phone" type2="email" type1="Enter phone number" placeholder2="Enter Your Email" name1="phone" name2="email" placeholder1="Enter Your Phone Number"/>
            <TwoFields Label1="Address" type1="text" name1="address"  placeholder1="Enter your address" />
            <div className="mb-4 w-full flex gap-5 flex-row items-start content-center">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Need Shipping ({shippingCost} a box)
                </label>
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-row gap-2'>
                        <input type="radio" className="scale-150" name='shipping' onChange={()=>setUser({...user,shipping:'yes'})} value="yes" checked={user.shipping === 'yes'} required/>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Yes
                        </label>
                    </div>
                    {user.shipping === 'yes' && <div className='flex flex-row gap-2'>
                        <input
                            type="number"
                            min="0"
                            placeholder="Enter number"
                            className="shadow appearance-none border rounded w-[140px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={user.boxs || ''} // Controlled input
                            onChange={(e) => {
                                const numberOfBoxes = Number(e.target.value);
                                const shippingCostPerBox = Number(shippingCost.slice(1)); // Remove the "$" sign and convert to number
                                const shippingTotal = numberOfBoxes * shippingCostPerBox;
                                const newTotalCost = shippingTotal + (Cost - user.shippingCost || 0); // Adjust total cost
                                setCost(newTotalCost);
                                setUser({ ...user, shippingCost: shippingTotal, boxs: numberOfBoxes }); // Save shipping cost and box count in user state
                            }}
                        />
                        </div>}
                </div>
                <div className='flex flex-row gap-2'>
                    <input type="radio" className="scale-150" name='shipping' value="no" onChange={()=>{setCost(Cost-user.shippingCost);setUser({...user,shipping:'no',shippingCost:0,boxs:0})}} checked={user.shipping === 'no'} required/>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        No
                    </label>
                </div>
            </div>

            <label htmlFor="file-upload" className='flex flex-row gap-5 mb-4 w-full border-2 border-gray-300 rounded-md p-2 items-center'>
            <img src={assets.uploadIcon} alt="Upload Icon" className='w-20 h-20' />
            <div>
                <label htmlFor="file-upload" className='text-sm font-bold text-black'>Take/upload a picture of your work on the table</label>
                <p className='text-xs text-gray-400'>Pictures will be inserted in the table below. Make sure to enter your initials and price of each work</p>
            </div>
            <input type='file' onChange={handleFileUpload} id='file-upload' className='w-full h-10 givColor hidden' placeholder='Upload a picture of your work' required/>
            </label>
            <h3 className='givColor'>Please leave your work on the table. Thank you</h3><br/>
            <h3 className='font-bold givColor'>Ceramics are considered abandoned if not picked up 30 days after being contacted</h3>
            
            <Table onDelete={handleDelete}/>
            <div className=' mt-6 max-w-[300px]'><TwoFields Label1="Code" type1="text" name1="Code"  placeholder1="Enter code to submit" /></div>
            <div className='w-full'><Button text="Submit" perform={handleSubmit}/></div>
        </>
        )}    
        </form>
    </div>
    </div>
  )
}

export default Form