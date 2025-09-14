import {useEffect} from 'react'
import useStoreProductGlobalData from '../../store/useStoreProductGlobalData'
import useSetToken from '../../store/useSetToken'
import axios from 'axios'

const AdminProviderWrapper = ({ children }) => {
  const { accessToken } = useSetToken()
  const { setData } = useStoreProductGlobalData()

  useEffect(() => {
    const controller = new AbortController()
    const getSizesService = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/getDataToProduct`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          signal: controller.signal
        })
        console.log("all", res.data.data)
        setData(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getSizesService()

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return children
}

export default AdminProviderWrapper