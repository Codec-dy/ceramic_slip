import React, { use, useContext, useEffect, useState } from 'react'
import { Context } from '../context/CeramicContext'
import Button from '../components/Button'
import axios from 'axios'
import {fetchData, submit } from '../crud'
import TwoFields from '../components/admin/TwoFields'
import FormComp from '../components/FormComp'
import imageCompression from 'browser-image-compression';
import { useParams } from 'react-router-dom'

const Form = () => {

    const {esetUploadedFiles,euploadedFiles,setUploadedFiles,uploadedFiles,setUser,user,api,Cost,setCost,setEdit,edit,eCost,esetCost} = useContext(Context)
    const [loading, setLoading] = useState(false)
    const [formType, setFormType] = useState('submit')
    const {editId} = useParams()
    const [id,setId] = useState('')

    useEffect(() => {
        if(editId){
            console.log("Editing form with ID:", editId);
            setFormType("retrieve")
            setId(editId)
            handleClick(new Event('click'),editId)
        }
    },[editId])
    
    const handleFileUpload = async (event,setUploadedFiles) => {
        const file = event.target.files[0]
        if (file) {
              // Compression options
                const options = {
                    maxSizeMB: 0.2,          // Target max size in MB (0.2 MB = ~200KB)
                    maxWidthOrHeight: 1024,  // Resize dimensions if larger
                    useWebWorker: true,
                };
                  try {
                        const compressedFile = await imageCompression(file, options);
                        // console.log("Original size:", (file.size / 1024).toFixed(2), "KB");
                        // console.log("Compressed size:", (compressedFile.size / 1024).toFixed(2), "KB");
                        setUploadedFiles((prevFiles) => [...prevFiles, {file: compressedFile, Initials:'', Cost:''}])

                  }catch(e){
                        console.log(e)
                  }

        }
    }

    const handleDelete = (index,setUploadedFiles,setCost) => {
        setUploadedFiles((prevFiles) =>{ 
            const newFiles = prevFiles.filter((_, i) => i !== index)
            const totalCost = newFiles.reduce((acc, file) => acc + parseFloat(file.Cost || 0), 0);
            setCost(totalCost);
            return newFiles
        })
    }

    const handleSubmit = async (event,type) => {
        event.preventDefault()      
        try{
            let retVal = null
        if(type=="edit"){
            edit.totalCost = eCost
             retVal = await submit(api+"api/formUpload?id="+edit._id,"put",edit,euploadedFiles,setLoading)
        }else{
            user.totalCost = Cost
            retVal = await submit(api+"api/formUpload","post",user,uploadedFiles,setLoading)       
        }

       if(retVal){
        setUser({name:'',email:'',phone:'',state:'',city:'',zipCode:'',street:'', shipping:'',shippingCost:0,date:user.date, totalCost:0,Code:''})
        setEdit({name:'',email:'',phone:'',state:'',city:'',zipCode:'',street:'',shipping:'',shippingCost:0,date:'', totalCost:0,Code:''})
        setUploadedFiles([])
        setCost(0)
       }else{
        
       }
    }catch(err){
        console.log(err)
        }
        return true
    }

    const handleClick = async (e,id) => {
        e.preventDefault()
        try{
            if(id){
        const data = await fetchData(api+"api/getFormData?id="+id,setEdit,"single")
        if(data){
            setEdit((prev) => ({...prev,Code:''}))
            esetUploadedFiles(data.imageDetails)
            esetCost(data.totalCost)
        }
        }}catch(err){
            console.log(err)
        }finally{
            setId('')
            return true
        }

    }
    useEffect(() => {
        
    },[edit])

    useEffect(() => {
        document.title = 'ArtHaus Ceramic Slip'
        axios.post(api).then((res) => {
            console.log(res.data)
        })
        
       
    },[])
  return (

    <div className='flex flex-col bg-gray-100 p-3 gap-4  w-full'>
    <div className='flex flex-row'>

        <div onClick={()=>setFormType("submit")} className={`flex-1 text-center border-1 ${formType=="submit"?"bg-gray-300":''} border-gray-200 p-4 cursor-pointer`}>Submit Form</div>
        <div onClick={()=>setFormType("retrieve")} className={`flex-1 text-center border-1 border-gray-200 p-4 cursor-pointer ${formType=="retrieve"?"bg-gray-300":''}` }>Retrieve Form</div>
    </div>
    
     <div className='flex flex-col items-center bg-gray-100 p-3 gap-7 max-w-[640px] w-full min-h-screen'>
        <h1 className="text-3xl sm:text-6xl givColor font-bold underline">ArtHaus Ceramic Slip</h1>
        {formType=="submit"&&<FormComp setUser={setUser} user={user} Cost={Cost} setCost={setCost} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} loading={loading} setLoading={setLoading} handleDelete={handleDelete} handleFileUpload={handleFileUpload} handleSubmit={(e)=>handleSubmit(e,"new")} />}
        {formType=="retrieve"&&<form className='flex flex-col gap-5 w-3/4'>
            <div className="block text-gray-700 text-xl font-bold">
                Enter your reference number to retrieve your form   
            </div>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter reference number" required onChange={(e)=>setId(e.target.value)} value={id}/>
            <div className={`w-full flex bg-[#3e3e3e] h-[40px] flex-row justify-center items-center gap-5`} ><Button text="Retrieve" perform={(e)=>{handleClick(e,id)}}/></div>
        </form>}
        
        {edit.date&&formType=="retrieve"&&<FormComp Cost={eCost} setCost={esetCost} uploadedFiles={euploadedFiles} setUploadedFiles={esetUploadedFiles} setUser={setEdit}  user={edit} loading={loading} setLoading={setLoading} handleDelete={handleDelete} handleFileUpload={handleFileUpload} handleSubmit={(e)=>handleSubmit(e,"edit")} />}
        </div>
    </div>
  )
}

export default Form