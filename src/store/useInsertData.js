import { create } from 'zustand'


const useInsertGlobalDataTrigger = create((set, get) => ({
    refetchTriggers: {
        sizes: false,
        colors: false,
        brands: false,
        categories: false,
        subCategories: false
    },
    toggleRefetch: (key) => {
        const current = get().refetchTriggers[key]
        set({
            refetchTriggers: {
                ...get().refetchTriggers,
                [key]: !current
            }
        })
    }
}))

export default useInsertGlobalDataTrigger