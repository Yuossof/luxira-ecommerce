import axios from 'axios'
import { useEffect } from 'react'
import Cookies from 'universal-cookie';
import useSetToken from '../../store/useSetToken';
import { useNavigate } from 'react-router-dom';
import useSetUser from '../../store/useSetUser';

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  const cookie = new Cookies();
  const { accessToken, setAccessToken } = useSetToken()
  const { user, setUser } = useSetUser()
  useEffect(() => {
    console.log(user)
    const checkAccessToken = async () => {
      const refreshToken = cookie.get('refresh_token');
      if(!refreshToken) navigate("/login")

      if (!accessToken) {
        if (refreshToken) {
          try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/refresh-token`, {
              'refresh_token': refreshToken
            });
           setUser(res.data.data.user)
            setAccessToken(res.data.data.access_token)
          } catch (error) {
            console.log(error)
            navigate("/login")
          }
        }else {
          navigate("/login")
        }
      }
    }
    checkAccessToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return children;
}

export default AuthProvider;