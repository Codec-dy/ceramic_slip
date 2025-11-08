import React, { useContext } from 'react'
import TwoFields from './TwoFields';
import { Context } from '../context/CeramicContext';
import { assets } from '../assets/assets'
import Button from '../components/Button'
import Table from '../components/Table'
const FormComp = ({user,setUser,loading,handleDelete,handleSubmit,handleFileUpload,uploadedFiles,setUploadedFiles,setCost,Cost}) => {
    const {shippingCost} = useContext(Context)
    return (
    <form>
        
            <p className='text-red-700 font-bold mb-4 text-center'>Submit one(1) form per group</p>
        <> 
            <TwoFields user={user} setUser={setUser} Label1="Full Name" Label2="Date" type1="text" type2="date" placeholder1="Enter your full name" name1="name" name2="date" placeholder2="Enter Date"/>
            <TwoFields user={user} setUser={setUser} Label2="Email" Label1="Phone" type2="email" type1="Enter phone number" placeholder2="Enter Your Email" name1="phone" name2="email" placeholder1="Enter Your Phone Number"/>
            <TwoFields user={user} setUser={setUser} Label1="Street" type1="text" name1="street"  placeholder1="Enter Street" Label2={"City"} name2={"city"} placeholder2={"Enty City"}/>
            <TwoFields user={user} setUser={setUser} Label1="State" type1="text" name1="state"  placeholder1="Enter State" Label2="Zip code" type2="text" name2="zipCode" placeholder2="Enter zip code" />
            <div className="mb-4 w-full flex gap-5 flex-row items-start content-center">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Need Shipping ({shippingCost} a box)
                </label>
                <div className='flex flex-col gap-2 relative'>
                    <div className='flex flex-row gap-2'>
                        <input type="radio" className="scale-150" name='shipping' onChange={()=>setUser({...user,shipping:'yes'})} value="yes" checked={user.shipping === 'yes'} required/>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Yes
                        </label>
                    </div>
                    
                </div>
                <div className='flex flex-row gap-2'>
                    <input type="radio" className="scale-150" name='shipping' value="no" onChange={()=>{setCost(Cost-user.shippingCost);setUser({...user,shipping:'no',shippingCost:0,boxs:0})}} checked={user.shipping === 'no'} required/>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        No
                    </label>
                </div>
            </div>
            {user.shipping === 'yes' && <div className='flex flex-row gap-2 items-center relative mb-5'>
                        <label>Enter number of boxes</label><input
                            type="number"
                            min="0"
                            placeholder="Enter number of boxes"
                            className="shadow appearance-none border rounded w-[140px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={user.boxs || 0} // Controlled input
                            onChange={(e) => {
                                const numberOfBoxes = Number(e.target.value>=0 ? e.target.value : 0);
                                const shippingCostPerBox = Number(shippingCost.slice(1)); // Remove the "$" sign and convert to number
                                const shippingTotal = numberOfBoxes * shippingCostPerBox;
                                const newTotalCost = shippingTotal + (Cost - user.shippingCost || 0); // Adjust total cost
                                setCost(newTotalCost);
                                setUser({ ...user, shippingCost: shippingTotal, boxs: numberOfBoxes }); // Save shipping cost and box count in user state
                            }}
                        />
                        </div>}
            <label htmlFor="file-upload" className='flex flex-row gap-5 mb-4 w-full border-2 border-gray-300 rounded-md p-2 items-center'>
            <img src={assets.uploadIcon} alt="Upload Icon" className='w-20 h-20' />
            <div>
                <label htmlFor="file-upload" className='text-sm font-bold text-red-800'>Click on this box to Take/upload a picture of your work into the table below</label>
                <p className='text-xs text-red-400'>Use this button as many times as neccessary to insert pictures into the table below. Make sure to enter your initials and price of each work</p>
            </div>
            <input type='file' onChange={(e)=>handleFileUpload(e,setUploadedFiles)} id='file-upload' className='w-full h-10 givColor hidden' placeholder='Upload a picture of your work' required/>
            </label>
            <h3 className='givColor'>Please leave your work on the table. Thank you</h3><br/>
            <h3 className='font-bold givColor'>Ceramics are considered abandoned if not picked up 30 days after being contacted</h3>
            
            <Table onDelete={handleDelete} user={user} setCost={setCost} setUploadedFiles={setUploadedFiles} Cost={Cost} uploadedFiles={uploadedFiles}/>
            <div className={`w-full flex bg-[#3e3e3e] py-1 h-[40px] mt-10 flex-row justify-center items-center gap-5`}>
                <Button text="Submit" perform={handleSubmit}/>
                
            </div>
        </>
        
        </form>
  )
}

export default FormComp