import axios from "axios"

export const deleteProductFromCart = async (productId, accessToken) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/cart/delete_product/${productId}`;
        const res = await axios.delete(url,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}