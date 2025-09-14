import { HiAdjustmentsVertical } from "react-icons/hi2";
import CategoryNames from './CategoryNames/CategoryNames';
import Price from './Price/Price';
import Size from './Size/Size';
import './Aside.css';
import { useEffect, useState } from 'react';
import useSetToken from '../../../store/useSetToken';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import Colors from "./Colors/Colors";
import Brands from "./brands/Brands";
import useFilter from "../../../store/useFilter";
const Aside = () => {
    const { t } = useTranslation()
    const [subcategories, setSubcategories] = useState([])
    const [sizes, setSizes] = useState([])
    const [colors, setColors] = useState([])
    const [brands, setBrands] = useState([])
    const { accessToken } = useSetToken()
    const {filteredData} = useFilter()

    useEffect(() => {
        const getProducts = async () => {
            // setIsLoading(true)
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/product`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                })
                console.log("allls", res.data.data)
                setSubcategories(res.data.data.subcategories)
                setSizes(res.data.data.sizes)
                setColors(res.data.data.colors)
                setBrands(res.data.data.brands)
            } catch (error) {
                console.log("Failed to fetch subcategories:", error)
            } finally {
                // setIsLoading(false)
            }
        }

        getProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='border border-offWhite rounded-3xl w-[270px] h-fit sticky left-0 top-[20px] ml-4'>
            <div className="flex items-center justify-between border-b-2 border-main pb-4 p-[20px]">
                <h1 className='font-primary font-semibold text-dark text-[25px] tracking-wide'>{t("filter")}</h1>
                <HiAdjustmentsVertical className='text-[27px] text-blue' />
            </div>
            <CategoryNames subcategories={subcategories} cId={filteredData.subcategory_id}/>
            <Price />
            <Size sizes={sizes} />
            <Colors colors={colors} />
            <Brands brands={brands} />
        </div>
    );
}

export default Aside;
