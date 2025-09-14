import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Parallax, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SwiperMainHome.css';
import img1 from '../../../assets/Pics.png';
import img2 from '../../../assets/Still life of makeup products.png';
import img3 from '../../../assets/dad (3).png';
import img4 from '../../../assets/dad (2).png'
import backimage from '../../../assets/Rectangle 1724.png';
import backimage2 from '../../../assets/Ellipse 25.png';
import backimage3 from '../../../assets/dad (1).png'
import leftCircle from '../../../assets/Ellipse 28.png';
import rightCircle from '../../../assets/Ellipse 27.png';
import bottomCircle from '../../../assets/Ellipse 26.png';

const SwiperMainHome = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <Swiper
            modules={[Pagination, Navigation, Parallax, Autoplay]}
            speed={600}
            parallax={true}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
            className="swiper-container bg-[#F2F2F2] mt-5 relative"
        >
            <img className='absolute left-0 top-[40px] w-[50px]' src={leftCircle} alt="" />
            {currentSlide !== 1 && (
                <img className='absolute right-0 transform -rotate-45 top-[-65px]' src={rightCircle} alt="" />
            )}
            <img className='absolute bottom-0 left-[53%] transform -translate-x-1/2 w-[120px]' src={bottomCircle} alt="" />
            
            <SwiperSlide data-swiper-parallax="-50%">
                <div className="flex items-center justify-between container font-primary">
                    <div className="basis-[45%] self-center">
                        <h1 className='text-[38px] leading-relaxed font-semibold'>Upgrade Your Tech Game  Discover the <span className='text-blue'>Latest Smartphones</span> and <span className='text-blue'>PlayStation</span> Consoles at <span className='text-blue'>Unbeatable Prices!</span></h1>
                    </div>
                    <div className="relative">
                        <img className='w-[600px] relative' src={img1} alt="" />
                        <img className='absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 left-[65%] z-[-1]' src={backimage} alt="" />
                    </div>
                </div>
            </SwiperSlide>
            
            <SwiperSlide data-swiper-parallax="-50%">
                <div className="flex justify-between mt-[70px] container font-primary">
                    <div className="basis-[45%] self-center">
                        <h1 className='text-[38px] leading-relaxed font-semibold'>Beauty That Empowers Choose from Our Selection of <span className='text-blue'>Makeup</span> That Celebrates Your <span className='text-blue'>Unique Beauty!</span></h1>
                    </div>
                    <div>
                        <img className='w-[450px]' src={img2} alt="" />
                    </div>
                </div>
                <img className='absolute bottom-[-70px] transform  right-0 z-[-1] w-[350px]' src={backimage2} alt="" />
            </SwiperSlide>
            
            <SwiperSlide data-swiper-parallax="-50%">
                <div className="flex items-center justify-between container font-primary">
                    <div className="basis-[45%] self-center mt-10">
                        <h1 className='text-[38px] leading-relaxed font-semibold'>Step Up Your Style Game Discover Our <span className='text-blue'>Latest Fashion</span> Collection Designed to Make You <span className='text-blue'>Stand Out!</span></h1>
                    </div>
                    <div className="relative flex items-center justify-center">
                        <img className="absolute top-[60%] left-[50%] transform -translate-y-1/2 -translate-x-1/2 z-[-1]" src={backimage3} alt="" />
                        <div className="relative">
                            <img className="w-[300px] absolute left-[-150px] top-[50%] transform -translate-y-1/2" src={img4} alt="" />
                            <img className="w-[400px]" src={img3} alt="" />
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    )
}

export default SwiperMainHome;
