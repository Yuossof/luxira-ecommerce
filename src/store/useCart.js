import { create } from 'zustand'


const insertProductsToCart = create((set, get) => ({
    cart: [],
    refreshCartVal: false,
    refreshCart: () => {
        set({ refreshCartVal: !get().refreshCartVal })
    },
    addProductToCart: (product) => {
        const cartData = get().cart
        set({cart: [...cartData, product]})
    },

    addProductsToCart: (products) => {
        set({cart: products})
    },

    deleteProduct: (productId)=> {
        const newCartData = get().cart.filter((item)=> item.id != productId)
        set({cart: newCartData})
    }
}))

export default insertProductsToCart