import { useState, useEffect } from "react"
import axios from "axios"
import AddSizes from "../../Components/admin/products/sizes/AddSizes"
import SizesTable from "../../Components/admin/products/sizes/SizesTable"
import ColorsTable from "../../Components/admin/products/colors/ColorsTable"
import AddColor from "../../Components/admin/products/colors/AddColor"
import AddBrand from "../../Components/admin/products/brands/AddBrand"
import BrandsTable from "../../Components/admin/products/brands/BrandsTable"
import AddCategory from "../../Components/admin/products/categories/AddCatergory"
import CategoriesTable from "../../Components/admin/products/categories/CategoriesTable"
import useSetToken from "../../store/useSetToken"
import useInsertGlobalDataTrigger from "../../store/useInsertData"
import AddSubcategories from "../../Components/admin/products/Subcategories/AddSubcategories"
import SubCategoriesTable from "../../Components/admin/products/Subcategories/SubCategoriesTable"
import { useTranslation } from "react-i18next"

export default function InsertGlobalData() {
  const {t} = useTranslation()
  // State for active tab - only logic we're implementing
  const [activeTab, setActiveTab] = useState("sizes")
  const { accessToken } = useSetToken()
  const [categories, setCategories] = useState([])
  const { refetchTriggers } = useInsertGlobalDataTrigger()
  const [colors, setColors] = useState([])
  const [getColors, setGetColors] = useState("idle")
  const [sizes, setSizes] = useState([])
  const [getSizes, setGetSizes] = useState("idle")
  const [brands, setBrands] = useState([])
  const [getBrands, setGetBrands] = useState("idle")

  

  useEffect(() => {
    if (getBrands !== "fetching") return
    const controller = new AbortController()
    const getSizes = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/brands`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          signal: controller.signal
        })
        setBrands(res.data.data.brands)
        setGetBrands("done")
        console.log("brands",res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getSizes()
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchTriggers.brands, getBrands])


  useEffect(() => {
    if (getSizes !== "fetching") return
    const controller = new AbortController()
    const getSizesService = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/sizes`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          signal: controller.signal
        })
        setGetSizes("done")
        console.log(res.data.data.sizes)
        setSizes(res.data.data.sizes)
      } catch (error) {
        console.log(error)
      }
    }
    getSizesService()

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchTriggers.sizes, getSizes])


  useEffect(() => {
    if (getColors !== "fetching") return
    const controller = new AbortController()
    const getColorsService = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/colors`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          signal: controller.signal
        })
        setGetColors("done")
        console.log(res.data)
        setColors(res.data.data.colors)
      } catch (error) {
        console.log(error)
      }
    }
    getColorsService()
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchTriggers.colors, getColors])

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/categories`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        console.log(res.data)
        setCategories(res.data.data.categories)
      } catch (error) {
        console.log(error)
      }
    }
    getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchTriggers.categories])



  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">{t("product_att_management")}</h1>

      {/* Tabs with click handlers */}
      <div className="flex border-b mb-6">
        {["sizes", "brands", "colors", "subcategories", "categories"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 capitalize ${activeTab === tab ? "border-b-2 border-black font-medium" : "text-gray-500"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content - conditionally rendered based on activeTab */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="border rounded-lg p-4">
          {/* <h2 className="text-xl font-semibold mb-4">Add {activeTab.slice(0, -1)}</h2> */}

          {/* Size Form */}
          {activeTab === "sizes" && (
            <AddSizes setGetSizes={setGetSizes} />
          )}

          {/* Brand Form */}
          {activeTab === "brands" && (
            <AddBrand setGetBrands={setGetBrands}/>
          )}

          {/* Color Form */}
          {activeTab === "colors" && (
            <AddColor setGetColors={setGetColors} />
          )}

          {/* Subcategory Form */}
          {activeTab === "subcategories" && (
            <AddSubcategories categories={categories} />
          )}

          {/* Category Form */}
          {activeTab === "categories" && (
            <AddCategory />
          )}
        </div>

        {/* Table Section */}
        <div className="border rounded-lg p-4">
          {/* <h2 className="text-xl font-semibold mb-4">{activeTab}</h2> */}

          {/* Sizes Table */}
          {activeTab === "sizes" && (
            <SizesTable sizes={sizes} setGetSizes={setGetSizes} getSizes={getSizes} setSizes={setSizes} />
          )}

          {/* Brands Table */}
          {activeTab === "brands" && (
            <BrandsTable brands={brands} setBrands={setBrands} getBrands={getBrands} setGetBrands={setGetBrands}/>
          )}

          {/* Colors Table */}
          {activeTab === "colors" && (
            <ColorsTable colors={colors} setGetColors={setGetColors} setColors={setColors} getColors={getColors} />
          )}

          {/* Subcategories Table */}
          {activeTab === "subcategories" && (
            <SubCategoriesTable />
          )}

          {/* Categories Table */}
          {activeTab === "categories" && (
            <CategoriesTable categories={categories} setCategories={setCategories} />
          )}
        </div>
      </div>
    </div>
  )
}
