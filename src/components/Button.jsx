import React, { useEffect, useState } from 'react'

const Button = ({text, perform}) => {
  const [click, setClick] = useState(false);
  
  return (
    <button onMouseUp={()=>setTimeout(()=>{ setClick(false)},200)} onMouseDown={()=>setClick(true)} onClick={(e)=>{perform(e)}} className={`w-full cursor-pointer ${click?'translate-y-[-4px]':''} bg-gray-900  py-2 px-10 text-gray-100 hover:bg-white hover:text-black hover:border transition-all duration-[500ms]`}>{text}</button>
  )
}

export default Button