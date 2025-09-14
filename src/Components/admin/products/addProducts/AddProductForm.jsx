"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import useStoreProductGlobalData from "../../../../store/useStoreProductGlobalData"
import axios from "axios"
import useSetToken from "../../../../store/useSetToken"
import { ToastContainer, toast } from "react-toastify"
import LoadingSpinner from "../../../LoadingSpinner"
import { useTranslation } from "react-i18next"

// eslint-disable-next-line react/prop-types
const AddProductForm = ({ showAddProductBox, setShowAddProductBox }) => {
  const { t } = useTranslation()
  const { data } = useStoreProductGlobalData()
  const { accessToken } = useSetToken()
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const fileInputRef = useRef(null)

  useEffect(() => {
    console.log("formData updated", formData)
  }, [formData])

  const handleChange = (e) => {
    const { id, value, type, files, multiple, selectedOptions } = e.target

    setFormData((prev) => {
      const updated = { ...prev }

      if (type === "file") {
        updated["images"] = files
      } else if (multiple && selectedOptions) {
        updated[id] = Array.from(selectedOptions).map((opt) => opt.value)
      } else {
        updated[id] = value
      }

      return updated
    })
  }

  const resetForm = () => {
    setFormData({})
    if (fileInputRef.current) {
      fileInputRef.current.value = null
    }

    document
      .querySelectorAll("#add-product-form input, #add-product-form select, #add-product-form textarea")
      .forEach((el) => {
        if (el.type !== "file") el.value = ""
      })
  }

  const createProduct = async () => {
    const form = new FormData()

    for (const key in formData) {
      const value = formData[key]

      if (key === "images" && value instanceof FileList) {
        Array.from(value).forEach((file) => form.append("image[]", file))
      } else if (Array.isArray(value)) {
        value.forEach((item) => form.append(`${key}[]`, item))
      } else {
        form.append(key, value)
      }
    }

    setIsLoading(true)

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/store`, form, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      toast("Product added successfully")
      console.log(res.data)
      resetForm()
    } catch (error) {
      console.log(error)
      toast(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <ToastContainer />
      <div
        style={{ display: showAddProductBox ? "flex" : "none" }}
        onClick={() => setShowAddProductBox(false)}
        className="fixed top-0 right-0 bottom-0 left-0 w-full z-50 bg-black bg-opacity-50 flex justify-center"
      >
        {showAddProductBox && (
          <div className="w-full h-[100vh] flex justify-center items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
              className="md:w-3/4 lg:w-2/4 w-[90%] shadow-lg h-[80%] rounded-md"
            >
              <div
                className="w-full bg-white rounded-lg shadow-md overflow-auto h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <form id="add-product-form" className="p-6 space-y-6">
                  <div className="p-5 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-center text-gray-800">{t("add_new_product")}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name_en" className="block text-sm font-medium text-gray-700">
                        {t("product_name_english")}
                      </label>
                      <input
                        id="name_en"
                        type="text"
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="name_ar" className="block text-sm font-medium text-gray-700">
                        {t("product_name_arabic")}
                      </label>
                      <input
                        id="name_ar"
                        type="text"
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        {t("price")}
                      </label>
                      <input
                        id="price"
                        type="number"
                        step="0.01"
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                        {t("quantity")}
                      </label>
                      <input
                        id="quantity"
                        type="number"
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        {t("status")}
                      </label>
                      <select
                        id="status"
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      >
                        <option value="">{t("select_status")}</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subcategory_id" className="block text-sm font-medium text-gray-700">
                        {t("subcategory")}
                      </label>
                      <select
                        id="subcategory_id"
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      >
                        <option value="">{t("select_subcategory")}</option>
                        {data.subcategories.map((subcategory) => (
                          <option key={subcategory.id} value={subcategory.id}>
                            {subcategory.translatable_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="brand_id" className="block text-sm font-medium text-gray-700">
                        {t("brand")}
                      </label>
                      <select
                        id="brand_id"
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      >
                        <option value="">{t("select_brand")}</option>
                        {data.brands.map((brand) => (
                          <option key={brand.id} value={brand.id}>
                            {brand.translatable_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                        {t("product_images")}
                      </label>
                      <input
                        id="images"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleChange}
                        ref={fileInputRef}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="size_id" className="block text-sm font-medium text-gray-700">
                        {t("available_sizes")}
                      </label>
                      <select
                        id="size_id"
                        multiple
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      >
                        {data.sizes.map((size) => (
                          <option key={size.id} value={size.id}>
                            {size.translatable_size}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="color_id" className="block text-sm font-medium text-gray-700">
                        {t("available_colors")}
                      </label>
                      <select
                        id="color_id"
                        multiple
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      >
                        {data.colors.map((color) => (
                          <option key={color.id} value={color.id}>
                            {color.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="desc_en" className="block text-sm font-medium text-gray-700">
                        {t("description_english")}
                      </label>
                      <textarea
                        id="desc_en"
                        rows={4}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      ></textarea>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="desc_ar" className="block text-sm font-medium text-gray-700">
                        {t("description_arabic")}
                      </label>
                      <textarea
                        id="desc_ar"
                        rows={4}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      ></textarea>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      disabled={isLoading}
                      type="button"
                      onClick={createProduct}
                      className="w-full px-4 py-2 text-white relative bg-slate-800 rounded-md hover:bg-slate-700 flex justify-center items-center"
                    >
                      <span>{t("add_product")}</span>
                      {isLoading && (
                        <span className="absolute right-3">
                          <LoadingSpinner w={18} h={18} />
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  )
}

export default AddProductForm
