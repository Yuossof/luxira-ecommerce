import { useState } from 'react'
import axios from 'axios'
import useSetToken from '../../../../store/useSetToken'
import useInsertGlobalDataTrigger from '../../../../store/useInsertData'
import LoadingSpinner from '../../../LoadingSpinner'
import { useTranslation } from 'react-i18next'

// eslint-disable-next-line react/prop-types
const AddColor = ({setGetColors}) => {
    const {t} = useTranslation()
    const [color_en, setColor_en] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { accessToken } = useSetToken()
    const { toggleRefetch } = useInsertGlobalDataTrigger()
    const [validationMessage, setValidationMessage] = useState("")

    const addColor = async () => {
        if (!color_en) {
            setValidationMessage("This field is required")
            return
        }
        console.log("s=>", accessToken)
        setIsLoading(true)
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/colors/store`, { name:color_en }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            console.log(res.data)
            toggleRefetch("colors")
            setColor_en("")
            setGetColors("fetching")
        } catch (error) {
            console.log(error)
            setValidationMessage(error.response.data.message.split(".")[0])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="color-hex" className="block mb-1 font-medium">
                    {t("color_val")}
                </label>
                <div className="flex space-x-2">
                    <input id="color-hex" type="color" defaultValue="#000000" onChange={(e)=> setColor_en(e.target.value)} className="w-16 h-10 p-1" />
                    <input
                        type="text"
                        defaultValue="#000000"
                        placeholder="#000000"
                        className="flex-1 border rounded p-2"
                        value={color_en}
                        onChange={(e)=> setColor_en(e.target.value)}
                    />
                    {validationMessage && <p className='text-red text-sm mt-2'>*{validationMessage}</p>}
                </div>
            </div>
            <button
                onClick={() => addColor()}
                disabled={isLoading}
                style={{ opacity: isLoading ? "0.7" : "1" }}   
                className="w-full bg-black items-center justify-center text-white py-2 relative flex rounded hover:bg-gray-800">
                <span>
                    {t("add_color")}
                </span>
                {isLoading && (
                    <span className='absolute right-2 h-full flex items-center'>
                        <LoadingSpinner w={20} h={20}/>
                    </span>
                )}
            </button>

        </div>
    )
}

export default AddColor