import { CiHeart } from "react-icons/ci";

import { Rating } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { ShoppingBagIcon } from 'lucide-react';
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
const SimilarProducts = ({ similarProducts }) => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    return (
        <div className='pt-[80px] font-secondry'>
            <div className="flex items-center justify-between">
                <h1 className='text-dark text-[40px] font-bold'>{t('similar_products')}</h1>
                <button className='bg-blue text-white rounded-md px-6 py-2 hover:bg-blue2 transition-all duration-300'>{t("view_all")}</button>
            </div>

            <div className="grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-3 gap-4 mt-[30px] font-primary">

                {/* eslint-disable-next-line react/prop-types */}
                {similarProducts.map((product) => (
                    <div key={product.id} className="p-4 shadow-main rounded-md border-[1px] border-slate-200">
                        <div className="flex items-center justify-center relative">
                            <CiHeart className='absolute right-[20px] top-[10px] bg-white rounded-full text-[30px] text-blue p-1' />
                            <img src={product.images[0].image_url} className='w-full aspect-square' alt="" />
                        </div>
                        <div className="p-2 flex flex-col gap-1">
                            <span
                                onClick={() => {
                                    navigate(`/products/${product.id}`)
                                    navigate(0)
                                    
                                }} 
                                className='font-semibold text-[17px] cursor-pointer'
                            >{product.translatable_name}</span>
                            <div className='flex items-center gap-2'>
                                <span className='font-bold text-red'>${product.price}</span>
                                <Rating>
                                    <Rating.Star />
                                    <Rating.Star />
                                    <Rating.Star />
                                    <Rating.Star />
                                    <Rating.Star filled={false} />
                                </Rating>
                            </div>
                            <div className='flex items-center gap-2 mt-2'>
                                <div className='w-4 h-4 rounded-full bg-blue border-[1px] border-slate-300'></div>
                                <div className='w-4 h-4 rounded-full bg-red border-[1px] border-slate-300'></div>
                                <div className='w-4 h-4 rounded-full bg-gray border-[1px] border-slate-300'></div>
                            </div>
                        </div>
                        <button className='bg-blue w-full mt-3 rounded-md text-white py-[8px] font-secondry hover:bg-blue2 transition-all duration-300 flex items-center gap-3 justify-center'><span>{t("add_to_cart")}</span> <ShoppingBagIcon size={18} /></button>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default SimilarProducts