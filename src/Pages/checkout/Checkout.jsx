"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import useSetToken from "../../store/useSetToken"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom"
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Checkout() {
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const { accessToken } = useSetToken()
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    phone: "",
    comment: "",
  })

  const [data, setData] = useState([])
  const [selectedCity, setSelectedCity] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [orderItems, setOrderItems] = useState([])
  const [total, setTotal] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/order/create`,
        {
          ...formData,
          payment_method: paymentMethod,
          shipping_id: selectedCity,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = response.data?.data;

      if (!data) {
        toast.error("No payment data returned from server.");
        return;
      }

      if(paymentMethod === "cache") {
        navigate("/orders")
      }
      // Stripe checkout
      if (data.sessionId) {
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });
        if (error) {
          console.error("Stripe error:", error);
          toast.error("Something went wrong with Stripe checkout.");
        }
        return;
      }

      // PayPal checkout
      if (data.approval_url) {
        console.log(data)
        window.location.href = data.approval_url;
        toast.success(data.message)
        return;
      }

    } catch (error) {
      console.error(error);
      const err =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "An unexpected error";
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getCheckoutData = async () => {
      if (!accessToken) return
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/checkout`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setData(res.data.data.shippings)
        console.log("ship", res.data.data)

      } catch (error) {
        const err = error.response.data.message || error.response.data.error || "An unexpected error"
        toast.error(err)
      }
    }

    getCheckoutData()
  }, [accessToken])

  useEffect(() => {
    const getCartItems = async () => {
      if (!accessToken) return
      try {
        let ttl = 0
        const url = `${import.meta.env.VITE_API_URL}/api/cart`;
        const res = await axios.get(url, {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Accept-Language": i18n.language
          },
        });
        console.log("cart", res.data)
        const cartProducts = res.data.data.cart_products
        setOrderItems(cartProducts)
        cartProducts.forEach(element => {
          ttl = ttl + Number(element.total_price)
        });

        setTotal(ttl)
        console.log("fsakfaksfk", res.data)
      } catch (error) {
        const err = error.response.data.message || error.response.data.error || "An unexpected error"
        toast.error(err)
      }
    };

    getCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your purchase securely</p>
        </div>

        <form onSubmit={handleCreateOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Forms */}
            <div className="space-y-6">
              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  <h2 className="text-xl font-semibold text-gray-900">Shipping Information</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="123 Main Street"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="123 Main Street"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Comment
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      placeholder="Comment"
                      value={formData.comment}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <select
                        value={selectedCity ?? ""}
                        onChange={(e) => setSelectedCity(Number(e.target.value))}
                        className="px-2 w-full mt-1 rounded-md py-2.5 border border-gray-300 shadow-sm"
                      >
                        <option value="" disabled>
                          {i18n.language === "ar" ? "اختر المدينة" : "Select a city"}
                        </option>
                        {data.map((shipping) => (
                          <option key={shipping.id} value={shipping.id}>
                            {i18n.language === "ar" ? shipping.city.ar : shipping.city.en}
                          </option>
                        ))}
                      </select>

                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <input
                      type="radio"
                      id="stripe"
                      name="paymentMethod"
                      value="stripe"
                      checked={paymentMethod === "stripe"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="card" className="flex-1 cursor-pointer font-medium">
                      Stripe
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <input
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="paypal" className="flex-1 cursor-pointer font-medium">
                      PayPal
                    </label>
                    <div className="w-16 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                      PayPal
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <input
                      type="radio"
                      id="cache"
                      name="cache"
                      value="cache"
                      checked={paymentMethod === "cache"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="card" className="flex-1 cursor-pointer font-medium">
                      Cache
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                <div className="flex items-center gap-2 mb-6">
                  <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
                </div>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {orderItems.length > 0 && (
                    orderItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img
                          src={item.product?.images[0]?.image_url || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-sm text-gray-900">{item.product.name}</h3>
                          <p className="text-gray-600 text-sm">Qty: {item.product.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-900">${item.total_price.toFixed(2)}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="space-y-2">
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between font-semibold text-lg text-gray-900">
                        <span>Total</span>
                        <span>${total}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mb-6">
                  <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span>Your payment information is secure and encrypted</span>
                </div>

                {/* Complete Order Button */}
                <button
                  disabled={isLoading}
                  style={{ opacity: isLoading ? "0.6" : "1" }}
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Complete Order - ${total}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By completing your order, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
