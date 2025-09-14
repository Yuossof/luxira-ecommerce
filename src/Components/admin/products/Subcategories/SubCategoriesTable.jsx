import axios from 'axios'
import { useEffect, useState } from 'react'
import useSetToken from '../../../../store/useSetToken'
import useInsertGlobalDataTrigger from '../../../../store/useInsertData'
import LoadingSpinner from '../../../LoadingSpinner'
import { Edit, Trash2 } from 'lucide-react'

const SubCategoriesTable = ({}) => {
    const { accessToken } = useSetToken()
    const [showUpdateBox, setShowUpdateBox] = useState(false)
    const { toggleRefetch, refetchTriggers } = useInsertGlobalDataTrigger()
    const [subcategories, setSubcategories] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    const [imgSrc, setImageSrc] = useState("")
    const [deletingIds, setDeletingIds] = useState(new Set())
    const [makeLoading, setMakeLoading] = useState(true)
    const [newData, setNewData] = useState({
        name_en: "",
        name_ar: "",
        image: null,
        status: "",
        category_id: ""
    })

    const fetchSubcategories = async (controller) => {
        if(makeLoading) {
            setIsLoading(true)
        }
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/subcategories`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                signal: controller.signal
            })
            console.log(res.data)
            setSubcategories(res.data.data.subcategories || [])
        } catch (error) {
            console.log("Failed to fetch subcategories:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const controller = new AbortController()
        fetchSubcategories(controller)
        return ()=> controller.abort()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refetchTriggers.subCategories])

    const deleteSubcategory = async (id) => {
        setDeletingIds(prev => new Set(prev).add(id))
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/subcategories/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            setSubcategories(subcategories.filter(itm=> itm.id !== id))
            toggleRefetch("subCategories")
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
        formData.append("category_id", newData.category_id)

        if (newData.image instanceof File) {
            formData.append("image", newData.image)
        }
        setSaveLoading(true)
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/subcategories/update/${editingId}`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            setShowUpdateBox(false)
            toggleRefetch("subCategories")
        } catch (error) {
            console.error("Failed to update subcategory:", error)
        } finally {
            setSaveLoading(false)
        }
    }

    const [showImage, setShowImage] = useState(false)
    return (
        <>
            {showImage && (
                <div onClick={() => setShowImage(false)} className='fixed top-0 right-0 left-0 bottom-0 w-full flex justify-center py-5 bg-black bg-opacity-55 z-50'>
                    <img onClick={(e) => e.preventDefault()} src={imgSrc} alt='img' className='rounded-md h-[700px] w-[700px]' />
                </div>
            )}
            {showUpdateBox && (
                <div className='fixed inset-0 bg-black bg-opacity-55 flex items-center justify-center z-50'>
                    <div className='bg-white p-6 rounded shadow-md w-full max-w-md'>
                        <h2 className="text-lg font-bold mb-4">Edit Subcategory</h2>
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
                        <input
                            type="text"
                            value={newData.category_id}
                            onChange={e => setNewData({ ...newData, category_id: e.target.value })}
                            placeholder="Category ID"
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
                {isLoading ? (
                    <div className="text-center py-6 flex w-full h-full justify-center items-center mt-11"><LoadingSpinner w={22} h={22}/></div>
                ) : (
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
                            {subcategories.map((subcategory) => (
                                <tr key={subcategory.id} className="border-b">
                                    <td className="py-2">{subcategory.id}</td>
                                    <td className="py-2">
                                        <img
                                            onClick={() => {
                                                setShowImage(true)
                                                setImageSrc(subcategory.image_url)
                                            }}
                                            src={subcategory.image_url} alt='brand_image' className='w-11 h-11 rounded-md' />
                                    </td>
                                    <td className="py-2">{subcategory.name?.en || "No Name"}</td>
                                    <td className="py-2">{subcategory.status}</td>
                                    <td className="py-2 text-right">
                                        <button
                                            onClick={() => {
                                                setEditingId(subcategory.id)
                                                setNewData({
                                                    name_en: subcategory.name?.en || "",
                                                    name_ar: subcategory.name?.ar || "",
                                                    image: null,
                                                    status: subcategory.status || "",
                                                    category_id: subcategory.category_id || ""
                                                })
                                                setShowUpdateBox(true)
                                            }}
                                            className="text-gray-700 hover:text-gray-800"
                                        >
                                            <Edit size={20}/>
                                        </button>
                                        <button
                                            disabled={deletingIds.has(subcategory.id)}
                                            onClick={() => {
                                                deleteSubcategory(subcategory.id)
                                                if(makeLoading) {
                                                    setMakeLoading(false)
                                                }
                                            }}  
                                            className="text-gray-700 hover:text-gray-800 ml-2 overflow-hidden"
                                        >
                                            {deletingIds.has(subcategory.id) ? (
                                                <LoadingSpinner w={18} h={18} />
                                            ) : (
                                                <Trash2 size={20}/>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}

export default SubCategoriesTable
