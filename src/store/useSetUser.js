import { create } from 'zustand'


const useSetUser = create((set) => ({
    user: {},
    setUser: (data) => set({ user: data })
}))

export default useSetUser