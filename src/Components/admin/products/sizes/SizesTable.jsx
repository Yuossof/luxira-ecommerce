import axios from 'axios'
import { useEffect, useState } from 'react'
import useSetToken from '../../../../store/useSetToken'
import useInsertGlobalDataTrigger from '../../../../store/useInsertData'
import LoadingSpinner from '../../../LoadingSpinner'
import { useTranslation } from 'react-i18next'


// eslint-disable-next-line react/prop-types
const SizesTable = ({ sizes, setGetSizes, getSizes, setSizes }) => {
    const {t, i18n} = useTranslation()
    const { accessToken } = useSetToken()
    const { toggleRefetch } = useInsertGlobalDataTrigger()
    const [deletingIds, setDeletingIds] = useState(new Set())

    useEffect(() => {
        if (getSizes !== "idle") return
        setGetSizes("fetching")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const deleteSize = async (id) => {
        setDeletingIds(prev => new Set(prev).add(id))
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/sizes/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            // eslint-disable-next-line react/prop-types
            setSizes(sizes.filter(itm => itm.id !== id))
            toggleRefetch("sizes")
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
            {/* eslint-disable-next-line react/prop-types */}
            {sizes.length === 0 ? (
                <div className='flex justify-center items-center w-full mt-9'>
                    <span className='text-gray-500'>
                        No sizes yet!
                    </span>
                </div>
            ) : (
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b">
                            <th className=" py-2">{t("id")}</th>
                            <th className="py-2">{t("name")}</th>
                            <th className=" py-2">{t("action")}</th>
                        </tr>
                    </thead>
                    <tbody className='overflow-hidden'>
                        {/* eslint-disable-next-line react/prop-types */}
                        {sizes.map((size) => (
                            <tr key={size.id} className="border-b ">
                                <td className="py-2">{size.id}</td>
                                <td className="py-2">{size.size.en.toUpperCase()}</td>
                                <td className="py-2 text-right">
                                    <button
                                        onClick={() => deleteSize(size.id)}
                                        disabled={deletingIds.has(size.id)}
                                        className="text-red-500 hover:text-red-700 overflow-hidden">
                                        {deletingIds.has(size.id) ? (
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
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    )
}

export default SizesTable