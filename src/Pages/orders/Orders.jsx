import axios from "axios"
import { useEffect, useState } from "react"
import useSetToken from "../../store/useSetToken"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import { useSearchParams } from "react-router-dom"

export default function OrdersPage() {
  const { accessToken } = useSetToken()
  const { i18n } = useTranslation()
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id")
  const token = searchParams.get("token")
  const PayerID = searchParams.get("PayerID")
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState("pendding")
  const getStatusColor = (status) => {
    switch (status) {
      case "complete":
        return "text-green-600 bg-green-100"
      case "cancel":
        return "text-blue-600 bg-blue-100"
      case "Pending":
        return "text-orange-600 bg-orange-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  useEffect(() => {
    if(!token || !PayerID) return
    const paypalRq = async () => {
      const url = `${import.meta.env.VITE_API_URL}/api/payment/success_paypal?token=${token}&PayerID=${PayerID}`
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Accept-Language": i18n.language,
          },
        })
        console.log(response.data)
        toast.success(response.data.data.message)
      } catch (error) {
        if(error.status !== 401) {
          toast.error(error.response.data.message || error.response.data.error)
        }
      }
    }

    paypalRq()
  }, [token, accessToken,PayerID])

  useEffect(() => {
    if (!sessionId) return
    const sessionRq = async () => {
      const url = `${import.meta.env.VITE_API_URL}/api/payment/success_stripe?session_id=${sessionId}`
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Accept-Language": i18n.language,
          },
        })
        console.log(response.data)
        toast.success(response.data.data.message)
      } catch (error) {
        console.log(error)
        if (error.status !== 401) {
          toast.error(error.response.data.message || error.response.data.error || "something went wrong")
        }
      }
    }

    sessionRq()
  }, [sessionId, accessToken])

  useEffect(() => {

    const getOrders = async () => {
      const url = `${import.meta.env.VITE_API_URL}/api/orders`
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Accept-Language": i18n.language,
          },
        })
        console.log((response.data?.data?.orders || []))
        setOrders(response.data?.data?.orders || [])
      } catch (error) {
        if (error.status !== 401) {
          toast.error(error.response.data.message || error.response.data.error || "something went wrong")
        }
      }
    }
    getOrders()
  }, [accessToken, i18n.language])

  const filteredOrders =
    activeTab === "All"
      ? orders
      : orders.filter((order) => order.status.toLowerCase() === activeTab.toLowerCase())

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-8 mt-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">Track and manage your orders</p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order #{order.id}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Ordered on {new Date(order.created_at).toLocaleDateString()}
                </div>
              </div>

              {/* Order Info */}
              <div className="mb-4 space-y-1 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Customer:</span>{" "}
                  {order.first_name} {order.last_name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {order.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {order.phone}
                </p>
                <p>
                  <span className="font-medium">Address:</span> {order.address}
                </p>
                <p>
                  <span className="font-medium">Payment:</span>{" "}
                  {order.payment_method}
                </p>
                {order.comment && (
                  <p>
                    <span className="font-medium">Comment:</span>{" "}
                    {order.comment}
                  </p>
                )}
              </div>

              {/* Order Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100">
                <div className="text-lg font-semibold text-gray-900 mb-2 sm:mb-0">
                  Total: ${order.total}
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                    View Details
                  </button>
                  {order.status === "Delivered" && (
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-600">
              When you place orders, they will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
