import { useEffect, useState } from "react"
import useSetToken from "../../../store/useSetToken"
import axios from "axios"
import LoadingSpinner from "../../../Components/LoadingSpinner"
import { Edit, Loader, Search, Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"
export default function Products() {
    const { i18n } = useTranslation()
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { accessToken } = useSetToken()
    const [colorData, setColorData] = useState({})
    const [showColorsBox, setShowColorsBox] = useState(false)

    useEffect(() => {
        const getProducts = async () => {
            setIsLoading(true)
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Accept-Language': i18n.language
                    },
                })
                console.log("prs", res.data)
                setProducts(res.data.data.products)
            } catch (error) {
                console.log("Failed to fetch subcategories:", error)
            } finally {
                setIsLoading(false)
            }
        }

        getProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language])

    const [deleteLoading, setDeleteLoading] = useState(false)
    const [proId, setProId] = useState("")


    const handleDelete = async (id) => {
        try {
            setDeleteLoading(true)
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Accept-Language': i18n.language
                },
            })
            console.log("prs", res.data)
            const newPrs = products.filter((pr) => pr.id !== id)
            setProducts(newPrs)
        } catch (error) {
            console.log(error)
        } finally {
            setDeleteLoading(false)
        }
    }

    if (isLoading) {
        return (
            <div className="w-full mt-24 flex justify-center">
                <LoadingSpinner w={60} h={60} />
            </div>
        )
    }

    return (
        <div className="p-6">
            {showColorsBox && (
                <div onClick={() => setShowColorsBox(false)} className="bg-black bg-opacity-15 top-0 right-0 bottom-0 left-0 fixed w-full h-full flex justify-center items-start pt-[250px] z-50">
                    <div onClick={(e) => e.stopPropagation()} className="bg-slate-100 rounded-md flex p-8 items-center gap-5 border-[1px] border-gray-300">
                        {colorData.map(color => (
                            <div key={color.id} className="flex flex-col items-center gap-4">
                                <div style={{ backgroundColor: color.name }} className="w-20 h-20 rounded-full"></div>
                                <span className="text-gray-700 font-semibold text-lg">{color.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="w-full mb-5">
                <div className="flex items-center w-[90%] md:w-[25%]">
                    <input type="text" placeholder="Search..." className="outline-none border-[1px] border-gray-400 bg-gray-50 rounded-l-lg h-11 pl-2 flex-1" />
                    <span className="h-11 px-3 bg-slate-700 flex justify-center items-center rounded-r-lg border-r-[1px] border-t-[1px] border-b-[1px] border-gray-400">
                        <Search className="text-white" />
                    </span>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200 bg-slate-700 rounded-t-lg">
                    <h2 className="text-xl font-semibold text-gray-100">Products</h2>
                </div>
                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse ltr">
                            <thead className={i18n.language === "ar" ? "text-right" : "text-left"} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
                                {i18n.language === "en" ? (
                                    <tr className="border-b border-gray-200">
                                        <th className="py-3 px-4 font-medium text-gray-900">Product Name</th>
                                        <th className="py-3 px-4 font-medium text-gray-900">SubCategory</th>
                                        <th className="py-3 px-4 font-medium text-gray-900">Price</th>
                                        <th className="py-3 px-4 font-medium text-gray-900">Quantity</th>
                                        <th className="py-3 px-4 font-medium text-gray-900">Colors</th>
                                        <th className="py-3 px-4 font-medium text-gray-900">Sizes</th>
                                        <th className="py-3 px-4 font-medium text-gray-900">Brand</th>
                                        <th className="py-3 px-4 font-medium text-gray-900">Status</th>
                                        <th className="py-3 px-4 font-medium text-gray-900">Action</th>
                                    </tr>
                                ) : (
                                    <tr className="border-b border-gray-200">
                                        <th className="py-3 px-4 font-medium text-gray-900">الإجراء</th>
                                        <th className="py-3 px-4 font-medium text-gray-900">الحالة</th>
                                        <th className="py-3 px-4 font-medium text-gray-900">العلامة التجارية</th>
                                        <th className="py-3 px-4 font-medium text-gray-900">المقاسات</th>
                                        <th className="py-3 px-4 font-medium text-gray-900">الألوان</th>
                                        <th className="py-3 px-4 font-medium text-gray-900">الكمية</th>
                                        <th className="py-3 px-4 font-medium text-gray-900">السعر</th>
                                        <th className="py-3 px-4 font-medium text-gray-900">الفئة الفرعية</th>
                                        <th className="py-3 px-4 font-medium text-gray-900">اسم المنتج</th>
                                    </tr>
                                )}
                            </thead>
                            <tbody>
                                {products.map((product, i) => (
                                    i18n.language === "en" ? (
                                        <tr key={product.id} className={`border-b border-gray-100  ${i % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}`}>
                                            <td className="py-3 px-4 text-gray-700">{product.translatable_name}</td>
                                            <td className="py-3 px-4 text-gray-700">{product.subcategory.category.translatable_name}</td>
                                            <td className="py-3 px-4 text-gray-700">${product.price}</td>
                                            <td className="py-3 px-4 text-gray-700">{product.quantity}</td>
                                            <td>
                                                <div className="flex relative h-5 hover:scale-110 transition-all cursor-pointer"
                                                    onClick={() => { setShowColorsBox(true); setColorData(product.colors); }}>
                                                    {product.colors.map((color, index) => (
                                                        <p key={color.id} style={{
                                                            backgroundColor: color.name,
                                                            left: `${index * 13}px`,
                                                            zIndex: product.colors.length - index,
                                                        }}
                                                            className="w-5 h-5 rounded-full border-[1px] border-gray-400 absolute transition-all duration-200"></p>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-700 flex gap-2 items-center">
                                                {product.sizes?.map((size) => (
                                                    <div key={size.id} className="border-2 px-2 rounded-md p-1">
                                                        {size.translatable_size}
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="py-3 px-4 text-gray-700">{product.brand.translatable_name}</td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                    {product.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-700 flex items-center gap-3">
                                                <Edit className="text-gray-600 cursor-pointer hover:text-gray-700" />
                                                {deleteLoading && proId === product.id && (
                                                    <Loader className="animate-spin text-gray-700" />
                                                )}
                                                {!deleteLoading && (
                                                    <Trash2 onClick={() => {
                                                        setProId(product.id)
                                                        handleDelete(product.id)
                                                    }} className="text-gray-600 cursor-pointer hover:text-gray-700" />
                                                )}
                                            </td>

                                        </tr>
                                    ) : (
                                        <tr key={product.id} className={`border-b border-gray-100  ${i % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}`}>
                                            <td className="py-3 px-4 text-gray-700 flex items-center gap-3">

                                                <Edit className="text-gray-600 cursor-pointer hover:text-gray-700" />
                                                {deleteLoading && proId === product.id && (
                                                    <Loader className="animate-spin text-gray-700" />
                                                )}
                                                {!deleteLoading && (
                                                    <Trash2 onClick={() => {
                                                        setProId(product.id)
                                                        handleDelete(product.id)
                                                    }} className="text-gray-600 cursor-pointer hover:text-gray-700" />
                                                )}

                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                    {product.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-700">{product.brand.translatable_name}</td>
                                            <td className="py-3 px-4 text-gray-700 flex gap-2 items-center">
                                                {product.sizes?.map((size) => (
                                                    <div key={size.id} className="border-2 px-2 rounded-md p-1">
                                                        {size.translatable_size}
                                                    </div>
                                                ))}
                                            </td>
                                            <td>
                                                <div className="flex relative h-5 hover:scale-110 transition-all cursor-pointer"
                                                    onClick={() => { setShowColorsBox(true); setColorData(product.colors); }}>
                                                    {product.colors.map((color, index) => (
                                                        <p key={color.id} style={{
                                                            backgroundColor: color.name,
                                                            left: `${index * 13}px`,
                                                            zIndex: product.colors.length - index,
                                                        }}
                                                            className="w-5 h-5 rounded-full border-[1px] border-gray-400 absolute transition-all duration-200"></p>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-700">{product.quantity}</td>
                                            <td className="py-3 px-4 text-gray-700">${product.price}</td>
                                            <td className="py-3 px-4 text-gray-700">{product.subcategory.category.translatable_name}</td>
                                            <td className="py-3 px-4 text-gray-700">{product.translatable_name}</td>
                                        </tr>
                                    )
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
