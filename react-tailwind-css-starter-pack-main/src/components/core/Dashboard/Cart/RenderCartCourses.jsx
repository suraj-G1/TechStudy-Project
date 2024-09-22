import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-rating-stars-component'
import {RiStarSLine} from 'react-icons/ri'
import { AiFillDelete } from 'react-icons/ai'
import { removeFromCart } from '../../../../slices/cartSlice'
const RenderCartCourses = () => {

    const {cart} = useSelector((state)=>state.cart);
    const dispatch = useDispatch();
  return (
    <div>
        {
            cart.map((course,index)=>(
            
                    <div>
                        <div>
                            <img src={course?.thumbnail} alt='thumbnail'/>
                            <div>
                                <p>{course?.courseName}</p>
                                <p>{course?.category?.name}</p>

                                <div>
                                    <p>4.8</p>
                                    <ReactStars
                                    count={5}
                                    size={20}
                                    edit={false}
                                    activeColor='#ffd700'
                                    emptyIcon={<RiStarSLine />}
                                    fullIcon={<RiStarSLine />}
                                    />

                                    <span>{course?.ratingAndReview?.length} Ratings</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button onClick={dispatch(removeFromCart)}>
                            <AiFillDelete />
                            Remove
                            </button>

                            <p>Rs{course?.price}</p>
                        </div>

                    </div>
                )
            )
        }
    </div>
  )
}

export default RenderCartCourses