import { useState } from 'react'
import useFilter from '../../../../store/useFilter'
import { useTranslation } from 'react-i18next'
const Price = () => {
    const {t} = useTranslation()
    const { setFilter, isLoading } = useFilter()
    const [price, setPrice] = useState({
        max: "",
        min: ""
    })

    const saveChanges = () => {
        if (price.min >= 0 && price.max >= 0) {
            setFilter("max_price", price.max)
            setFilter("min_price", price.min)
        }   
    }

    return (
        <div className='border-b-2 border-main font-secondry text-gray py-4'>
            <div className='px-4 pb-3 text-dark text-[19px] font-semibold'>{t("price")}</div>

            <div className="px-4 pb-3 flex flex-col gap-4">
                {/* Min Price */}
                <div className="flex items-center justify-between custom-checkbox">
                    <label htmlFor="minPrice" className="text-[17px] w-[100px]">{t("min")} :</label>
                    <input
                        id="minPrice"
                        type="text"
                        inputMode="numeric"
                        value={price.min}
                        onChange={(e) => setPrice({ ...price, min: e.target.value })}
                        className="w-full ml-2 border border-slate-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue"
                        placeholder="e.g. 100"
                    />
                </div>

                {/* Max Price */}
                <div className="flex items-center justify-between custom-checkbox">
                    <label htmlFor="maxPrice" className="text-[17px] w-[100px]">{t("max")}:</label>
                    <input
                        id="maxPrice"
                        type="text"
                        inputMode="numeric"
                        value={price.max}
                        onChange={(e) => setPrice({ ...price, max: e.target.value })}
                        className="w-full ml-2 border border-slate-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue"
                        placeholder="e.g. 500"
                    />
                </div>
            </div>
            <div className='px-4'>
            <button style={{ opacity: isLoading && "0.6" }} className='bg-blue-600 text-white py-1 px-4 w-full mt-2 rounded-sm' onClick={() => saveChanges()}>{t("save")}</button>
            </div>
        </div>
    )
}

export default Price
