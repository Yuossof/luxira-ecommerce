/* eslint-disable react/prop-types */
import axios from 'axios'
import { useState } from 'react'
import useInsertGlobalDataTrigger from '../../../../store/useInsertData'
import useSetToken from '../../../../store/useSetToken'
import LoadingSpinner from '../../../LoadingSpinner'
import { Edit, Trash2 } from 'lucide-react'

const CategoriesTable = ({ categories, setCategories }) => {
    const { accessToken } = useSetToken()
    const [deletingIds, setDeletingIds] = useState(new Set())
    const [showUpdateBox, setShowUpdateBox] = useState(false)
    const { toggleRefetch } = useInsertGlobalDataTrigger()
    const [editingId, setEditingId] = useState(null)
    const [saveLoading, setSaveLoading] = useState(false)
    const [newData, setNewData] = useState({
        name_en: "",
        name_ar: "",
        image: null,
        status: "",
        category_id: ""
    })
    
    const deleteCategory = async (id) => {
        setDeletingIds(prev => new Set(prev).add(id))
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/categories/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            setCategories(categories.filter(itm => itm.id !== id))
            toggleRefetch("categories")
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

    const handleUpdate = async () => {
        if (!editingId) return

        const formData = new FormData()
        formData.append("name_en", newData.name_en)
        formData.append("name_ar", newData.name_ar)
        formData.append("status", newData.status)

        if (newData.image instanceof File) {
            formData.append("image", newData.image)
        }
        setSaveLoading(true)
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/categories/update/${editingId}`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            setShowUpdateBox(false)
            toggleRefetch("categories")
        } catch (error) {
            console.error("Failed to update subcategory:", error)
        } finally {
            setSaveLoading(false)
        }
    }


    return (
        <>
            {showUpdateBox && (
                <div className='fixed inset-0 bg-black bg-opacity-55 flex items-center justify-center z-50'>
                    <div className='bg-white p-6 rounded shadow-md w-full max-w-md'>
                        <h2 className="text-lg font-bold mb-4">Edit Category</h2>
                        <input
                            type="text"
                            value={newData.name_en}
                            onChange={e => setNewData({ ...newData, name_en: e.target.value })}
                            placeholder="Name (EN)"
                            className="w-full mb-2 p-2 border rounded"
                        />
                        <input
                            type="text"
                            value={newData.name_ar}
                            onChange={e => setNewData({ ...newData, name_ar: e.target.value })}
                            placeholder="Name (AR)"
                            className="w-full mb-2 p-2 border rounded"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => setNewData({ ...newData, image: e.target.files[0] })}
                            className="w-full mb-2 p-2 border rounded"
                        />
                        <input
                            type="text"
                            value={newData.status}
                            onChange={e => setNewData({ ...newData, status: e.target.value })}
                            placeholder="Status"
                            className="w-full mb-2 p-2 border rounded"
                        />
                        <div className="flex justify-end space-x-2 mt-4">
                            <button onClick={() => setShowUpdateBox(false)} className="px-4 py-2 bg-gray-300 rounded">
                                Cancel
                            </button>
                            <button onClick={handleUpdate} className="px-4 py-2 bg-gray-900 text-white rounded">
                                {saveLoading ? <LoadingSpinner /> : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-2">ID</th>
                            <th className="text-left py-2">Image</th>
                            <th className="text-left py-2">Name</th>
                            <th className="text-left py-2">Status</th>
                            <th className="text-right py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id} className="border-b">
                                <td className="py-2">{category.id}</td>
                                <td className="py-2">
                                    <img src={category.image_url} alt='brand_image' className='w-11 h-11 rounded-md' />
                                </td>
                                <td className="py-2">{category.name ? category.name.en : "No Name"}</td>
                                <td className="py-2">{category.status}</td>
                                <td className="py-2 text-right">
                                    <button
                                        onClick={() => {
                                            setEditingId(category.id)
                                            setNewData({
                                                name_en: category.name?.en || "",
                                                name_ar: category.name?.ar || "",
                                                image: null,
                                                status: category.status || "",
                                            })
                                            setShowUpdateBox(true)
                                        }}
                                        className="text-gray-700 hover:text-gray-800"
                                    >
                                        <Edit size={20} />
                                    </button>
                                    <button
                                        onClick={() => deleteCategory(category.id)}
                                        disabled={deletingIds.has(category.id)}
                                        className="text-gray-700 hover:text-gray-800 overflow-hidden ml-2">
                                        {deletingIds.has(category.id) ? (
                                            <LoadingSpinner w={18} h={18} />
                                        ) : (
                                            <Trash2 size={20} />
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CategoriesTable
