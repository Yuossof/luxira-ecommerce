import { useState } from 'react';
import SimilarProducts from './SimilarProducts/SimilarProducts';
import axios from 'axios';
import { Calendar, MessageCircle, Send, Star, Trash2 } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import useSetToken from '../../../../../store/useSetToken';
import LoadingSpinner from '../../../../../Components/LoadingSpinner';

import Cookies from 'universal-cookie';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line react/prop-types
const Reviews = ({ similarProducts = [], product_id, reviews, setRefreshReviews }) => {
    const {i18n, t} = useTranslation()
    const cookies = new Cookies()
    const userEmail = cookies.get("email")
    const { accessToken } = useSetToken()
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [isLoadingWhileDelete, setIsLoadingWhileDelete] = useState(false)
    const [reviewId, setReviewId] = useState("")



    const handleRatingClick = (star) => {
        setRating(star);
    };

    const handleRatingHover = (star) => {
        setHoveredRating(star);
    };

    const handleRatingLeave = () => {
        setHoveredRating(0);
    };

    const storeReview = async () => {

        // if (!comment.trim() || rating === 0) {
        //     return;

        // }

        try {
            setIsLoading(true);
            const url = `${import.meta.env.VITE_API_URL}/api/review/store`;
            const res = await axios.post(
                url,
                { comment: comment, rate: rating, product_id: product_id }, 
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Accept-Language": i18n.language
                    },
                }
            );
            setComment("");
            setRating(0);
            toast.success(res.data.message);
            setRefreshReviews(prev => !prev)
        } catch (error) {
            const errors = error.response.data.errors;
            console.log(error)
            if (errors) {
                const keys = Object.keys(errors);
                toast.error(errors[keys[0]][0]);
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const deleteReview = async (reviewID) => {
        try {
            setIsLoadingWhileDelete(true)
            const url = `${import.meta.env.VITE_API_URL}/api/review/delete/${reviewID}`;
            const res = await axios.delete(
                url,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(res.data)
            setRefreshReviews(prev => !prev)
        } catch (error) {
            console.log("thhthhththth", error)
        } finally {
            setIsLoadingWhileDelete(false)
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}/${month}/${day}`;
    }

    const getRatingColor = (rate) => {
        if (rate >= 4) return 'text-green-500';
        if (rate >= 3) return 'text-yellow-500';
        return 'text-red-500';
    };

    const getAverageRating = () => {

        // eslint-disable-next-line react/prop-types
        if (!reviews || reviews.length === 0) return 0;
        // eslint-disable-next-line react/prop-types
        const sum = reviews.reduce((acc, review) => acc + review.rate, 0);
        // eslint-disable-next-line react/prop-types
        return (sum / reviews.length).toFixed(1);
    };

    return (
        <div className='py-12 px-4 max-w-6xl mx-auto'>
            <ToastContainer />
            {/* Header Section */}
            <div className="text-center mt-28">
                <div className='w-full flex justify-start'>
                    <div className="flex items-center gap-3 ">
                        <MessageCircle className="text-gray-800 w-8 h-8" />
                        <h1 className='text-4xl font-bold !text-gray-800'>
                            {t("reviews")}
                        </h1>
                    </div>
                </div>

                {/* Rating Summary */}
                {/* eslint-disable-next-line react/prop-types */}
                {reviews && reviews.length > 0 && (
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <span className="text-3xl font-bold text-gray-800">{getAverageRating()}</span>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-6 h-6 ${star <= Math.round(getAverageRating())
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                        {/* eslint-disable-next-line react/prop-types */}
                        <span className="text-gray-600">({reviews.length} {t("reviews")})</span>
                    </div>
                )}
            </div>

            {/* Reviews List */}
            <div className="space-y-6 mb-10">

                {/* eslint-disable-next-line react/prop-types */}
                {reviews && reviews.map((review) => (
                    <div key={review.id}
                        className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <img
                                            src={review?.user?.image_url}
                                            alt="Reviewer"
                                            className='w-14 h-14 rounded-full object-cover ring-4 ring-blue-50'
                                        />
                                        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
                                            <span className="text-white text-xs">✓</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 text-lg">
                                            {review.user.first_name} {review.user.last_name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Calendar
                                                className="w-4 h-4 text-gray-400" />
                                            <span className='text-gray-500 text-sm'>
                                                {formatDate(review.created_at)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        <span className={`font-bold text-lg ${getRatingColor(review.rate)}`}>
                                            {review.rate}
                                        </span>
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`w-5 h-5 ${star <= review.rate
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {isLoadingWhileDelete && review.id === reviewId && (
                                        <LoadingSpinner w={20} h={20} />
                                    )}

                                    {userEmail === review.user.email && !isLoadingWhileDelete && (
                                        <button
                                            onClick={() => {
                                                setReviewId(review.id)
                                                deleteReview(review.id)
                                            }}
                                            className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all duration-200">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    )}

                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 ml-18">
                                <p className='text-gray-700 leading-relaxed text-base'>
                                    {review.comment}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Review Form */}
            <div className=" from-white to-blue-50 rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
                <div className="bg-[#115573] p-4">
                    <h3 className="text-white font-bold text-xl flex items-center gap-2">
                        <MessageCircle className="w-6 h-6" />
                       {t("write_your_review")}
                    </h3>
                </div>

                <div className="p-6">
                    {/* Rating Section */}
                    <div className="mb-6">
                        <label className='block text-gray-700 font-semibold mb-3 text-lg'>
                            {t("your_rating")}
                        </label>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => handleRatingClick(star)}
                                    onMouseEnter={() => handleRatingHover(star)}
                                    onMouseLeave={handleRatingLeave}
                                    className="transition-all duration-200 hover:scale-110"
                                >
                                    <Star
                                        className={`w-8 h-8 ${star <= (hoveredRating || rating)
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-gray-300 hover:text-yellow-200'
                                            }`}
                                    />
                                </button>
                            ))}
                            <span className="ml-3 text-gray-600 font-medium">
                                {rating > 0 && `(${rating}/5)`}
                            </span>
                        </div>
                    </div>

                    {/* Comment Section */}
                    <div className="mb-6">
                        <label className='block text-gray-700 font-semibold mb-3 text-lg'>
                           {t("your_comment")}
                        </label>
                        <div className="relative">
                            <textarea
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                                className='w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 resize-none h-32 text-base'
                                placeholder='Share your thoughts about this product...'
                            />
                            <div className="absolute bottom-3 right-3 text-sm text-gray-400">
                                {comment.length}/500
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={storeReview}
                            // disabled={isLoading || !comment.trim() || rating === 0}
                            className={`
                                px-8 py-3 rounded-xl font-semibold text-white flex items-center gap-3 transition-all duration-300 transform hover:scale-105
                                ${isLoading || !comment.trim() || rating === 0
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                                }
                            `}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                    Posting...
                                </>
                            ) : (
                                <>
                                    {t("post_review")}
                                    <Send className='w-5 h-5' />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Similar Products */}
            <div className="mt-12">
                {similarProducts && <SimilarProducts similarProducts={similarProducts} />}
            </div>
        </div>
    );
};

export default Reviews;
