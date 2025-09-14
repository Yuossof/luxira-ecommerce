import React, { useEffect, useState } from 'react'
import { IoIosArrowUp } from "react-icons/io";

const FixedButtons = () => {
    
    const [scroll, setScroll] = useState(false);

    const handleClick = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  
    useEffect(() => {
      const handleScroll = () => {
        window.scrollY > 350 ? setScroll(true) : setScroll(false);
      }
      window.addEventListener('scroll', handleScroll);
  
      return () => window.removeEventListener('scroll', handleScroll);
    },[])

  return (
    <div className="container py-[25px]">
      <IoIosArrowUp onClick={handleClick} className={`${ scroll ? 'bottom-[40px]' : 'bottom-[-100%]' } fixed right-[40px] bg-blue text-white w-[32px] shadow-main h-[32px] rounded-md hover:bg-blue2 cursor-pointer transition-all duration-300`}></IoIosArrowUp>
    </div>
  )
}

export default FixedButtons