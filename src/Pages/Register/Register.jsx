import { useState } from 'react';
import { CiLock, CiUser } from 'react-icons/ci';
import { MdOutlineMail } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { FaUserPen } from 'react-icons/fa6';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import useSetToken from '../../store/useSetToken';
import Loading from '../../Components/loading/Loading';
import { useTranslation } from 'react-i18next';

const Register = () => {
    const {t} = useTranslation()
    const navigate = useNavigate();
    const { setAccessToken } = useSetToken()
    const cookie = new Cookies();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        password: '',
        password_confirmation: ''
    })

    const [errors, setErrors] = useState({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        password: '',
        password_confirmation: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setErrors(({
            ...errors,
            [e.target.name]: ''
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formHasError = false;

        if (formData.first_name.trim() === '') {
            setErrors((prev) => ({
                ...prev,
                first_name: 'The first name is required'
            }));
            formHasError = true;
        }
        if (formData.last_name.trim() === '') {
            setErrors((prev) => ({
                ...prev,
                last_name: 'The last name is required'
            }));
            formHasError = true;
        }
        if (formData.email.trim() === '') {
            setErrors((prev) => ({
                ...prev,
                email: 'The email is required'
            }));
            formHasError = true;
        }
        if (formData.gender === '') {
            setErrors((prev) => ({
                ...prev,
                gender: 'The gender is required'
            }));
            formHasError = true;
        }
        if (formData.password.trim() === '') {
            setErrors((prev) => ({
                ...prev,
                password: 'The password is required'
            }));
            formHasError = true;
        } else if (formData.password.trim().length <= 7) {
            setErrors((prev) => ({
                ...prev,
                password: 'Password too short'
            }));
            formHasError = true;
        }
        if (formData.password_confirmation.trim() === '') {
            setErrors((prev) => ({
                ...prev,
                password_confirmation: 'The confirm password is required'
            }));
            formHasError = true;
        }
        if (formData.password_confirmation.trim() !== formData.password.trim()) {
            setErrors((prev) => ({
                ...prev,
                password_confiramtion: 'Passwords must match'
            }));
            formHasError = true;
        }

        if (formHasError) return;

        setLoading(true);

        try {
            console.log(formData)
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, formData, {
                headers: {
                    'Accept-Lanuage': 'ar'
                }
            });
            console.log(res)
            cookie.set('email', formData.email,);
            cookie.set('access_token', res.data.data.access_token)
            setAccessToken(res.data.data.access_token)
            setLoading(false);
            navigate('/resetcode', { replace: true });
        } catch (error) {
            // setErrors(({
            //     ...errors,
            //     [e.target.name]: error.response.data.message || error.response.data.errors[e.target.name] || error.response.data.errors.error
            // }));
            console.log(error)
        } finally {
            setLoading(false);

        }
    };


    return (
        <>
            <div className='md:w-2/4 w-[90%] mx-auto mt-10'>
                <h2 className="text-2xl font-primary font-semibold">{t("welcome_to_luxira")}</h2>
                <p className="mb-4 font-secondry text-sm text-gray">{t("create_new_account")}</p>
                <form onSubmit={handleSubmit} className="mb-4 flex flex-wrap justify-between">
                    <div className="flex flex-col w-[48%] mb-4">
                        <div className="mb-1 relative me-1">
                            <label className="mb-1 block font-primary" htmlFor='firstName'>{t("first_name")}</label>
                            <span className='ic'><FaUserPen /></span>
                            <input onChange={handleChange} name='first_name' value={formData.first_name} placeholder="First Name" className="ps-9 focus:outline-none rounded-lg py-2 px-3 border border-gray w-full" />
                        </div>
                        {errors.first_name && <span className='text-red font-semibold font-secondry'>{errors.first_name}</span>}
                    </div>

                    <div className="flex flex-col w-[48%] mb-4">
                        <div className="mb-1 relative me-1">
                            <label className="mb-1 block font-primary" htmlFor='last_name'>{t("last_name")}</label>
                            <span className='ic'><FaUserPen /></span>
                            <input onChange={handleChange} name='last_name' value={formData.last_name} placeholder="Last Name" className="ps-9 focus:outline-none rounded-lg py-2 px-3 border border-gray w-full" />
                        </div>
                        {errors.last_name && <span className='text-red font-semibold font-secondry'>{errors.last_name}</span>}

                    </div>

                    <div className="flex flex-col w-[48%] mb-4">
                        <div className="mb-1 relative me-1">
                            <label className="mb-1 block font-primary" htmlFor='email'>{t("email_address")}</label>
                            <span className='ic'><MdOutlineMail /></span>
                            <input onChange={handleChange} name='email' value={formData.email} placeholder="email@example.com" className="ps-9 focus:outline-none rounded-lg py-2 px-3 border border-gray w-full" />
                        </div>
                        {errors.email && <span className='text-red font-semibold font-secondry'>{errors.email}</span>}
                    </div>

                    <div className="flex flex-col w-[48%] mb-4">
                        <div className="mb-1 relative me-1">
                            <label className="mb-1 block font-primary" htmlFor='gender'>{t("gender")}</label>
                            <span className='ic'><CiUser /></span>
                            <select onChange={handleChange} name='gender' value={formData.gender} className='ps-9 focus:outline-none rounded-lg py-2 px-3 border border-gray w-full'>
                                <option value="" disabled>{t("select_gender")}</option>
                                <option value="m">{t("male")}</option>
                                <option value="f">{t("female")}</option>
                            </select>
                        </div>
                        {errors.gender && <span className='text-red font-semibold font-secondry'>{errors.gender}</span>}

                    </div>

                    <div className="flex flex-col w-[48%] mb-4">
                        <div className="mb-1 relative me-1">
                            <span className='ic'><CiLock /></span>
                            <label className="mb-1 block font-primary" htmlFor='password'>{t("password")}</label>
                            <input onChange={handleChange} name='password' value={formData.password} type="password" placeholder="Password" className="ps-9 focus:outline-none rounded-lg py-2 px-3 border border-gray w-full" />
                        </div>
                        {errors.password && <span className='text-red font-semibold font-secondry'>{errors.password}</span>}

                    </div>

                    <div className="flex flex-col w-[48%] mb-4">
                        <div className="mb-1 relative me-1">
                            <span className='ic'><CiLock /></span>
                            <label className="mb-1 block font-primary" htmlFor='password_confirmation'>{t("confirm_password")}</label>
                            <input onChange={handleChange} name='password_confirmation' value={formData.password_confirmation} type="password" placeholder="Confirm Password" className="ps-9 focus:outline-none rounded-lg py-2 px-3 border border-gray w-full" />
                        </div>
                        {errors.password_confirmation && <span className='text-red font-semibold font-secondry'>{errors.password_confirmation}</span>}

                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className={`text-white flex items-center gap-3 justify-center hover:bg-blue2 transition-all duration-200 bg-blue py-2 px-4 rounded-lg text-center w-full mb-3 mt-7 font-semibold`}>
                        <span>{t("register")}</span> {loading && <Loading />}
                    </button>
                </form>
            </div>
        </>
    );
};

export default Register;
