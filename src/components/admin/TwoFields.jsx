import React, { useContext, useEffect, useState } from 'react'


const TwoFields = ({type1,type2, placeholder1, placeholder2,Label1,Label2,name1,name2,value1,value2}) => {

    const [today, setToday] = useState('');
    
    useEffect(() => {
      const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
      setToday(currentDate);
      
    }, []);

  return (
    <div className='flex flex-col sm:flex-row gap-2'>
            <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2" >
                   {Label1}
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type={type1} placeholder={placeholder1} disabled readOnly value={value1?value1:''}/>
            </div>
            {(Label2 && <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                {Label2}
                </label>
                {type2=="date" && <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type={type2} value={today} placeholder={placeholder2} readOnly disabled />}
                {type2!="date" && <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type={type2} value={value2?value2:''}  placeholder={placeholder2} disabled readOnly />}
                
            </div>)}
            </div>
  )
}

export default TwoFields