import { useState, useEffect } from 'react'
import axios from 'axios'
import useSetToken from '../../../../store/useSetToken'
import useInsertGlobalDataTrigger from '../../../../store/useInsertData'
import LoadingSpinner from '../../../LoadingSpinner'
import { useTranslation } from 'react-i18next'

// eslint-disable-next-line react/prop-types
const ColorsTable = ({ colors, setGetColors, setColors, getColors }) => {
    const {t} = useTranslation()
    const { accessToken } = useSetToken()
    const { toggleRefetch } = useInsertGlobalDataTrigger()
    const [deletingIds, setDeletingIds] = useState(new Set())
    useEffect(() => {
        if (getColors !== "idle") return
        setGetColors("fetching")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const deleteColor = async (id) => {
        setDeletingIds(prev => new Set(prev).add(id))
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/colors/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            // eslint-disable-next-line react/prop-types
            setColors(colors.filter(itm => itm.id !== id))
            toggleRefetch("colors")
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
                        <th className="py-2">{t("id")}</th>
                        <th className="py-2">{t("name")}</th>
                        <th className="py-2">{t("color")}</th>
                        <th className="py-2">{t("action")}</th>
                    </tr>
                </thead>
                <tbody>
                    {/* eslint-disable-next-line react/prop-types */}
                    {colors.map((color) => (
                        <tr key={color.id} className="border-b">
                            <td className="py-2">{color.id}</td>
                            <td className="py-2">{color.name.en}</td>
                            <td className="py-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: color.name }} />
                                    <span>{color.name}</span>
                                </div>
                            </td>
                            <td className="py-2 text-right">
                                <button
                                    onClick={() => deleteColor(color.id)}
                                    disabled={deletingIds.has(color.id)}
                                    className="text-red-500 hover:text-red-700 overflow-hidden">
                                    {deletingIds.has(color.id) ? (
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
        </div>
    )
}

export default ColorsTable