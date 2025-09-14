import axios from 'axios'
import { useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { MdOutlineMail } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { CheckCircle } from 'lucide-react'

function ForgotPassword() {
  const [formData, setFormData] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setFormData(e.target.value)
    setError('');
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.trim()) {
      setError('The email is required');
      return;
    }
    setLoading(true);
    try {
      console.log(formData)
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/verifyForgetPassword`, { email: formData });
      setMessage(res.data.message)
      setLoading(false);
    } catch (error) {
      setLoading(false)
      if (error.status === 404) {
        setError(error.response.data.message);
      }
      console.log(error)
    }
  }
  return (
    <>

      <div className='font-primary'>


        <div className="content md:w-2/4 w-[90%] mt-24 mx-auto">
        
        <Link className='flex items-center gap-1 mt-8  text-gray hover:text-dark transition-all duration-300 w-fit' to={-1}>
          <span className='text-2xl'><IoIosArrowRoundBack /></span>
          <span className='text-[20px]'> Back</span>
        </Link>
          <div className=' w-full mt-5 flex justify-center p-3'><img className='p-3 border w-16 border-gray rounded-lg' src={''} alt="" /></div>
          <div>
            <p className='font-semibold mt-3 mb-2 text-2xl tracking-wider'>Forgot Password?</p>
            <p className='text-gray text-sm mb-3'>No worries, we&apos;ll send you reset instructions</p>
            {message && (
              <div className='bg-green-500 bg-opacity-55 rounded-sm text-white py-3 px-2 flex items-center justify-start'>
                <CheckCircle className='text-white' />
                <span className='font-semibold ml-2'>
                  {message}
                </span>
              </div>
            )}
            <form onSubmit={handleSubmit} className='mt-8'>
              <div className='relative'>
                <label className='mb-2 block'>Eamil address</label>
                <input value={formData} name='formData' onChange={handleChange} className={` focus:outline-none w-full rounded-lg border  border-gray py-2 px-3 ps-9`} type='text' placeholder='Enter your email'></input>
                <span className={`ic text-gray text-2xl mt-[2px]`}><MdOutlineMail /></span>
              </div>
              {error && <span className='text-red font-secondry font-semibold block mt-1'>{error}</span>}
              <button className='w-full bg-blue hover:bg-blue2 transition-all duration-200 text-white py-2 font-semibold px-3 rounded-lg mt-8'>Reset  password</button>
            </form>
          </div>
        </div>

      </div>
    </>
  )
}

export default ForgotPassword;