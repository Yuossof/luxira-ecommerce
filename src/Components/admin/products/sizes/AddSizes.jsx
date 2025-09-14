import { useState } from 'react'
import axios from 'axios'
import useSetToken from '../../../../store/useSetToken'
import useInsertGlobalDataTrigger from '../../../../store/useInsertData'
import LoadingSpinner from '../../../LoadingSpinner'
import { useTranslation } from 'react-i18next'

// eslint-disable-next-line react/prop-types
const AddSizes = ({setGetSizes}) => {
    const {t} = useTranslation()
    const [size, setSize] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { accessToken } = useSetToken()
    const { toggleRefetch } = useInsertGlobalDataTrigger()
    const [validationMessage, setValidationMessage] = useState("")

    const addSize = async () => {
        if(!size) {
            setValidationMessage("This field is required")
            return
        }
        console.log("s=>", accessToken)
        setIsLoading(true)
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/sizes/store`, { size_en: size, size_ar: size }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            setGetSizes("fetching")
            toggleRefetch("sizes")
            setSize("")
        } catch (error) {
            console.log(error)
            setValidationMessage(error.response.data.message.split(".")[0])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <div className="space-y-4">
                <div>
                    <label htmlFor="size-name" className="block mb-1 font-medium">
                        {t("size_name")}
                    </label>
                    <input
                        id="size-name"
                        type="text"
                        className="w-full border rounded p-2"
                        placeholder={t("enter_size")}
                        value={size}
                        onChange={(e) => {
                            if(validationMessage) setValidationMessage("")
                            setSize(e.target.value)
                        }}
                    />
                   {validationMessage && <p className='text-red text-sm mt-2'>*{validationMessage}</p>}
                </div>
                <button
                    onClick={() => addSize()}
                    disabled={isLoading}
                    style={{opacity: isLoading ? "0.7" : "1"}}
                    type="submit"
                    className="w-full bg-black items-center justify-center text-white py-2 relative flex rounded hover:bg-gray-800">
                    <span>{t("add_size")}</span>
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

export default AddSizes