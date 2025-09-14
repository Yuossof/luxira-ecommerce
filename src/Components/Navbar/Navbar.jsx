import { IoIosArrowDown } from 'react-icons/io';
import { CiUser, CiHeart } from 'react-icons/ci';
import { IoCartOutline, IoClose } from 'react-icons/io5';
import { GoBell } from 'react-icons/go';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useSetToken from '../../store/useSetToken';
import Cookies from 'universal-cookie';
import { useTranslation } from 'react-i18next';
import insertProductsToCart from '../../store/useCart';
import { Trash } from 'lucide-react';
import { deleteProductFromCart } from '../../services/deleteProductFromCart';
const Navbar = () => {
  const { cart = [], addProductsToCart, refreshCartVal } = insertProductsToCart()
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { accessToken } = useSetToken();
  const cookie = new Cookies();
  const [reget, setReget] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    const getCartItems = async () => {
      if (!accessToken) return
      try {
        const url = `${import.meta.env.VITE_API_URL}/api/cart`;
        const res = await axios.get(url, {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Accept-Language": i18n.language
          },
        });

        console.log("prs", res.data.data.cart_products)
        addProductsToCart(res.data.data.cart_products)
      } catch (error) {
        console.log("Failed to fetch", error);
      }
    };

    getCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, accessToken, i18n.language, refreshCartVal]);

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang) {
      i18n.changeLanguage(storedLang);
    }
    document.documentElement.setAttribute('dir', storedLang === 'ar' ? 'rtl' : 'ltr');
  }, [i18n, reget]);

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(res.data)
      cookie.remove('refresh_token');
      navigate('/login');
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <nav className='bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95'>
      <div className='flex items-center justify-between font-primary container mx-auto px-6 py-4'>
        {/* Logo */}
        <Link to={'/'} className='flex-shrink-0'>
          <img src={logo} alt='logo' className='h-10 w-auto transition-transform duration-300 hover:scale-105' />
        </Link>

        {/* Navigation Links */}
        <ul className='hidden md:flex items-center gap-8'>
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              `relative py-2 px-1 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium
              ${isActive ? 'text-blue-600' : ''} 
              before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-600 before:transition-all before:duration-300
              hover:before:w-full ${isActive ? 'before:w-full' : ''}`
            }
          >
            {t("home")}
          </NavLink>
          <NavLink
            to={'/categories'}
            className={({ isActive }) =>
              `relative py-2 px-1 flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium group
              ${isActive ? 'text-blue-600' : ''}
              before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-600 before:transition-all before:duration-300
              hover:before:w-full ${isActive ? 'before:w-full' : ''}`
            }
          >
            {t("categories")}
            <IoIosArrowDown className='text-sm text-gray-500 group-hover:text-blue-600 transition-all duration-300 group-hover:rotate-180' />
          </NavLink>
          <NavLink
            to={'/about'}
            className={({ isActive }) =>
              `relative py-2 px-1 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium
              ${isActive ? 'text-blue-600' : ''}
              before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-600 before:transition-all before:duration-300
              hover:before:w-full ${isActive ? 'before:w-full' : ''}`
            }
          >
            {t("about")}
          </NavLink>
          <NavLink
            to={'/contact'}
            className={({ isActive }) =>
              `relative py-2 px-1 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium
              ${isActive ? 'text-blue-600' : ''}
              before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-600 before:transition-all before:duration-300
              hover:before:w-full ${isActive ? 'before:w-full' : ''}`
            }
          >
            {t("contact_us")}
          </NavLink>
        </ul>

        {/* Right Side Actions */}
        <div className='flex items-center gap-4'>
          {/* Language Switcher */}
          <button
            onClick={() => {
              const newLang = i18n.language === "en" ? "ar" : "en";
              changeLanguage(newLang);
              setReget(!reget)
            }}
            className='px-3 py-1.5 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 border border-transparent hover:border-blue-200'
          >
            {i18n.language === "en" ? "العربية" : "English"}
          </button>

          {/* Action Icons */}
          <div className='flex items-center gap-3'>
            <button className='relative p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 group'>
              <CiHeart className='text-xl' />
            </button>

            <div className='relative group'>
              <button className='flex items-center gap-1 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300'>
                <CiUser className='text-xl' />
                <IoIosArrowDown className='text-sm group-hover:rotate-180 transition-transform duration-300' />
              </button>
            </div>

            {/* Cart Button */}
            <div className='relative'>
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className='relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300'
              >
                <IoCartOutline className='text-xl' />
                <span className='absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg'>
                  {cart.length}
                </span>
              </button>

              {/* Cart Box */}
              {isCartOpen && (
                <div style={{ left: i18n.language === "ar" ? "0" : "", right: i18n.language === "en" ? "0" : "" }} className='absolute mt-2 w-[500px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4'>
                  <div className='flex justify-between items-center mb-3'>
                    <h3 className='text-lg font-semibold text-gray-700'>{t("your_cart")}</h3>
                    <button onClick={() => setIsCartOpen(false)}>
                      <IoClose className='text-xl text-gray-500 hover:text-red-500' />
                    </button>
                  </div>
                  <ul className='space-y-3 max-h-64 overflow-y-auto pr-2'>

                    {cart?.length > 0 ? (
                      cart.map(item => (
                        <li key={item.id} className='flex items-center justify-between gap-3 border-b pb-2'>
                          <div className='flex items-center gap-4'>
                            {item?.product && item?.product?.images?.length > 0 && (
                              <img src={item?.product?.images[0]?.image_url} alt={"d"} className='w-12 h-12 object-cover rounded' />
                            )}
                            <div className='flex-1'>
                              <h4 className='text-sm font-semibold text-gray-800'>{item.product?.translatable_name}</h4>
                              <p className='text-xs text-gray-500'>{t("quantity")} {item.product?.quantity}</p>
                            </div>
                            <span className='text-sm font-bold text-blue-600'>{t("price")}: ${Number(item?.total_price).toFixed(2)}</span>
                          </div>
                          <div className='flex gap-8'>
                            <div className='flex items-center gap-1'>
                              {/* select: */}

                              <span style={{ backgroundColor: item.color?.name || "red" }} className='w-5 h-5 rounded-full block'>
                              </span>
                            </div>
                            <div>
                              <span>{item.size?.translatable_size}</span>
                            </div>
                          </div>
                          <Trash
                            onClick={async () => {
                              await deleteProductFromCart(item.id, accessToken)
                              setRefetch(!refetch)
                            }}
                            size={20}
                            className='text-gray-700 hover:text-gray-800 cursor-pointer' />
                        </li>
                      ))
                    ) : (
                      <span className='text-gray-700'>{t("empty_cart")}</span>
                    )}
                  </ul>
                  {cart.length > 0 && (
                    <>
                      <div className='mt-4 flex justify-between items-center'>
                        <span className='font-medium text-gray-700'>{t("total")}:</span>
                        ${cart.reduce((accumulator, currentItem) => {
                          return accumulator + Number(currentItem.price) * Number(currentItem.quantity)
                        }, 0).toFixed(2)}
                      </div>
                      <Link to={"/checkout"} className='mt-4 block text-center w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-300 text-sm font-medium'>
                        {t("go_checkout")}
                      </Link>
                    </>
                  )}

                </div>
              )}
            </div>

            <button className='relative p-2 text-gray-600 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all duration-300'>
              <GoBell className='text-lg' />
            </button>
          </div>

          {/* Logout Button */}
          {accessToken && (
            <button
              onClick={handleLogout}
              className='ml-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-lg transition-all duration-300'
            >
              {t("logout")}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
