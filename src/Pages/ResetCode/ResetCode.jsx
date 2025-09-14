import { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { FaUserPen } from 'react-icons/fa6';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Alert } from "flowbite-react";
import i18n from '../../i18n';
import { toast } from 'react-toastify';

function ResetCode() {
    const navigate = useNavigate();
    const cookie = new Cookies();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        code: '',
        email: cookie.get('email')
    })

    const [show, setShow] = useState(true);
    const [errorCode, setErrorCode] = useState('');
    const [responseCode, setResponseCode] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (value.trim().length === 6) {
            setShow(false);
        } else {
            setShow(true);
        }
        setErrorCode('');
        setResponseCode('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const accessToken = cookie.get("access_token")
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/checkCode`, {
                code: formData.code
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            cookie.remove('email');
            cookie.remove('access_token')
            cookie.set('refresh_token', res.data.refresh_token)
            
            // dispatch(getToken({ accessToken: res.data.accessToken, userDetails: res.data.user }))
            setLoading(false);
            navigate('/', { replace: true });
        } catch (error) {
            setLoading(false);
            if (error.response.status === 401) {
                setErrorCode('This code is wrong');
            }
        }
    }

    const handleResend = async () => {
        const accessToken = cookie.get("access_token")
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/sendCode`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept-Language': i18n.language
                }
            });
            setResponseCode(res.data.message);  
            setLoading(false);
        } catch(error) {
            const err = error.response.data.error || error.response.data.message || "An unexpected error"
            setLoading(false);
            toast.error(err)
        }
    }

    useEffect(() => {
        handleResend()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className='font-primary w-[90%] md:w-2/4'>
                <Link className='flex items-center gap-1 mt-8 ml-8 text-gray hover:text-dark transition-all duration-300 w-fit' to={-1}>
                    <span className='text-2xl'><IoIosArrowRoundBack /></span>
                    <span className='text-[20px]'> Back</span>
                </Link>
                <div className="content mt-14 mx-auto ">
                    <div className='w-full flex justify-center p-3'><img className='p-3 border w-16 border-gray rounded-lg' src={''} alt="" /></div>
                    <div>
                        <p className='font-bold mt-3 mb-2 text-2xl tracking-wide'>Reset Code</p>
                        <p className='text-gray text-sm mb-3'>We sent a code to <span className='text-black font-semibold'>{formData.email}</span> </p>
                        {responseCode && (
                            <Alert color="info" className='mb-2'>
                                <span className="font-semibold font-secondry capitalize">{responseCode}</span>
                            </Alert>
                        )}
                        <form onSubmit={handleSubmit} className="flex flex-wrap justify-between">
                            <div className="flex flex-col mb-3 w-full">
                                <div className="mb-1 relative w-full">
                                    <label className="mb-2 block font-primary" htmlFor='code'>Code</label>
                                    <span className='ic'><FaUserPen /></span>
                                    <input
                                        onChange={handleChange}
                                        name='code'
                                        value={formData.code}
                                        placeholder="Reset Code"
                                        className="ps-9 focus:outline-none rounded-lg py-2 px-3 border border-gray w-full mb1"
                                    />
                                </div>
                                {errorCode && <span className='text-red font-secondry font-semibold'>{errorCode}</span>}
                            </div>

                            <button
                                disabled={loading}
                                type="submit"
                                className={`${show ? 'opacity-[0.5] cursor-not-allowed' : 'opacity-100 cursor-pointer hover:bg-blue2'} text-white  transition-all duration-200 bg-blue py-2 px-4 rounded-lg text-center w-full mb-3 mt-7 font-semibold`}
                            >
                                Continue
                            </button>
                        </form>
                        <p className='text-xs text-gray'>Didn’t receive the email? <span className='text-blue cursor-pointer font-semibold pl-1' onClick={handleResend}>Click to resend</span></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetCode;
