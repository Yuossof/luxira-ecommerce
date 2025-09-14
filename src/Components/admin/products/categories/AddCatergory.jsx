import { useState } from 'react'
import axios from 'axios'
import useSetToken from '../../../../store/useSetToken'
import useInsertGlobalDataTrigger from '../../../../store/useInsertData'
import LoadingSpinner from '../../../LoadingSpinner'

const AddCategory = () => {
    const [category, setCategory] = useState({
        name_en: "",
        name_ar: "",
        status: "active"
    })
    const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [validationMessage, setValidationMessage] = useState("")
    const { accessToken } = useSetToken()
    const { toggleRefetch } = useInsertGlobalDataTrigger()

    const addCategory = async () => {
        if (!category.name_en || !category.name_ar || !image) {
            setValidationMessage("All fields are required")
            return
        }

        setIsLoading(true)

        const formData = new FormData()
        formData.append("name_en", category.name_en)
        formData.append("name_ar", category.name_ar)
        formData.append("status", category.status)
        formData.append("image", image)

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/categories/store`, formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log(res.data)
            toggleRefetch("categories")
            setCategory({
                name_en: "",
                name_ar: "",
                status: "active"
            })
            setImage(null)
            setValidationMessage("")
        } catch (error) {
            console.log(error)
            setValidationMessage(error?.response?.data?.message?.split(".")[0] || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <div className="space-y-4">
                <div>
                    <label htmlFor="category-name-en" className="block mb-1 font-medium">
                        Category Name (EN)
                    </label>
                    <input
                        id="category-name-en"
                        type="text"
                        className="w-full border rounded p-2"
                        placeholder="Enter English name"
                        value={category.name_en}
                        onChange={(e) => setCategory({ ...category, name_en: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="category-name-ar" className="block mb-1 font-medium">
                        Category Name (AR)
                    </label>
                    <input
                        id="category-name-ar"
                        type="text"
                        className="w-full border rounded p-2"
                        placeholder="Enter Arabic name"
                        value={category.name_ar}
                        onChange={(e) => setCategory({ ...category, name_ar: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="category-image" className="block mb-1 font-medium">
                        Category Image
                    </label>
                    <input
                        id="category-image"
                        type="file"
                        className="w-full border rounded p-2"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>

                {validationMessage && (
                    <div className="text-red text-sm">*{validationMessage}</div>
                )}

                <button
                    onClick={() => addCategory()}
                    disabled={isLoading}
                    style={{ opacity: isLoading ? "0.7" : "1" }}
                    className="w-full bg-black items-center justify-center text-white py-2 relative flex rounded hover:bg-gray-800">
                    <span>
                        Add Category
                    </span>
                    {isLoading && (
                        <span className='absolute right-2 h-full flex items-center'>
                            <LoadingSpinner w={20} h={20}/>
                        </span>
                    )}
                </button>
            </div>
        </div>
    )
}

export default AddCategory
