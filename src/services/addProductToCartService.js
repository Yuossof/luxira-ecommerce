import axios from "axios"

export const addProductToCartService = async (data, accessToken) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/cart/store`;

        const res = await axios.post(url,data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })

        console.log(res.data)
        return res.data
    } catch (error) {
        throw {"add to cart error":error}
    }
}