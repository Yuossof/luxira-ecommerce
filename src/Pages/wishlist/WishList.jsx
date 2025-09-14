"use client"

import { useState, useEffect } from "react"
import { CiHeart } from "react-icons/ci"
import { ShoppingBagIcon, HeartIcon } from "lucide-react"
import axios from "axios"
import useSetToken from "../../store/useSetToken"
// Rating Component
const Rating = ({ children }) => {
  return <div className="flex items-center gap-1">{children}</div>
}

const RatingStar = ({ filled = true }) => {
  return (
    <svg
      className={`w-4 h-4 ${filled ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

Rating.Star = RatingStar

const WishlistPage = () => {
  const { accessToken } = useSetToken()
  const [wishlistItems, setWishlistItems] = useState([])
  useEffect(() => {
    const getWishList = async () => {
      const url = `${import.meta.env.VITE_API_URL}/api/whishlistes`;
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setWishlistItems(res.data?.data || []);  
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    }
    getWishList()
  }, [accessToken])

  const navigate = (path) => {
    console.log(`Navigating to: ${path}`)
  }

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const addToCart = (product) => {
    console.log(`Adding ${product.translatable_name} to cart`)
  }

  useEffect(() => {
    console.log(accessToken)
    const getCartItems = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/api/whishlistes`;
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("wish", res.data);
      } catch (error) {
        console.log("Failed to fetch products:dddd", error);
      }
    };

    getCartItems();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <HeartIcon className="text-red-500 w-8 h-8" />
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {wishlistItems.length} items
            </span>
          </div>
          <p className="text-gray-600 mt-2">Save your favorite items for later</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {wishlistItems?.length === 0 ? (
          <div className="text-center py-16">
            <HeartIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Start adding items you love to your wishlist</p>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition-all duration-300">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems?.length > 0 && (
              wishlistItems.map((product) => (
                <div key={product.id} className="p-4 shadow-main rounded-md border-[1px] border-slate-200 bg-white">
                  <div className="flex items-center justify-center relative">
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute right-[20px] top-[10px] bg-white rounded-full text-[30px] text-red-500 p-1 hover:bg-red-50 transition-all duration-200 z-10"
                    >
                      <CiHeart className="fill-current" />
                    </button>
                    <img
                      src={product.images[0].image_url || "/placeholder.svg"}
                      className="w-full aspect-square object-cover rounded-md"
                      alt={product.translatable_name}
                    />
                  </div>
                  <div className="p-2 flex flex-col gap-1">
                    <span
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="font-semibold text-[17px] cursor-pointer hover:text-blue-500 transition-colors duration-200"
                    >
                      {product.translatable_name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-red-500">${product.price}</span>
                      <Rating>
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star filled={false} />
                      </Rating>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-4 h-4 rounded-full bg-blue-500 border-[1px] border-slate-300"></div>
                      <div className="w-4 h-4 rounded-full bg-red-500 border-[1px] border-slate-300"></div>
                      <div className="w-4 h-4 rounded-full bg-gray-500 border-[1px] border-slate-300"></div>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-500 w-full mt-3 rounded-md text-white py-[8px] font-secondary hover:bg-blue-600 transition-all duration-300 flex items-center gap-3 justify-center"
                  >
                    <span>Add to Cart</span>
                    <ShoppingBagIcon size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default WishlistPage
