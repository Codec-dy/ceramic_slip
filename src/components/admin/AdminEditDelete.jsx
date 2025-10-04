import React, { useContext, useState } from 'react'
import Button from '../Button'
import { Context } from '../../context/CeramicContext';
import { handleCompleted, handleContacted, handleDelete } from '../../crud';


const AdminEditDelete = ({id,page=''}) => {
  const {api,setSlips} = useContext(Context)
  const delet = async () => {
    let promptCheck = confirm("Are you sure you want to delete this slip? This action cannot be undone.")
    if(promptCheck){
    const retVal = await handleDelete(api+"api/deleteFormData?id="+id)
    setSlips(retVal)
  }
  }
  const completed = async () => {
    const retVal = await handleCompleted(api+"api/completed?id="+id)
    setSlips(retVal)
    setTimeout(() => {
      window.location.reload()
    }, 1500);
  }
  const contacted = async () => {
    const retVal = await handleContacted(api+"api/contacted?id="+id)
    setSlips(retVal)
    setTimeout(() => {
      window.location.reload()
    }, 1500);
  }
  return (
    <div className='flex flex-col sm:flex-row gap-4'>
        {/* <div className={isEditing==true?'block':'hidden'} onClick={()=>{handleEdit(api,editable,model),setEditable(false),setIsEditing(false),setRefresh('edit')}}><Button  text={"Done"}/></div>
        <div className={isEditing==true?'hidden':'block'} onClick={()=>{edit(id),setIsEditing(true)}}><Button  text={"Edit"}/></div> */}
        <div><Button perform={delet}  text={"Delete"}/></div>
        {page!="pickup" && <div><Button perform={contacted}  text={"Contacted"}/></div>}
        <div><Button perform={completed}  text={"Archive"}/></div>
    </div>
  )
}

export default AdminEditDelete