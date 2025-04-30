import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { Context } from '../../context/CeramicContext';

const Row = ({file,setDisplay,setAttachments})=>{

    const handleChecks = (e) => {
        const { checked } = e.target;
        console.log(checked)
        if (checked) {
            setAttachments((prev) => [...prev, file.file_url]);
        } else {
            setAttachments((prev) => prev.filter((item) => item !== file.file_url));
        }
    }
    
    return (
    <>
    <tr className='border-b border-gray-300'>
                <td className='p-3'><img src={file.file_url} onClick={()=>(setDisplay(file.file_url))}  alt="Item" className='w-[160px] scale-70 sm:scale-100' /></td>
                <td className='p-3 border-x-1 border-gray-300'><input type='text' name='Initials' className='w-full p-1  text-sm' placeholder='Initials' value={file.Initials} readOnly required/></td>
                <td className='p-3 border-r-1 border-gray-300'><div className='flex'><span>$</span> <input type='number' className='w-[70px] p-1 text-sm' required name='Cost' placeholder='Cost'readOnly  value={file.Cost}/></div></td>
                <th className='text-left p-3'><input type='checkbox' onChange={handleChecks}/></th>
               
     </tr>
     
        </>
    )
}

const Table = ({imageDetails,totalCost}) => {
    const [display, setDisplay] = useState('')
    const {setAdminAttachments} = useContext(Context)
  return (
    <>
    <table className='w-full border-collapse border givColor border-gray-300 p-3'>
        <tbody>
            <tr className='bg-gray-200 border-b border-gray-300'>
                <th className='text-left p-3 '>Image of Item</th>
                <th className='text-left p-3 border-gray-300 border-x-1'>Initials</th>
                <th className='text-left p-3'>Cost of Item</th>
                <th className='text-left p-3'></th>
            </tr>
            {imageDetails && imageDetails.map((file, index) => (
                <Row key={index} file={file} ind={index} setDisplay={setDisplay} setAttachments={setAdminAttachments} />
            ))}
            <tr>
                <td className='p-3 border-x-1 border-gray-300 font-bold' colSpan={2}>Total Cost</td>
                <td className='p-3'>$ {totalCost}</td>
             
            </tr>
        </tbody>
    </table>
    {display!='' && <div style={{background:'rgba(0,0,0,0.7)'}} onClick={()=>setDisplay('')} className='flex fixed h-full place-items-center justify-center items-center w-full top-0 left-0  z-10'>
    <img src={display} alt="Item" className='sm:max-w-[700px]'/>
</div>}
</>
  )
}

export default Table