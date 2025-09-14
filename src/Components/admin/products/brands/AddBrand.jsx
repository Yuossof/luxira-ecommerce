import { useState } from 'react'
import axios from 'axios'
import useSetToken from '../../../../store/useSetToken'
import useInsertGlobalDataTrigger from '../../../../store/useInsertData'
import LoadingSpinner from '../../../LoadingSpinner'
import { useTranslation } from 'react-i18next'

// eslint-disable-next-line react/prop-types
const AddBrand = ({ setGetBrands }) => {
    const { t } = useTranslation()
    const [brand, setBrand] = useState({
        name_en: "",
        name_ar: "",
        status: "active"
    })
    const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [validationMessage, setValidationMessage] = useState("")
    const { accessToken } = useSetToken()
    const { toggleRefetch } = useInsertGlobalDataTrigger()

    const addBrand = async () => {
        if (!brand.name_en || !brand.name_ar || !image) {
            setValidationMessage("All fields are required")
            return
        }

        setIsLoading(true)

        const formData = new FormData()
        formData.append("name_en", brand.name_en)
        formData.append("name_ar", brand.name_ar)
        formData.append("status", brand.status)
        formData.append("image", image)

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/brands/store`, formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log(res.data)
            toggleRefetch("brands")
            setBrand({
                name_en: "",
                name_ar: "",
                status: "active"
            })
            setImage(null)
            setValidationMessage("")
            setGetBrands("fetching")
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
                    <label htmlFor="brand-name-en" className="block mb-1 font-medium">
                        {t("brand_name_en")}
                    </label>
                    <input
                        id="brand-name-en"
                        type="text"
                        className="w-full border rounded p-2"
                        placeholder={t("enter_en_name")}
                        value={brand.name_en}
                        onChange={(e) => setBrand({ ...brand, name_en: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="brand-name-ar" className="block mb-1 font-medium">
                        {t("brand_name_ar")}
                    </label>
                    <input
                        id="brand-name-ar"
                        type="text"
                        className="w-full border rounded p-2"
                        placeholder={t("enter_ar_name")}
                        value={brand.name_ar}
                        onChange={(e) => setBrand({ ...brand, name_ar: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="brand-image" className="block mb-1 font-medium">
                        {t("brand_image")}
                    </label>
                    <input
                        id="brand-image"
                        type="file"
                        className="w-full border rounded p-2"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>

                {validationMessage && (
                    <div className="text-red text-sm">*{validationMessage}</div>
                )}

                <button
                    onClick={() => addBrand()}
                    disabled={isLoading}
                    style={{ opacity: isLoading ? "0.7" : "1" }}
                    className="w-full bg-black items-center justify-center text-white py-2 relative flex rounded hover:bg-gray-800">
                    <span>
                        {t("add_brand")}
                    </span>
                    {isLoading && (
                        <span className='absolute right-2 h-full flex items-center'>
                            <LoadingSpinner w={20} h={20} />
                        </span>
                    )}
                </button>
            </div>
        </div>
    )
}

export default AddBrand
