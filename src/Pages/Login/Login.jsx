import { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import Cookies from "universal-cookie";
import useSetToken from "../../store/useSetToken";
import useSetUser from "../../store/useSetUser";
import Loading from "../../Components/loading/Loading";
import { useTranslation } from "react-i18next";

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {setAccessToken} = useSetToken()
    const {setUser} = useSetUser()
    const cookie = new Cookies();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        // remember: false, 
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        backEnd: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors((prev) => ({
            ...prev,
            [e.target.name]: '',
            backEnd: ''
        }));

    };

    // const handleCheckboxChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         remember: e.target.checked
    //     });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formHasError = false;

        if (formData.email.trim() === '') {
            setErrors((prev) => ({
                ...prev,
                email: 'The email is required'
            }));
            formHasError = true;
        }

        if (formData.password.trim() === '') {
            setErrors((prev) => ({
                ...prev,
                password: 'The password is required'
            }));
            formHasError = true;
        }

        if (formHasError) return;
        setLoading(true);

        cookie.set("email", formData.email)
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, formData)
            setLoading(false);
            if(res.data.data.refresh_token) {
                cookie.set('refresh_token', res.data.data.refresh_token)
            }
            setUser(res.data.data.user)
            console.log("ddd",res.data.data.user)

            console.log(res.data)
            setAccessToken(res.data.data.access_token)
            // dispatch(getToken({ accessToken: res.data.accessToken, userDetails: res.data.user }));
            navigate('/', { replace: true });
        } catch (error) {
            console.log(error);
            if(error.response.data.message === "Email Must Be Verified") {
            cookie.set('access_token', error.response.data.data.access_token)
            navigate("/resetcode",{ replace: true })
            }   
            setLoading(false);
            setErrors((prev) => ({
                ...prev,
                backEnd: error.response.data.message || error.response.data.errors.error,
            }))
            
        }
    };
    
    const {t} = useTranslation()
    return (
        <>
            <div className='md:w-2/4  mx-auto mt-20 ltr'>
                <h2 className="text-2xl font-primary font-semibold">{t("welcome_to_luxira")}</h2>
                <p className="mb-4 mt-2 font-secondry text-sm flex items-center gap-2">
                    <span className="text-gray">{t("new_here")}</span>
                    <Link to={"/register"} className="text-blue underline font-bold">{t('create_account')}</Link>
                </p>
                {errors.backEnd && (
                    <Alert color="failure" icon={HiInformationCircle} className="bg-[#FDE8E8] text-red mb-2">
                        <span className="font-semibold font-secondry">{errors.backEnd}</span>
                    </Alert>
                )}
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="mb-2 relative">
                        <label className="mb-2 block font-primary" htmlFor='Email'>{t("email_address")}</label>
                        <span className="ic mt-[2px]"><MdOutlineMail /></span>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="azxca@gmail.com"
                            className='ps-9 focus:outline-none rounded-lg py-2 px-3 border border-gray w-full'
                            id='Email'
                            type="text"
                        />
                    </div>
                    {errors.email && <span className='text-red font-semibold font-secondry mb-2 block'>{errors.email}</span>}

                    <div className="mb-2 relative">
                        <label className="mb-2 block font-primary" htmlFor='Password'>{t("password")}</label>
                        <span className="ic mt-[2px]"><CiLock /></span>
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className='ps-9 focus:outline-none rounded-lg py-2 px-3 border border-gray w-full'
                            id='Password'
                            type="password"
                        />

                    </div>
                    {errors.password && <span className='text-red font-semibold font-secondry mb-2 block'>{errors.password}</span>}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="h-4 w-4 mt-[2px]"
                                id="remember"
                            // checked={formData.remember}
                            // onChange={handleCheckboxChange}
                            />
                            <label htmlFor="remember" className="cursor-pointer">{t("remember_this_device")}</label>
                        </div>
                        <div>
                            <Link to={"/forgotpassword"} className="text-blue font-secondry font-semibold">{t("forget_password")}</Link>
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className={`text-white flex items-center gap-3 justify-center hover:bg-blue2 transition-all duration-200 bg-blue py-2 px-4 rounded-lg text-center w-full mb-3 mt-7 font-semibold`}>
                        <span>{t("login")}</span> {loading && <Loading />}
                    </button>
                </form>
            </div>
        </>
    );
}

export default Login;
