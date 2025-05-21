
import React, { createContext, use, useState } from 'react'


export const Context = createContext()


const CeramicContext = (props) => {
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [euploadedFiles, esetUploadedFiles] = useState([])
    const [shippingCost, setShippingCost] = useState('$15')
    const [user, setUser] = useState({name:'', email:'', phone:'', address:'', date:'', shipping:'',shippingCost:0, totalCost:0,boxs:0,Code:''});
    const [refresh, setRefresh] = useState('');
    const [Cost, setCost] = useState(0);
    const [eCost, esetCost] = useState(0);
     const [slips, setSlips] = React.useState([])
    // const api = 'https://ceramicslip-backend.onrender.com/';
    const api = 'http://localhost:5000/';
    const [edit,setEdit] = useState({name:'', email:'', phone:'', address:'', date:'', shipping:'',shippingCost:0, totalCost:0,boxs:0,Code:''});
    const [adminAttachments, setAdminAttachments] = useState([])
    const value = {euploadedFiles,esetUploadedFiles,eCost,esetCost,shippingCost, setShippingCost,uploadedFiles, setUploadedFiles, user, setUser, refresh, setRefresh, api, Cost, setCost,slips,setSlips,adminAttachments,setAdminAttachments,edit,setEdit}
  return (
    <Context.Provider value={value}>
        {props.children}
    </Context.Provider>

  )
}

export default CeramicContext