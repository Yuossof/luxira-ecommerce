import { create } from "zustand";

const useStoreProductGlobalData = create((set)=> ({
    data: {
        brands: [],
        colors: [],
        sizes: [],
        subcategories: []
    },

    setData: (data)=> set({data})
}))

export default useStoreProductGlobalData