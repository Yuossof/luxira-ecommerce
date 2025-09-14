import { Link } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import Aside from './Aside/Aside';
import ProductsContent from './ProductsContent/ProductsContent';
import Pagination from './Pagination/Pagination';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const {t} = useTranslation()

  return (
    <>
    <div className='pb-5 lg:container w-[95%]'>
      <div className='flex items-center gap-2 mt-[30px] font-secondry ml-4'>
        <Link className='text-gray' to={'/'}>{t("home")}</Link>
        <IoIosArrowForward className='text-arrow'/>
        <Link className='text-arrow'>{t("casual")}</Link>
      </div>
      <div className="flex mt-[30px] gap-[50px]">
        <Aside/>
        <div className="flex flex-col gap-5 w-full">
          <ProductsContent/>
          <Pagination/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home;