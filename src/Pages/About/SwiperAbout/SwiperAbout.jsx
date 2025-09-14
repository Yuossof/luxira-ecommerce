import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import './SwiperAbout.css'
import { FreeMode, Pagination } from 'swiper/modules'
import img from '../../../assets/Frame 891.png';

const SwiperAbout = () => {
    return (
        <div>
            <Swiper
                breakpoints={{
                    340: {
                        slidesPerView: 1,
                        spaceBetween: 15
                    },
                    600: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    1280: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    }

                }}
                freeMode={true}
                pagination={{
                    clickable: true
                }}
                modules={[FreeMode, Pagination]}
                className=' mt-[40px] max-w-[90%] pb-[40px]'
            >
                    <SwiperSlide>
                        <div className='p-4 rounded-md'>
                            <img src={img} alt="Img" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='p-4 rounded-md'>
                            <img src={img} alt="Img" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='p-4 rounded-md'>
                            <img src={img} alt="Img" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='p-4 rounded-md'>
                            <img src={img} alt="Img" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='p-4 rounded-md'>
                            <img src={img} alt="Img" />
                        </div>
                    </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default SwiperAbout