import axios from 'axios'
import { useState, useEffect } from 'react'
import useInsertGlobalDataTrigger from '../../../../store/useInsertData'
import useSetToken from '../../../../store/useSetToken'
import LoadingSpinner from '../../../LoadingSpinner'
import { useTranslation } from 'react-i18next'

// eslint-disable-next-line react/prop-types
const BrandsTable = ({ brands, setBrands, getBrands, setGetBrands }) => {
    const { t } = useTranslation()
    const { accessToken } = useSetToken()
    const { toggleRefetch } = useInsertGlobalDataTrigger()
    const [deletingIds, setDeletingIds] = useState(new Set())

    useEffect(() => {
        if (getBrands !== "idle") return
        setGetBrands("fetching")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const deleteBrand = async (id) => {
        setDeletingIds(prev => new Set(prev).add(id))
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/brands/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            // eslint-disable-next-line react/prop-types
            setBrands(brands.filter((itm) => itm.id !== id))
            toggleRefetch("brands")
        } catch (error) {
            console.log(error)
        } finally {
            setDeletingIds(prev => {
                const newSet = new Set(prev)
                newSet.delete(id)
                return newSet
            })
        }
    }


    return (
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    <tr className="border-b">
                        <th className=" py-2">{t("id")}</th>
                        <th className=" py-2">{t("image")}</th>
                        <th className="py-2">{t("name")}</th>
                        <th className=" py-2">{t("status")}</th>
                        <th className=" py-2">{t("action")}</th>
                    </tr>
                </thead>
                <tbody>
                    {brands && (
                        brands.map((brand) => (
                            <tr key={brand.id} className="border-b">
                                <td className="py-2">{brand.id}</td>
                                <td className="py-2">
                                    <img src={brand.image_url} alt='brand_image' className='w-11 h-11 rounded-md' />
                                </td>
                                <td className="py-2">{brand.name.en}</td>
                                <td className="py-2">{brand.status}</td>
                                <td className="py-2 text-right">
                                    <button
                                        onClick={() => deleteBrand(brand.id)}
                                        disabled={deletingIds.has(brand.id)}
                                        className="text-red-500 hover:text-red-700 overflow-hidden">
                                        {deletingIds.has(brand.id) ? (
                                            <LoadingSpinner w={18} h={18} />
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="inline"
                                            >
                                                <path d="M3 6h18"></path>
                                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                            </svg>
                                        )}

                                    </button>
                                </td>
                            </tr>
                        ))
                    )}

                </tbody>
            </table>
        </div>
    )
}

export default BrandsTable