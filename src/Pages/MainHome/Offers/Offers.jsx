import { CiHeart } from "react-icons/ci";
import { Rating } from "flowbite-react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import useSetToken from '../../../store/useSetToken';
import { ShoppingBagIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toggleProductInWishlist } from "../../../services/addProductToWishlist";
import useSetUser from "../../../store/useSetUser";
import ProductLoadingSkeleton from "../../../Components/Products/ProductLoadingSkeleton";
import AddToCartBox from "../../../Components/Products/AddToCartBox";

const Offers = () => {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const { accessToken } = useSetToken()
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useSetUser()
    const [refetch, setRefetch] = useState(false)
    const [showAddToCartBox, setShowAddToCartBox] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(null)

    const deleteWishList = async (productId) => {
        try {

            const url = `${import.meta.env.VITE_API_URL}/api/whishlistes/delete/${productId}`;
            const res = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                        "Accept-Language": i18n.language
                }
            })
            setRefetch(!refetch)
            console.log(res.data)
        } catch (error) {
            console.log("delete errror", error)
        }
    }

    useEffect(() => {
        const getProducts = async () => {
            setIsLoading(true)

            try {
                const url = `${import.meta.env.VITE_API_URL}/api/offer?all=false`;

                const res = await axios.get(url, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Accept-Language": i18n.language
                    },
                });

                console.log("::", res.data);
                setProducts(res.data.data.offers);
            } catch (error) {
                console.log("Failed to fetch products:", error);
            } finally {
                setIsLoading(false)
            }
        };

        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refetch]);

    return (
        <div className='pt-[80px] container font-secondry'>
            {showAddToCartBox && (
                <AddToCartBox product={currentProduct} setShowAddToCartBox={setShowAddToCartBox} />
            )}
            <div className="flex items-center justify-between">
                <h1 className='text-dark text-[40px] tracking-wider font-bold'>{t("offers")}</h1>
                <Link to={"/offers"} className='bg-blue-600 text-white rounded-md px-6 py-2 hover:bg-blue-700 transition-all duration-300'>{t("view_all")}</Link>
            </div>
            {isLoading && (
                <div className="grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-3 gap-4 mt-[30px] font-primary">
                    {[1, 2, 3, 4].map((itm) => (
                        <ProductLoadingSkeleton key={itm} />
                    ))}
                </div>
            )}

            {!isLoading && (
                products && (
                    <div className="grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-3 gap-4 mt-[30px] font-primary">
                        {products?.length > 0 && (
                            products?.map((product) => {
                                const wishlistIds = product.product.whishlistes?.map(item => item.product_id) || [];
                                const userIds = product.product.whishlistes?.map(item => item.user_id) || [];

                                return (
                                    <div key={product.id} className="p-4 shadow-main rounded-md border-[1px] border-slate-200">
                                        <div
                                            onClick={async () => {
                                                if (wishlistIds.includes(String(product.product.id)) && userIds.includes(String(user.id))) {
                                                    deleteWishList(product.product.id)
                                                } else {
                                                    await toggleProductInWishlist(product.product.id, accessToken)
                                                    setRefetch(!refetch)
                                                }

                                            }}
                                            className="flex items-center justify-center relative"
                                        >
                                            <CiHeart
                                                style={{
                                                    backgroundColor:
                                                        wishlistIds.includes(String(product.product.id)) && userIds.includes(String(user.id))
                                                            ? "red" : "white",
                                                    color:
                                                        wishlistIds.includes(String(product.product.id)) && userIds.includes(String(user.id))
                                                            ? "white" : "#3b82f6"
                                                }}
                                                className='absolute right-[20px] top-[10px] rounded-full text-[30px] p-1 cursor-pointer transition-all duration-200'
                                            />

                                            {product?.product?.images?.length > 0 && (
                                                <img src={product.product.images[0].image_url} className='w-full aspect-square' alt={product?.product?.translatable_name || "product image"} />
                                            )}
                                        </div>
                                        <div className="p-2 flex flex-col gap-1">
                                            <span
                                                onClick={() => navigate(`/products/${product.id}`)}
                                                className='font-semibold text-[17px] cursor-pointer'
                                            >{product?.product?.translatable_name}</span>
                                            <div className='flex items-center gap-2'>
                                                <div className="flex items-center gap-4">
                                                    <span className='font-bold text-red'>${product.product.price}</span>
                                                    {product.new_price && (
                                                        <span className='font-semibold text-sm text-gray-600 line-through'>${product.new_price.toFixed(2) }</span>
                                                    )}
                                                </div>
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
                                            setCurrentProduct(product.product)
                                            setShowAddToCartBox(true)
                                        }} className='bg-blue-600 w-full mt-3 rounded-md text-white py-[8px] font-secondry hover:bg-blue-700 transition-all duration-300 flex items-center gap-3 justify-center'><span>{t("add_to_cart")}</span> <ShoppingBagIcon size={18} /></button>
                                    </div>
                                )

                            }))}

                    </div>
                )
            )}

        </div>
    )
}

export default Offers