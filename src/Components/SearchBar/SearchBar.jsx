import { IoIosArrowDown } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import locationImage from '../../assets/location.png';
import './SearchBar.css';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import useSetToken from "../../store/useSetToken";
import useProducts from "../../store/useSearch";
import { Link, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { accessToken } = useSetToken()
  const [searchKey, setSearchKey] = useState("")
  const { setProducts } = useProducts()
  const [searchResult, setSearchResult] = useState([])
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false)

  useEffect(() => {
    const handleSearch = async () => {
      if (searchKey.length < 1) {
        setSearchResult([])
        setIsSearchBoxOpen(false)
        return
      }

      try {

        const url = `${import.meta.env.VITE_API_URL}/api/product/search/${searchKey}`;
        const res = await axios.get(url, {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Accept-Language": i18n.language
          },
        })
        if (searchKey) {
          setIsSearchBoxOpen(true)
        }
        setProducts(res.data.data.products)
        setSearchResult(res.data.data.products)
      } catch (error) {
        console.log("searchError", error)
      }
    }

    handleSearch()
  }, [searchKey])

  const handleNavigate = (id) => {
    navigate(`/products/${id}`)
    setIsSearchBoxOpen(false)
  }

  return (
    <div className='flex items-center justify-between gap-8 mt-6 font-secondary container mx-auto px-4'>
      {/* Location Selector */}
      <div className="location group relative">
        <div className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-xl h-14 px-5 w-72 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200 hover:border-blue-300">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={locationImage}
                alt="Location"
                className='w-5 h-5 transition-transform duration-300 group-hover:scale-110'
              />
            </div>
            <span className='text-gray-700 font-medium text-base uppercase tracking-wide'>
              {t("egypt")}
            </span>
          </div>
          <IoIosArrowDown className='text-gray-500 text-xl transition-all duration-300 group-hover:rotate-180 group-hover:text-blue-500' />
        </div>

        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 rounded-xl bg-blue-400 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      {/* Search Input */}
      <div className="search flex-1 relative group">
        <div className="relative h-14 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
          <input
            className='w-full h-full bg-gray-50 hover:bg-gray-100 focus:bg-white px-5 pr-14 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-300 text-gray-700 placeholder-gray-500'
            placeholder={t("search")}
            onChange={(e) => setSearchKey(e.target.value)}
            type="text"
          />
          <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <IoSearchOutline className='text-xl text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300' />
          </div>
        </div>

        {isSearchBoxOpen && (
          <div className="w-full bg-slate-50 shadow-md  border-slate-200 absolute top-16 z-[50] rounded-md left-0 right-0">
            {searchResult.length > 0 && (
              searchResult.map((product) => (
                <div onClick={() => handleNavigate(product.id)} key={product.id} className="w-full block rounded-md hover:bg-slate-100 cursor-pointer">
                  <div className="w-full px-3 py-2 flex items-center gap-5">
                    <div className="w-11 h-11 rounded-md overflow-hidden border-[1px] border-slate-200">
                      <img src={product.images[0].image_url} alt={product.translatable_name} className="w-full h-full" />
                    </div>
                    <div>
                      <p>{product.translatable_name}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {searchResult.length < 1 && isSearchBoxOpen &&(
          <div className="w-full px-3 py-2 text-center bg-slate-50 shadow-md border-[1px] border-slate-200 absolute top-16 z-[50] rounded-md left-0 right-0">
            <p className="text-gray-600">No result !</p>
          </div>
        )}
        {/* Search input glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      {/* Search Button */}
      <button className='bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold h-14 px-6 w-44 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200'>
        <span className="flex items-center justify-center gap-2">
          <IoSearchOutline className="text-lg" />
          {t("search")}
        </span>
      </button>
    </div>
  )
}

export default SearchBar