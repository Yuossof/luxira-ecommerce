import axios from "axios";

export const toggleProductInWishlist = async (productId, accessToken) => {
    try {

        const url = `${import.meta.env.VITE_API_URL}/api/whishlistes/store/${productId}`;
        await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

    } catch (error) {
       throw new Error("Failed to toggle product in wishlist: " + error.respinse?.data?.message || error.message);
    } 

}