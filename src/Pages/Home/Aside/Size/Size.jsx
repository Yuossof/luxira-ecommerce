import { useState } from "react"
import useFilter from "../../../../store/useFilter"
import { useTranslation } from "react-i18next"
// eslint-disable-next-line react/prop-types
const Size = ({ sizes }) => {
  const { t } = useTranslation()
  const [selectedSizeId, setSelectedSizeId] = useState("")
  const { setFilter } = useFilter()

  const handleToggle = (id) => {
    if (selectedSizeId === id) {
      setSelectedSizeId("")
      setFilter("size_id", "")
    } else {
      setSelectedSizeId(id)
      setFilter("size_id", id)
    }
  }
  return (
    <div className="border-b border-gray-200">
      <div className="px-4 py-4">
        <div className="text-gray-800 font-semibold text-xl mb-3">{t("sizes")}</div>
        <div className="flex gap-3 flex-wrap">

          {/* eslint-disable-next-line react/prop-types */}
          {sizes.map((size) => (
            <button
              key={size.id}
              onClick={() => handleToggle(size.id)}
              className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${size.id === selectedSizeId
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                }`}
            >
              {size.translatable_size}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}


export default Size
