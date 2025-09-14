import { useState, useEffect } from "react"
import axios from "axios"
import useSetToken from "../../../store/useSetToken"
import { RotateCcw } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function Discount() {
    const {t} = useTranslation()
    const { accessToken } = useSetToken()
    const [formData, setFormData] = useState({
        start_date: "",
        end_date: "",
        discount_percentage: "",
    })

    const [code, setCode] = useState("")

    const [showProductDropdown, setShowProductDropdown] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    function generateRandomCode(length = 9) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            result += chars[randomIndex];
        }

        return result;
    }

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
        setIsLoading(true)

        try {
            // Convert price to number for the request
            const requestData = {
                ...formData,
                discount_percentage: Number.parseFloat(formData.discount_percentage),
            }

            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/offers/store`, {...requestData, code, product_id: selectedProduct.id}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            console.log(res.data)
            // setResponse(res.data)
        } catch (error) {
            console.error("Error sending request:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const isFormValid = code && formData.start_date && formData.end_date && formData.discount_percentage

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[80%] mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t("create_new_coupon")}</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t("product")}</label>
                            <button
                                type="button"
                                className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                onClick={() => setShowProductDropdown(!showProductDropdown)}
                            >
                                <span className={selectedProduct ? "text-gray-900" : "text-gray-400"}>
                                    {selectedProduct?.name.en || t("select_product")}
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
                        {/* Code Input */}
                        <div>
                            <label htmlFor="code" className="text-sm font-medium text-gray-700 mb-1 w-full flex items-center justify-between">
                                <span>{t("code")}</span>
                                <span className="mb-1 cursor-pointer hover:opacity-90 active:opacity-100" onClick={()=> {
                                    const newCode = generateRandomCode()
                                    setCode(newCode)
                                }}>
                                    <RotateCcw size={20}/>
                                </span>
                            </label>
                            <input
                                type="text"
                                id="code"
                                name="code"
                                value={code}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter code"
                                required
                            />
                        </div>

                        {/* Start Date Input */}
                        <div>
                            <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-1">
                                {t("start_date")}
                            </label>
                            <input
                                type="date"
                                id="start_date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* End Date Input */}
                        <div>
                            <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-1">
                                {t("end_date")}
                            </label>
                            <input
                                type="date"
                                id="end_date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleInputChange}
                                min={formData.start_date}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Price Input */}
                        <div>
                            <label htmlFor="discount_percentage" className="block text-sm font-medium text-gray-700 mb-1">
                                {t("discount_percentage")}
                            </label>
                            <input
                                type="text"
                                id="discount_percentage"
                                name="discount_percentage"
                                value={formData.discount_percentage}
                                onChange={handleInputChange}
                                step="0.01"
                                min="0"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="0.00"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!isFormValid || isLoading}
                            className="w-full bg-slate-700 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? "Sending..." : t("create_coupon")}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )
}
