import React, { useContext, useState } from 'react'
import Button from '../Button'
import { Context } from '../../context/CeramicContext';
import { handleDelete } from '../../crud';


const AdminEditDelete = ({id}) => {
  const {api,setSlips} = useContext(Context)
  const delet = async () => {
    const retVal = await handleDelete(api+"api/deleteFormData?id="+id)
    setSlips(retVal)
  }
  return (
    <div className='flex flex-col sm:flex-row gap-4'>
        {/* <div className={isEditing==true?'block':'hidden'} onClick={()=>{handleEdit(api,editable,model),setEditable(false),setIsEditing(false),setRefresh('edit')}}><Button  text={"Done"}/></div>
        <div className={isEditing==true?'hidden':'block'} onClick={()=>{edit(id),setIsEditing(true)}}><Button  text={"Edit"}/></div> */}
        <div><Button perform={delet}  text={"Delete"}/></div>
    </div>
  )
}

export default AdminEditDelete