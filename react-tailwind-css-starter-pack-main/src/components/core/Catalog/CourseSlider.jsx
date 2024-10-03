import React from 'react'
import {Swiper,SwiperSlide, }  from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import {FreeMode,Pagination} from 'swiper'
import Course_Card from './Course_Card'
const CourseSlider = ({Courses}) => {
  return (
    <>
        {
            Courses?.length ? 
            (
                <Swiper slidesPerView={1} loop={true} >
                    {
                        Courses.map((course,index)=>{
                            <SwiperSlide>
                                <Course_Card course={course} Height={'h-[250px]'}/>
                            </SwiperSlide>
                        })
                    }
                </Swiper>
            )
            :
            (
                <p>No Courses Found</p>
            )
        }
    </>
  )
}

export default CourseSlider