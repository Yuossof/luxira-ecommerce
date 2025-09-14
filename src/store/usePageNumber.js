import { create } from 'zustand'


const usePageNumber = create((set) => ({
    numberOfPages: '',
    setNumberOfPages: (numberOfPages) => set({ numberOfPages: numberOfPages })
}))

export default usePageNumber