import { Rating } from "flowbite-react";
import { useTranslation } from "react-i18next";
import Reviews from './Reviews/Reviews';
import { useEffect, useState } from "react";
import axios from "axios";
import useSetToken from "../../../../store/useSetToken";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import insertProductsToCart from "../../../../store/useCart";
const ProductDetails = () => {
  const { t, i18n } = useTranslation();
  const { accessToken } = useSetToken();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState("")
  const [similarProducts, setSimilarProducts] = useState([])
  const [refreshReviews, setRefreshReviews] = useState(false)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [addProductLoading, setAddProductLoading] = useState(false)
  const { refreshCart } = insertProductsToCart()

  useEffect(() => {
    const getProducts = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/api/product/${id}`;
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Accept-Language": i18n.language
          },
        });
        setProduct(res.data.data.product);
        setCurrentImage(res.data.data.product.images[0].image_url)
        setSimilarProducts(res.data.data.similar_products)
        console.log("s", res.data);
      } catch (error) {
        console.log("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshReviews]);


  const addToCart = async () => {
    try {
      setAddProductLoading(true)
      const url = `${import.meta.env.VITE_API_URL}/api/cart/store`;
      const res = await axios.post(url, {
        product_id: id,
        color_id: selectedColor,
        size_id: selectedSize,
        quantity: quantity
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast.success("Product added to cart successfully")
      console.log(res.data)
      refreshCart()
    } catch (error) {
      console.log("Failed to fetch cart:", error);
    } finally {
      setIsLoading(false);
      setAddProductLoading(false)
    }
  }

  if (isLoading || !product || !product.images || !product.name || !product.desc) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="text-lg text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <div className='lg:container pt-16 font-primary px-4 sm:px-6 lg:px-8 w-full'>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full">
        {/* Image Section */}
        <div className="flex flex-col w-full sm:flex-row gap-4 sm:gap-6 flex-1 lg:max-w-[600px]">
          {/* Thumbnail Images */}
          <div className="flex sm:flex-col gap-3 justify-start sm:justify-center order-2 sm:order-1 overflow-x-auto sm:overflow-visible">
            {product.images?.map((image) => (
              <img
                key={image.id}
                onClick={() => setCurrentImage(image.image_url)}
                className={`w-[85px] sm:w-[100px] lg:w-[120px] h-[85px] sm:h-[100px] lg:h-[120px] flex-shrink-0 cursor-pointer hover:opacity-80 transition-all duration-300 aspect-square border-2 rounded-lg object-cover ${currentImage === image.image_url ? 'border-blue-500' : 'border-gray-200'
                  }`}
                src={image.image_url}
                alt=""
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="w-full ">
            <img
              className='bg-gray-50 rounded-lg block w-full sm:w-full md:w-[450px] lg:w-[480px] h-[350px] sm:h-[400px] md:h-[450px] lg:h-[480px] object-cover order-1 sm:order-2'
              src={currentImage}
              alt=""
            />
          </div>

        </div>

        {/* Product Info Section */}
        <div className="flex flex-col gap-5 flex-1 lg:max-w-[500px]">
          <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight'>
            {product.translatable_name}
          </h1>

          <Rating className='flex gap-1'>
            <Rating.Star className='text-2xl sm:text-3xl lg:text-4xl' />
            <Rating.Star className='text-2xl sm:text-3xl lg:text-4xl' />
            <Rating.Star className='text-2xl sm:text-3xl lg:text-4xl' />
            <Rating.Star className='text-2xl sm:text-3xl lg:text-4xl' />
            <Rating.Star className='text-2xl sm:text-3xl lg:text-4xl' filled={false} />
          </Rating>

          <div className="flex items-center gap-4">
            <span className='font-bold text-2xl sm:text-3xl text-blue-600'>
              {product.price}
            </span>
            <div>
              {product.discount && (
                <span className='font-bold block text-xl line-through text-gray-600 '>
                  {product.price - product.discount.price}
                </span>
              )}
            </div>
          </div>

          <p className='text-gray-700 border-b border-gray-200 pb-6 pt-2 leading-relaxed text-sm sm:text-base'>
            {product.translatable_desc}
          </p>

          {/* Colors Section */}
          <div className='pt-2'>
            <span className='mb-4 block text-gray-800 font-medium text-base sm:text-lg'>{t("colors")}</span>
            <div className="flex gap-3 border-b border-gray-200 pb-6 flex-wrap">
              {product.colors?.map((color) => (
                <span
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  style={{ backgroundColor: color.name }}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full cursor-pointer transition-all duration-300 border-2 hover:scale-110 ${selectedColor === color.id ? 'border-gray-800' : 'border-gray-300'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Sizes Section */}
          <div className="text-gray-800 pt-2 pb-4 border-b border-gray-200">
            <span className='font-medium text-base sm:text-lg mb-4 block'>{t("sizes")}</span>
            <div className="flex gap-3 sm:gap-4 flex-wrap">
              {product.sizes?.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`px-4 py-2 sm:px-5 sm:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base border-2 ${selectedSize === size.id
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                >
                  {size.translatable_size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center mt-4 gap-4 sm:gap-6">
            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 hover:bg-gray-100 transition-colors duration-200 font-bold text-lg text-gray-600"
              >
                -
              </button>
              <span className='px-6 py-3 font-semibold text-lg bg-white border-x border-gray-200'>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className='px-4 py-3 hover:bg-gray-100 transition-colors duration-200 font-bold text-lg text-gray-600'
              >
                +
              </button>
            </div>
            <button
              disabled={addProductLoading}
              style={{ opacity: addProductLoading ? "0.7" : "1" }}
              onClick={addToCart}
              className='bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-3 font-semibold transition-all duration-300 w-full sm:flex-1 text-base sm:text-lg'>
              {t("add_to_cart")}
            </button>
          </div>
        </div>
      </div>

      <Reviews
        similarProducts={similarProducts}
        product_id={id}
        reviews={product.reviews}
        setRefreshReviews={setRefreshReviews}
      />
    </div>
  );
};

export default ProductDetails;