import React from 'react';
import { MdFacebook } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import './Footer.css';
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();

    return (
        <div className='bg-blue font-primary mt-16'>
            <div className='border-b border-gray flex items-center justify-between pb-10 pt-[50px] container'>
                <div>
                    {/* <img src={logo} alt="Logo" /> */}
                    <div className="flex gap-3 text-white mt-5 justify-center">
                        <MdFacebook className='text-[23px]' />
                        <FaInstagram className='text-[23px]' />
                        <FaXTwitter className='text-[23px]' />
                    </div>
                </div>

                <div className='text-white'>
                    <h1 className='text-[20px]'>{t("footer.customerServices")}</h1>
                    <div className="flex flex-col gap-3 mt-6">
                        <span className='text-[14px]'>{t("footer.faqs")}</span>
                        <span className='text-[14px]'>{t("footer.terms")}</span>
                        <span className='text-[14px]'>{t("footer.privacy")}</span>
                    </div>
                </div>

                <div className='text-white'>
                    <h1 className='text-[20px]'>{t("footer.profile")}</h1>
                    <div className="flex flex-col gap-3 mt-6">
                        <span className='text-[14px]'>{t("footer.account")}</span>
                        <span className='text-[14px]'>{t("footer.wishlist")}</span>
                        <span className='text-[14px]'>{t("footer.settings")}</span>
                    </div>
                </div>

                <div className='text-white'>
                    <h1 className='text-[20px]'>{t("footer.contact")}</h1>
                    <div className="flex flex-col gap-3 mt-6">
                        <span className='text-[14px]'>{t("footer.phone")}</span>
                        <span className='text-[14px]'>{t("footer.email")}</span>
                        <span className='text-[14px]'>{t("footer.address")}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center gap-5 text-white p-6">
                <span>{t("footer.termsOfUse")}</span>
                <span>{t("footer.privacyPolicy")}</span>
                <span>{t("footer.rights")}</span>
            </div>
        </div>
    );
}

export default Footer;
