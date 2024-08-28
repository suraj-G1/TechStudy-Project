import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className='mt-16'>
        <div className='flex gap-20 items-center'>
            <div className='w-[50%]'>
                <img src={Instructor}
                alt='Instructoru'
                className='shadow-white'/>
            </div>

            <div className='w-[50%] flex flex-col gap-10' >
                <div className='text-3xl font-semibold text-white w-[50%]'>
                    Become an 
                    <HighlightText text={'Instructor'}/>
                </div>

                <p className='font-medium text-[16px] w-[90%] text-richblack-300'>
                    Instructor around the world teach millions of student on StudyNotion. We provide tools and skills to teach what you love
                </p>

                <div className='w-fit'>
                <CTAButton active={true} linkto={'/signup'}>
                    <div className='flex gap-2 items-center'>
                        Start Teaching Today
                        <FaArrowRight/>
                        
                    </div>
                </CTAButton>

                </div>

                
            </div>
        </div>

        

    </div>
  )
}

export default InstructorSection