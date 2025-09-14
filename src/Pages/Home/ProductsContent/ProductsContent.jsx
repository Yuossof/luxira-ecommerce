import { Rating } from "flowbite-react";
import { CiHeart } from "react-icons/ci";
import useSetToken from "../../../store/useSetToken";
import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingBagIcon } from "lucide-react";
import useFilter from "../../../store/useFilter";
import ProductLoadingSkeleton from "../../../Components/Products/ProductLoadingSkeleton";
import { useLocation } from "react-router-dom";
import usePageNumber from "../../../store/usePageNumber";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useSetUser from "../../../store/useSetUser";
import { toggleProductInWishlist } from "../../../services/addProductToWishlist";
import AddToCartBox from "../../../Components/Products/AddToCartBox";
import useProducts from "../../../store/useSearch";
// ...existing imports...
const ProductsContent = () => {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()
    const location = useLocation()
    const { accessToken } = useSetToken()
    const { products, setProducts } = useProducts()
    const { filteredData, setIsLoading, isLoading } = useFilter()
    const searchParams = new URLSearchParams(location.search)
    const page = searchParams.get("page") || "1"
    const { setNumberOfPages } = usePageNumber()
    const { user } = useSetUser()
    const [refetch, setRefetch] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(null)
    const [showAddToCartBox, setShowAddToCartBox] = useState(false)

    useEffect(() => {
        console.log(user, "user in products content")
        const getProducts = async () => {
            setIsLoading(true)
            try {
                const queryParams = Object.entries(filteredData)
                    // eslint-disable-next-line no-unused-vars
                    .filter(([_, value]) => value !== "")
                    .map(([key, value]) => `${key}=${value}`)
                    .join("&");
                const url = `${import.meta.env.VITE_API_URL}/api/product/filter?page=${page}&${queryParams}`;
                const res = await axios.get(url, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Accept-Language": i18n.language
                    },
                });
                setProducts(res.data.data.products);
                setNumberOfPages(res.data.data.total_pages)
            } catch (error) {
                console.log("Failed to fetch products:", error);
            } finally {
                setIsLoading(false)
            }
        };
        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredData, page, refetch]);

    const deleteWishList = async (productId) => {
        try {

            const url = `${import.meta.env.VITE_API_URL}/api/whishlistes/delete/${productId}`;
            const r = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            console.log(r.data)
            setRefetch(!refetch)
        } catch (error) {
            console.log("delete errror", error)
        }
    }


    return (
        <>
            {showAddToCartBox && (
                <AddToCartBox product={currentProduct} setShowAddToCartBox={setShowAddToCartBox} />
            )}
            <h1 className='text-[30px] font-bold font-primary uppercase text-dark'>{t("casual")}</h1>
            <div>
                {isLoading && (
                    <div className="grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-3 gap-4 mt-[30px] font-primary">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((itm) => (
                            <ProductLoadingSkeleton key={itm} />
                        ))}
                    </div>
                )}
                {!isLoading && (
                    <div className="grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-3 gap-4 mt-[30px] font-primary">
                        {products.length > 0 && (
                            products.map((product) => {
                                const wishlistIds = product.whishlistes?.map(item => item.product_id) || [];
                                const userIds = product.whishlistes?.map(item => item.user_id) || [];

                                return (
                                    <div key={product.id} className="p-4 shadow-main rounded-md border-[1px] border-slate-200">
                                        <div
                                            onClick={async () => {
                                                if (wishlistIds.includes(String(product.id)) && userIds.includes(String(user.id))) {
                                                    deleteWishList(product.id)
                                                } else {
                                                    toggleProductInWishlist(product.id, accessToken)
                                                    setRefetch(!refetch)
                                                }

                                            }}
                                            className="flex items-center justify-center relative"
                                        >
                                            <CiHeart
                                                style={{
                                                    backgroundColor:
                                                        wishlistIds.includes(String(product.id)) && userIds.includes(String(user.id))
                                                            ? "#2830d1" : "white",
                                                    color:
                                                        wishlistIds.includes(String(product.id)) && userIds.includes(String(user.id))
                                                            ? "white" : "#3b82f6"
                                                }}
                                                className='absolute right-[20px] top-[10px] rounded-full text-[30px] p-1 cursor-pointer transition-all duration-200'
                                            />
                                            <img src={product?.images[0]?.image_url} className='w-full aspect-square' alt="" />
                                        </div>
                                        <div className="p-2 flex flex-col gap-1">
                                            <span
                                                onClick={() => navigate(`/products/${product.id}`)}
                                                className='font-semibold text-[18px] cursor-pointer'
                                            >{product.translatable_name}</span>
                                            <div className='flex items-start gap-3 flex-col '>
                                                <div className="flex items-center gap-4">
                                                    <span className='font-bold text-red'>${product.price}</span>
                                                    {product.discount && (
                                                        <span className='font-semibold text-sm text-gray-600 line-through'>${product.price - product.discount.price}</span>
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
                                        <button
                                            onClick={() => {
                                                if (!accessToken) {
                                                    navigate("/login")
                                                    return
                                                }
                                                setCurrentProduct(product)
                                                setShowAddToCartBox(true)
                                            }}
                                            className='bg-blue-600 w-full mt-3 rounded-md text-white py-[8px] font-secondry hover:bg-blue-700 transition-all duration-300 flex items-center gap-3 justify-center'>
                                            <span>{t("add_to_cart")}</span>
                                            <ShoppingBagIcon size={18} />
                                        </button>
                                    </div>
                                )
                            })
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default ProductsContent
