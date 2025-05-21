import React, { useEffect, useState } from 'react'

const Button = ({text, perform}) => {
  const [click, setClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const clickHandler = async (e) => {
    setLoading(true);
    let val;
    try {
      val = await perform(e);
    } finally {
      setLoading(false); // Always reset loading
    }
  }
  return (
    <button disabled={loading?true:false} onMouseUp={()=>setTimeout(()=>{ setClick(false)},200)} onMouseDown={()=>setClick(true)} onClick={(e)=>{clickHandler(e)}} className={`${loading?"loader":`w-full cursor-pointer  bg-gray-900  py-2 px-10 text-gray-100 hover:bg-white hover:text-black hover:border transition-bg duration-[300ms]`}`}>{!loading?text:''}</button>
  )
}

export default Button