import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast, {Toast} from 'react-hot-toast'
import copy from 'copy-to-clipboard'
import {ACCOUNT_TYPE} from '../../../utils/constants'
import { addToCart } from '../../../slices/cartSlice';
const CourseDetailsCard = ({course,setConfirmatinModal,handleBuyCourse}) => {
    const{user} = useSelector((state)=>state.profile);
    const{token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const{
        thumbnail,
        price,

    } = course;

    const handleAddToCart=()=>{
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are an Instructor ,You can't buy Course");
            return;
        }
        if(token){
            dispatch(addToCart(course));
            return;
        }

        setConfirmatinModal({
            text1:"You are not logged in",
            text2:"Please login to add to cart",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:()=>navigate('/login'),
            btn2Handler:()=>setConfirmatinModal(null)
        })
    }

    const handleShare=()=>{
        copy(window.location.href());
        toast.success("Link Copied to Clipboard");
    }
  return (
    <div>
        <img src={thumbnail} alt='Thumbnail Image' className='max-h-[300px] w-[400px]'/>
        <div>
            Rs.{price}
        </div>
        <div className='flex flex-col gap-y-4'>
            <button className='bg-yellow-50'
                onClick={user && course?.studentsEnrolled.includes(user?._id)?(()=>navigate('/dashboard/enrolled-courses')):(()=>handleBuyCourse)}
            >
                {
                    user && course?.studentsEnrolled.includes(user?._id)?"Go To Course":"Buy Now"
                }
            </button>
            {
                course?.studentsEnrolled.includes(user?._id) && (
                    <button className='bg-yellow-50' onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                )
            }
        </div>
        <div>
            <p>30 day Money Back Guarantee</p>
            <p>This Course Includes</p>
            <div>
                {
                    course.instructions.map((item,index)=>{
                        <p key={index} className='flex gap-2'>{item}</p>
                    })
                }
            </div>
        </div>

        <div className='mx-auto flex items-center gap-2 p-6 text-yellow-50'>
            <button onClick={handleShare}>Share</button>
        </div>
    </div>
  )
}

export default CourseDetailsCard