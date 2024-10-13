import React, { useEffect, useState } from 'react'
import { ratingsEndpoints } from '../../services/apis';
import { apiConnector } from '../../services/apiconnector';
//import { Swiper,SwiperSlide } from 'swiper/react';
import {Swiper,SwiperSlide, }  from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import {FreeMode,Pagination} from 'swiper'
import ReactStars from 'react-rating-stars-component'
import { FaStar } from 'react-icons/fa';
const ReviewSlider = () => {
    const[reviews,setReviews] = useState([]);
    const truncateWords = 15;
    useEffect(()=>{
        const fetchAllReviews = async()=>{
            const {data} = await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API)
            if(data?.success){
                setReviews(data?.data);
            }
        }
        fetchAllReviews();
    },[])
  return (
    <div className='text-white'>
        <div className='h-[190px] max-w-maxContent'>
            <Swiper 
                slidesPerView={4}
                loop={true}
                spaceBetween={24}
                freeMode={true}
                autoplay={{delay:2500}}
                //modules={[FreeMode,Pagination]}
            >
                {
                    reviews.map((review,index)=>{
                        return (
                            <SwiperSlide key={index}>
                                <img src={review?.user?.image
                                    ?review?.user?.image
                                    :
                                    `https://api.dicebear.com/5.x/initials/svg?seed=${review.user.firstName}&${review.user.lastName}`} alt='Profile Pic' loading='lazy' 
                                    className='h-9 w-9 rounded-full object-cover'
                                    />
                                <p>{review?.user?.firstName} {review?.user?.lastName}</p>
                                <p>{review?.course?.courseName}</p>
                                <p>{review?.review}</p>
                                <p>{review?.rating.toFixed(1)}</p>

                                <ReactStars
                                    value={review.rating}
                                    count={5}
                                    size={20}
                                    edit={false}
                                    activeColor='#ffd700'
                                    emptyIcon = {<FaStar/>}
                                    fullIcon = {<FaStar/>}
                                >

                                </ReactStars>
                            </SwiperSlide>
                        )
                    })
                }

            </Swiper>
        </div>

    </div>
  )
}

export default ReviewSlider