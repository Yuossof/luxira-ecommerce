
import { useState } from "react"
import useFilter from "../../../../store/useFilter"
import { FaCheck } from "react-icons/fa"
import { useTranslation } from "react-i18next"
// eslint-disable-next-line react/prop-types
const Brands = ({brands}) => {
        const {i18n} = useTranslation()
    const [brandId, setBrandId] = useState("")
    const { setFilter } = useFilter()

    const handleToggle = (id) => {
        if (brandId === id) {
            setBrandId("")
            setFilter("brand_id", "")
        } else {
            setBrandId(id)
            setFilter("brand_id", id)
        }
    }

    return (
        <div className='border-b-2 border-main font-secondry text-gray py-4'>
            {/* eslint-disable-next-line react/prop-types */}
            {brands && brands.length > 0 && brands.map((brand) => (
                <div
                    key={brand.id}
                    className={`${brand.id === brandId ? 'text-dark' : 'text-gray'} hover:text-dark transition-all duration-300 px-4 pb-3`}
                >
                    <label className="flex items-center justify-between custom-checkbox">
                        <div className="text-[19px]">
                            {i18n.language === "en" ? brand.name.en : brand.name.ar}
                        </div>
                        <input
                            type="checkbox"
                            checked={brand.id === brandId}
                            onChange={() => handleToggle(brand.id)}
                        />
                        <span className="checkmark">
                            {brand.id === brandId && <FaCheck color="gray" size={11} />}
                        </span>
                    </label>
                </div>
            ))}
        </div>
    )
}

export default Brands