import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import IconBtn from '../../common/IconBtn';
import CourseTable from './InstructorCourses/CourseTable';
const MyCourses = () => {

    const {token} = useSelector((state)=>state.auth);
    const{course} = useSelector((state)=>state.course);
    const navigate = useNavigate();
    const[courses,setCourses] = useState([]);

    useEffect(()=>{
        const fetchCourses =async () =>{
            const result = await fetchInstructorCourses(token);
        }
        fetchCourses();
    },[])
  return (
    <div>
        <div>
            <h1 className='text-richblack-5'>My Courses</h1>
            <IconBtn text={
               "Add Course"
            } onclick={navigate("/dashboard/add-course")}/>
        </div>
        {
            courses.length>0 && <CourseTable courses = {courses} setCourses = {setCourses}/>
        }
    </div>
  )
}

export default MyCourses