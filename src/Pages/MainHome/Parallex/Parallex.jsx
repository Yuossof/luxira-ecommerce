import React from 'react'
import Marquee from 'react-fast-marquee';
import img1 from '../../../assets/Category-Phone (1).png';
import img2 from '../../../assets/Category-Phone (2).png';
import img3 from '../../../assets/Category-Phone.png';

const Parallex = () => {
  return (
    <Marquee direction='right'>
        <div className="flex items-center mt-14">
        <img src={img1} alt="" className='w=[150px] h-auto mr-[16px]' />
        <img src={img2} alt="" className='w=[150px] h-auto mr-[16px]' />
        <img src={img3} alt="" className='w=[150px] h-auto mr-[16px]' />
        <img src={img1} alt="" className='w=[150px] h-auto mr-[16px]' />
        <img src={img2} alt="" className='w=[150px] h-auto mr-[16px]' />
        <img src={img3} alt="" className='w=[150px] h-auto mr-[16px]' />
        <img src={img1} alt="" className='w=[150px] h-auto mr-[16px]' />
        <img src={img2} alt="" className='w=[150px] h-auto mr-[16px]' />
        <img src={img3} alt="" className='w=[150px] h-auto mr-[16px]' />
        </div>
    </Marquee>
)}

export default Parallex