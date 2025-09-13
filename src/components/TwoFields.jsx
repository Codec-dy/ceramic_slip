import React, { useContext, useEffect, useState } from 'react'

const TwoFields = ({type1,type2, placeholder1, placeholder2,Label1,Label2,name1,name2,user,setUser}) => {

    const [today, setToday] = useState('');
    
  
    useEffect(() => {
      const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
      setToday(currentDate);
      
      if(!user.date){
      setUser({...user,date:currentDate})
      }
      
    }, []);

    const handleChange = (e,name) => {
      if (name === "phone") {
        let value = e.target.value.replace(/\D/g, ""); // Remove all non-numeric characters
        if (value.length > 3 && value.length <= 6) {
            value = value.slice(0, 3) + "-" + value.slice(3); // Format as 999-999
        } else if (value.length > 6) {
            value = value.slice(0, 3) + "-" + value.slice(3, 6) + "-" + value.slice(6, 10); // Format as 999-999-9999
        }
        setUser({ ...user, [name]: value });
    } else if (name === "name") {
      let value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters and spaces
      setUser({ ...user, [name]: value });
  } else {
      setUser({ ...user, [name]: e.target.value });
  }
    }
  return (
    <div className='flex flex-col sm:flex-row gap-2'>
            <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2" >
                   {Label1}
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type={type1} placeholder={placeholder1} required onChange={(e)=>handleChange(e,name1,)} value={user[name1]}/>
            </div>
            {(Label2 && <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                {Label2}
                </label>
                {type2=="date" && <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type={type2} value={user[name2]?user[name2]:today} placeholder={placeholder2} readOnly required />}
                {type2!="date" && <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type={type2} onChange={(e)=>handleChange(e,name2)} value={user[name2]}  placeholder={placeholder2} required />}
                
            </div>)}
            </div>
  )
}

export default TwoFields