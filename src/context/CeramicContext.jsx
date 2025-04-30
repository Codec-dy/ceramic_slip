
import React, { createContext, use, useState } from 'react'


export const Context = createContext()


const CeramicContext = (props) => {
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [shippingCost, setShippingCost] = useState('$15')
    const [user, setUser] = useState({name:'', email:'', phone:'', address:'', date:'', shipping:'', totalCost:0});
    const [refresh, setRefresh] = useState('');
    const [Cost, setCost] = useState(0);
     const [slips, setSlips] = React.useState([])
    const api = 'http://192.168.1.124:5000/';
    const [adminAttachments, setAdminAttachments] = useState([])
    const value = {shippingCost, setShippingCost,uploadedFiles, setUploadedFiles, user, setUser, refresh, setRefresh, api, Cost, setCost,slips,setSlips,adminAttachments,setAdminAttachments}
  return (
    <Context.Provider value={value}>
        {props.children}
    </Context.Provider>

  )
}

export default CeramicContext