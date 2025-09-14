import { create } from 'zustand'

const useFilter = create((set, get) => ({
  filteredData: {
    subcategory_id: "",
    barnd_id: "",
    size_id: "",
    color_id: "",
    max_price: "",
    min_price: ""
  },
  isLoading: false,
  setIsLoading: (isLoading) => {
    set({isLoading: isLoading})
  },
  setFilter: (key, value) => {
    set({
      filteredData: {
        ...get().filteredData,
        [key]: value
      }
    })
  },
  resetFilters: () => {
    set({
      filteredData: {
        subcategory_id: "",
        barnd_id: "",
        size_id: "",
        color_id: "",
        max_price: "",
        min_price: ""
      }
    })
  }
}))

export default useFilter
