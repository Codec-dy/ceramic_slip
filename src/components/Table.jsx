import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Context } from '../context/CeramicContext'

const Row = ({file,ind,handleDelete})=>{
    const {uploadedFiles, setUploadedFiles,setCost,user,setUser} = useContext(Context)
    const ChangeVal = (e) => {
        const { name, value } = e.target;
        // file[name] = value;
        setUploadedFiles((prevFiles) => {
            const newFiles = [...prevFiles];
            newFiles[ind][name] = value;
            if (name === 'Cost') {
                const totalCost = uploadedFiles.reduce((acc, file) => acc + parseFloat(file.Cost || 0), 0);
                setCost(totalCost);
            }
            return newFiles;
        });
    }
    return (
    <>
    <tr className='border-b border-gray-300'>
                <td className='p-3'><img src={URL.createObjectURL(file.file)}   alt="Item" className='w-[160px] scale-70 sm:scale-100' /></td>
                <td className='p-3 border-x-1 border-gray-300'><input type='text' onChange={ChangeVal} name='Initials' className='w-full p-1  text-sm' placeholder='Initials' value={file.Initials} required/></td>
                <td className='p-3 border-r-1 border-gray-300'><div className='flex'><span>$</span> <input type='number' onChange={ChangeVal} className='w-[70px] p-1 text-sm' required name='Cost' placeholder='Cost' value={file.Cost}/></div></td>
                <td className='p-3'><img src={assets.deleteIcon} onClick={handleDelete}  alt="Item" className='w-[245px] sm:w-[25px]' /></td>      
     </tr>
        </>
    )
}

const Table = ({onDelete}) => {
    const {uploadedFiles,Cost} = useContext(Context)
    const files = uploadedFiles
    
  return (
    <table className='w-full border-collapse border givColor border-gray-300 p-3'>
        <tbody>
            <tr className='bg-gray-200 border-b border-gray-300'>
                <th className='text-left p-3 '>Image of Item</th>
                <th className='text-left p-3 border-gray-300 border-x-1'>Initials</th>
                <th className='text-left p-3'>Cost of Item</th>
                <th className='text-left p-3'></th>
            </tr>
            {files.map((file, index) => (
                <Row key={index} file={file} ind={index} handleDelete={() => onDelete(index)} />
            ))}
            <tr>
                <td className='p-3 border-x-1 border-gray-300 font-bold' colSpan={2}>Total Cost</td>
                <td className='p-3'>$ {Cost}</td>
             
            </tr>
        </tbody>
    </table>
  )
}

export default Table