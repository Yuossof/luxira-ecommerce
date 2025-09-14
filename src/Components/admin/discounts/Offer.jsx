import { useState, useEffect } from "react"
import axios from "axios"
import useSetToken from "../../../store/useSetToken"
import { toast, ToastContainer } from "react-toastify"

export default function Discounts() {
  const [showProductDropdown, setShowProductDropdown] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [discountPercentage, setDiscountPercentage] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const { accessToken } = useSetToken()

  useEffect(() => {
    const controller = new AbortController()
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          signal: controller.signal,
        })
        setProducts(res.data.data.products)
        setFilteredProducts(res.data.data.products)
      } catch (error) {
        console.error(error)
      }
    }

    fetchProducts()
    return () => controller.abort()
  }, [accessToken])

  const handleSearch = (val) => {
    const searchVal = val.toLowerCase()
    const filtered = products.filter((product) =>
      product.name.en.toLowerCase().startsWith(searchVal)
    )
    setFilteredProducts(filtered)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedProduct) return toast.error("Please select a product")
    if (!discountPercentage || !startDate || !endDate) return toast.error("Please fill all fields")

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/offers/store`, {
        discount_percentage: discountPercentage,
        start_date: startDate,
        end_date: endDate,
        product_id: selectedProduct.id,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      toast.success(res.data.message)
      // Reset form
      setSelectedProduct(null)
      setDiscountPercentage("")
      setStartDate("")
      setEndDate("")
    } catch (error) {
      const firstKey = Object.keys(error.response.data.errors)[0]
      const firstErrorMessage = error.response.data.errors[firstKey][0]
      toast.error(firstErrorMessage)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Create Discount</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Product Dropdown */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                <button
                  type="button"
                  className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  onClick={() => setShowProductDropdown(!showProductDropdown)}
                >
                  <span className={selectedProduct ? "text-gray-900" : "text-gray-400"}>
                    {selectedProduct?.name.en || "Select product"}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </span>
                </button>

                {showProductDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 max-h-60 overflow-auto">
                    <div className="px-2 mb-2">
                      <input
                        onChange={(e) => handleSearch(e.target.value)}
                        type="text"
                        placeholder="Search..."
                        className="w-full h-11 border border-gray-300 rounded-md px-2 outline-none"
                      />
                    </div>
                    <ul className="py-1">
                      {filteredProducts.map((product) => (
                        <li
                          key={product.id}
                          className="cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-gray-100"
                          onClick={() => {
                            setSelectedProduct(product)
                            setShowProductDropdown(false)
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={product.images[0]?.image_url}
                              alt="Product"
                              className="w-10 h-10 border border-gray-300 rounded-md"
                            />
                            <span className="text-gray-700 font-medium">
                              {product.name.en}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Discount Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Percentage</label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. 15"
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(e.target.value)}
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">%</span>
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 rounded-md text-white font-medium bg-slate-700 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Discount
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}