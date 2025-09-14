import { useState } from 'react'
import axios from 'axios'
import useSetToken from '../../../../store/useSetToken'
import useInsertGlobalDataTrigger from '../../../../store/useInsertData'
import LoadingSpinner from '../../../LoadingSpinner'
import { useTranslation } from 'react-i18next'
// eslint-disable-next-line react/prop-types
const AddSubcategories = ({ categories, showUpdateButton }) => {
    const {t} = useTranslation()
    const [subcategory, setSubcategory] = useState({
        name_en: '',
        name_ar: '',
        status: 'active',
        category_id: ''
    })
    const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [validationMessage, setValidationMessage] = useState('')
    const { accessToken } = useSetToken()
    const { toggleRefetch } = useInsertGlobalDataTrigger()

    const addSubcategory = async () => {
        if (!subcategory.name_en || !subcategory.name_ar || !image || !subcategory.category_id) {
            setValidationMessage('All fields are required')
            return
        }

        setIsLoading(true)

        const formData = new FormData()
        formData.append('name_en', subcategory.name_en)
        formData.append('name_ar', subcategory.name_ar)
        formData.append('status', subcategory.status)
        formData.append('category_id', subcategory.category_id)
        formData.append('image', image)

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/subcategories/store`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log(res.data)
            toggleRefetch('subCategories')
            setSubcategory({
                name_en: '',
                name_ar: '',
                status: 'active',
                category_id: ''
            })
            setImage(null)
            setValidationMessage('')
        } catch (error) {
            console.log(error)
            setValidationMessage(error?.response?.data?.message?.split('.')[0] || 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <div className="space-y-4">
                <div>
                    <label htmlFor="subcategory-name-en" className="block mb-1 font-medium">
                        {t("subc_name_en")}
                    </label>
                    <input
                        id="subcategory-name-en"
                        type="text"
                        className="w-full border rounded p-2"
                        placeholder="Enter English name"
                        value={subcategory.name_en}
                        onChange={(e) => setSubcategory({ ...subcategory, name_en: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="subcategory-name-ar" className="block mb-1 font-medium">
                        {t("subc_name_ar")}
                    </label>
                    <input
                        id="subcategory-name-ar"
                        type="text"
                        className="w-full border rounded p-2"
                        placeholder={t("enter_ar_name")}
                        value={subcategory.name_ar}
                        onChange={(e) => setSubcategory({ ...subcategory, name_ar: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="subcategory-image" className="block mb-1 font-medium">
                        {t("subc_image")}
                    </label>
                    <input
                        id="subcategory-image"
                        type="file"
                        className="w-full border rounded p-2"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block mb-1 font-medium">
                        {t("patent_category")}
                    </label>
                    <select
                        id="category"
                        className="w-full border rounded p-2"
                        value={subcategory.category_id}
                        onChange={(e) => setSubcategory({ ...subcategory, category_id: e.target.value })}
                    >
                        <option value="">{t("select_category")}</option>
                        {/* eslint-disable-next-line react/prop-types */}
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name !== null ? category.name.en : 'No Name'}
                            </option>
                        ))}
                    </select>
                </div>

                {validationMessage && (
                    <div className="text-red text-sm">*{validationMessage}</div>
                )}

                {showUpdateButton === 0 ? (
                    <button
                        type="button"
                        onClick={addSubcategory}
                        disabled={isLoading}
                        style={{ opacity: isLoading ? '0.7' : '1' }}
                        className="w-full bg-black text-white py-2 relative flex items-center justify-center rounded hover:bg-gray-800"
                    >
                        <span>{t("add_subc")}</span>
                        {isLoading && (
                            <span className="absolute right-2 h-full flex items-center">
                                <LoadingSpinner />
                            </span>
                        )}
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={addSubcategory}
                        disabled={isLoading}
                        style={{ opacity: isLoading ? '0.7' : '1' }}
                        className="w-full bg-black text-white py-2 relative flex items-center justify-center rounded hover:bg-gray-800"
                    >
                        <span>{t("add_subc")}</span>
                        {isLoading && (
                            <span className="absolute right-2 h-full flex items-center">
                                <LoadingSpinner w={20} h={20}/>
                            </span>
                        )}
                    </button>
                )}

            </div>
        </div>
    )
}

export default AddSubcategories
