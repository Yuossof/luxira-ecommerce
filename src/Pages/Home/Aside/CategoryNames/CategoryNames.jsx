import { useState } from 'react';
import { FaCheck } from "react-icons/fa";
import '../Aside.css';
import useFilter from '../../../../store/useFilter';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line react/prop-types
const CategoryNames = ({ subcategories, cId }) => {
    const {i18n} = useTranslation()
    const [subcategoryID, setSubcategoryID] = useState("")
    const { setFilter } = useFilter()

    const handleToggle = (id) => {
        if (subcategoryID === id) {
            setSubcategoryID("")
            setFilter("subcategory_id", "")
        } else {
            setSubcategoryID(id)
            setFilter("subcategory_id", id)
        }
    }


    return (
        <div className='border-b-2 border-main font-secondry text-gray py-4'>
            {/* eslint-disable-next-line react/prop-types */}
            {subcategories.map((subcategory) => (
                <div
                    key={subcategory.id}
                    className={`${subcategory.id === cId || subcategory.id === subcategoryID ? 'text-dark' : 'text-gray'} hover:text-dark transition-all duration-300 px-4 pb-3`}
                >
                    <label className="flex items-center justify-between custom-checkbox">
                        <div className="text-[19px]">
                            {i18n.language === "en" ? subcategory.name.en : subcategory.name.ar}
                        </div>
                        <input
                            type="checkbox"
                            checked={subcategory.id === subcategoryID || cId === subcategory.id}
                            onChange={() => handleToggle(subcategory.id)}
                        />
                        <span className="checkmark">
                            {subcategory.id === subcategoryID || subcategory.id === cId && <FaCheck color="gray" size={11} />}
                        </span>
                    </label>
                </div>
            ))}
        </div>
    )
}

export default CategoryNames
