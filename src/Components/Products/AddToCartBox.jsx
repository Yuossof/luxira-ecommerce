/* eslint-disable react/prop-types */
import { ShoppingBagIcon, X } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { addProductToCartService } from "../../services/addProductToCartService"
import useSetToken from "../../store/useSetToken"
import insertProductsToCart from "../../store/useCart"


const AddToCartBox = ({ product = [], setShowAddToCartBox }) => {

    const { accessToken } = useSetToken()
    const { t } = useTranslation()
    const [data, setData] = useState({
        size_id: "",
        color_id: "",
    })
    const { addProductToCart, refreshCart,  } = insertProductsToCart()
    const [quantity, setQuantity] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const handleAddProductToCart = async () => {
        try {
            setIsLoading(true)
            const res = await addProductToCartService({ ...data, quantity, product_id: product.id }, accessToken)
            console.log("ddgsdojgijdojho", res)
            addProductToCart(res.data.cart_product)
            refreshCart()
            addProductToCart()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
            setShowAddToCartBox(false)
        }
    }

    return (
        <div className='bg-opacity-70 bg-black fixed top-0 right-0 left-0 bottom-0 z-50'>
            <div className='absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2'>
                <div className='bg-slate-50 border-2 shadow-lg rounded-md p-3 px-6 relative w-[700px]'>
                    <X onClick={() => setShowAddToCartBox(false)} className="absolute top-2 right-2 opacity-70 cursor-pointer hover:opacity-100" />
                    <div className="gap-7 flex mt-11 justify-between">
                        <div className="flex flex-col gap-3 flex-1">
                            <div className="flex flex-col gap-3">
                                <span className='text-gray-700'>Select color:</span>
                                <div className="flex items-center gap-2">
                                    {product.colors.length > 0 && (
                                        product.colors.map((color) => (
                                            <span
                                                onClick={() => {
                                                    setData({ ...data, color_id: color.id })
                                                }}
                                                key={color.id}
                                                style={{ backgroundColor: color.name, borderColor: data.color_id === color.id ? "gray" : "", opacity: data.color_id !== color.id ? "0.5" : "" }}
                                                className='h-7 w-7 block rounded-full border-2 cursor-pointer'>
                                            </span>
                                        ))
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <span className='text-gray-700'>Select size:</span>
                                <div className='flex flex-wrap gap-2'>
                                    {product.sizes.length > 0 && (
                                        product.sizes.map((size) => (
                                            <div
                                                style={{ borderColor: size.id === data.size_id ? "gray" : "", opacity: size.id !== data.size_id ? "0.8" : "" }}
                                                onClick={() => {
                                                    setData({ ...data, size_id: size.id })
                                                }}
                                                className='border-2 p-2 px-4 rounded-md cursor-pointer' key={size.id}>
                                                {size.size.en}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <span className='text-gray-700'>Select quantity:</span>
                                <div className='flex items-center gap-1'>
                                    <button
                                        onClick={() => {
                                            if (quantity > product.quantity) {
                                                return
                                            } else {
                                                setQuantity(prev => prev + 1)
                                            }
                                        }}
                                        className='bg-slate-100 p-3 rounded-md border-2'>+</button>
                                    <div className='px-4 py-3 bg-slate-50 border-2 rounded-md'>
                                        {quantity}
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (quantity <= 1) {
                                                return
                                            } else {
                                                setQuantity(prev => prev - 1)
                                            }
                                        }}
                                        className='bg-slate-100 p-3 rounded-md border-2'>-</button>
                                </div>
                            </div>
                            <button
                                style={{ opacity: isLoading ? "0.6" : "1" }}
                                onClick={handleAddProductToCart}
                                className='bg-blue-600 w-full mt-3 rounded-md text-white py-[8px] px-3 font-secondry hover:bg-blue-700 transition-all duration-300 flex items-center gap-3 justify-center'>
                                <span>{t("add_to_cart")}</span>

                                <ShoppingBagIcon size={18} />
                            </button>
                        </div>
                        <div className="border-2 rounded-lg overflow-hidden border-gray-300">
                            <img src={product?.images[0]?.image_url} className="w-[350px] h-[350px]" alt="image not found" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddToCartBox