import { CiHeart } from "react-icons/ci";
import { Rating } from "flowbite-react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBagIcon } from 'lucide-react';
import { useEffect, useState } from "react";
import useSetToken from '../../../../store/useSetToken';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import AddToCartBox from "../../../../Components/Products/AddToCartBox";
const ExploreProducts = () => {
    const { t, i18n } = useTranslation()
    const { accessToken } = useSetToken()
    const [products, setProducts] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [isLoading, setIsLoading] = useState(false)
    const [numberOfPages, setNumberOfPages] = useState(1)
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [cachedPages, setCachedPages] = useState({})
    const [currentProduct, setCurrentProduct] = useState(null)
    const [showAddToCartBox, setShowAddToCartBox] = useState(false)

    useEffect(() => {
        if (cachedPages[page]) {
            setProducts(cachedPages[page])
            return
        }
        const getProducts = async () => {
            setIsLoading(true)

            try {
                const url = `${import.meta.env.VITE_API_URL}/api/product/filter?page=${page}`;

                const res = await axios.get(url, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Accept-Language": i18n.language

                    },
                });

                console.log("prss", res.data);
                setProducts(res.data.data.products);
                setNumberOfPages(res.data.data.total_pages)
                if (page === 1) {
                    setCachedPages({
                        [page]: res.data.data.products
                    })
                } else {
                    setCachedPages({ ...cachedPages, [page]: res.data.data.products })
                }

            } catch (error) {
                console.log("Failed to fetch products:", error);
            } finally {
                setIsLoading(false)
            }
        };

        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <div className='pt-[80px] container font-secondry pb-5'>
            {showAddToCartBox && (
                <AddToCartBox product={currentProduct} setShowAddToCartBox={setShowAddToCartBox} />
            )}
            <div className="flex items-center justify-between">
                <h1 className='text-dark text-[40px] font-bold'>{t("explore_our_products")}</h1>
                <div className="flex gap-3">
                    <IoIosArrowBack
                        onClick={() => {
                            if (page > 1) {
                                const prevPage = page - 1;

                                if (
                                    Object.prototype.hasOwnProperty.call(cachedPages, prevPage) &&
                                    cachedPages[prevPage] != null &&
                                    cachedPages[prevPage] !== ""
                                ) {
                                    setProducts(cachedPages[prevPage]);
                                    setPage(prevPage);
                                    return;
                                }

                                setPage(prevPage);
                            }
                        }}
                        className='bg-offWhite rounded-full text-[28px] p-1 cursor-pointer text-dark'
                    />

                    <IoIosArrowForward
                        onClick={() => {
                            if (page < numberOfPages) {
                                const nextPage = page + 1;

                                if (
                                    Object.prototype.hasOwnProperty.call(cachedPages, nextPage) &&
                                    cachedPages[nextPage] != null &&
                                    cachedPages[nextPage] !== ""
                                ) {
                                    setProducts(cachedPages[nextPage]);
                                    setPage(nextPage);
                                    return;
                                }

                                setPage(nextPage);
                            }
                        }}
                        className='bg-offWhite rounded-full text-[28px] p-1 cursor-pointer text-dark'
                    />


                </div>
            </div>
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-3 gap-6 mt-[30px] font-primary">
                {products.map((product) => (
                    <div key={product.id} className="p-4 shadow-main rounded-md border-[1px] border-slate-200">
                        <div className="flex items-center justify-center relative ">
                            <CiHeart className='absolute right-[20px] top-[10px] bg-white rounded-full text-[30px] text-blue p-1' />
                            <img src={product.images[0]?.image_url} className='w-full aspect-square h-full object-cover' alt="" />
                        </div>
                        <div className="p-2 flex flex-col gap-1">
                            <span
                                onClick={() => navigate(`/products/${product.id}`)}
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
                        <button onClick={() => {
                            setCurrentProduct(product)
                            setShowAddToCartBox(true)
                        }}
                            className='bg-blue-600 w-full mt-3 rounded-md text-white py-[8px] font-secondry hover:bg-blue-700 transition-all duration-300 flex items-center gap-3 justify-center'><span>{t("add_to_cart")}</span> <ShoppingBagIcon size={18} /></button>
                    </div>
                ))}

            </div>
            <Link to={'/products'} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <button className='bg-blue-600 py-2 px-4 rounded-md mx-auto block text-white mt-16 hover:bg-blue-700 transition-all duration-300'>{t("view_all_pro")}</button>
            </Link>
        </div>
    )
}

export default ExploreProducts