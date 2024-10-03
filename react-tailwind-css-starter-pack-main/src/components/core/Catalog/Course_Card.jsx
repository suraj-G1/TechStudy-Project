import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating';
const Course_Card = ({course,Height}) => {
    const[avgReviewCount,setAvgReviewCount] = useState(0);

    useEffect(()=>{
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])
  return (
    <div>
        <Link to={`/courses/${course._id}`}>
            <div>
                <div>
                    <img src={course?.thumbnail} alt='Course Thumbnail' className={`${Height} w-full rounded-xl object-cover`}/>
                </div>

                <div>
                    <p>{course?.name}</p>
                    <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    <div>
                        <span>{avgReviewCount}</span>
                        <RatingStars Review_Count={avgReviewCount}/>
                        <span>{course?.ratingAndReviews?.length} Ratings</span>
                    </div>
                    <p>course.price</p>
                </div>
            </div>
        
        </Link>
    </div>
  )
}

export default Course_Card