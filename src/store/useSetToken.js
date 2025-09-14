import { create } from 'zustand'


const useSetToken = create((set) => ({
    accessToken: '',
    setAccessToken: (token) => set({ accessToken: token })
}))

export default useSetToken