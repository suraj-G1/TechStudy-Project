import React, { useEffect, useState } from 'react'
import { buyCourse } from '../services/operations/studentFeatureAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import GetAvgRating from '../utils/avgRating';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import Error from './Error';
import ConfirmationModal from '../components/common/ConfirmationModal'
import RatingStars from '../components/common/RatingStars';
import { formatDate } from '../services/formatDate';
const CourseDetails = () => {
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams();
    const[courseData,setCourseData] = useState(null);
    const{loading} = useSelector((state)=>state.profile);
    const{profileLoading} = useSelector((state)=>state.course)
    const [confirmationModal,setConfirmationModal] = useState(null);
    const handleBuyCourse=()=>{
        if(token){
            buyCourse(token,[courseId],user,dispatch,navigate);
            return;
        }
        setConfirmationModal({
            text1:"You are not logged in",
            text2:"Please log in to Buy Course",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:()=>navigate('/login'),
            btn2Handler:()=>setConfirmationModal(null)

        })
    }

    useEffect(()=>{
        const getCourseFullDetails=async()=>{
            try{
                const result = await fetchCourseDetails(courseId);
                setCourseData(result);
    
            }catch(error){
                console.log("Error while getting full details of Course");
            }
        }
        getCourseFullDetails();
    },[courseId])


    const[avgReviewCount,setAvgReviewCourt] = useState(0);
    useEffect(()=>{
        const count = GetAvgRating(courseData?.data?.courseDetails?.ratingAndReviews);
        setAvgReviewCourt(count);
    },[courseData])

    const[totalNoOfLectures,setTotalNoOfLectures] = useState(0);
    useEffect(()=>{
        let lecture = 0;
        courseData?.data?.CourseDetails?.courseContent?.forEach((sec)=>{
            lecture += sec.subSection || 0;
        })
        setTotalNoOfLectures(lecture);
    },[courseData]);

    if(loading || !courseData){
        return (
            <div>Loading</div>
        )
    }

    if(!courseData.success){
        return (
            <div>
                <Error/>
            </div>
        )
    }
    const{
        _id:course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        createdAt,
        studentsEnrolled,
        instructor,
    } = courseData.data?.courseDetails;
  return (
    <div className='flex'>
        <p>{courseName}</p>
        <p>{courseDescription}</p>
        <div className='flex gap-2'> 
            <p>{avgReviewCount}</p>
            <RatingStars  Review_Count={avgReviewCount} Star_Size={25}/>
            <p>{`${ratingAndReviews.length} reviews`}</p>
            <p>{`${studentsEnrolled.length} Sturdent Enrolled`}</p>
        </div>

        <div>
            <p>Create By {`${instructor.firstName}`}</p>
        </div>

        <div>
            <p>Created At {formatDate(createdAt)}</p>
            <p>English</p>
        </div>



        {
            confirmationModal && <ConfirmationModal/>
        }
    </div>
  )
}

export default CourseDetails