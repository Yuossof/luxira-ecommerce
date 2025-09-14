import useFilter from "../../../../store/useFilter"
import { useState } from "react"
// eslint-disable-next-line react/prop-types
const Colors = ({ colors }) => {
    const [selectedColorId, setSelectedColorId] = useState("")
    const { setFilter } = useFilter()

    const handleToggle = (id) => {
        if (selectedColorId === id) {
            setSelectedColorId("")
            setFilter("color_id", "")
        } else {
            setSelectedColorId(id)
            setFilter("color_id", id)
        }
    }

    return (
        <div className='border-b-2 border-main'>
            <div className="border-b border-gray-200">
                <div className="px-4 py-4">
                    <div className="text-gray-800 font-semibold text-xl mb-3">{"Colors"}</div>
                    <div className="flex gap-3 flex-wrap">
                        <div className='flex gap-4 flex-wrap justify-center mt-4'>

                            {/* eslint-disable-next-line react/prop-types */}
                            {colors.map((color) => (
                                <span
                                    style={{ border: color.id === selectedColorId ? "2px gray solid" : "" , backgroundColor: color.name, scale: color.id === selectedColorId ? "1.2" : "" }}
                                    onClick={() => handleToggle(color.id)}
                                    key={color.id}
                                    className="w-[25px] h-[26px] inline-block rounded-full cursor-pointer z-[100]"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Colors