import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../services/operations/profileAPI';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';
const Instructor = () => {
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const[loading,setLoading] = useState(false);
    const[instructorData,setInstructorData] = useState(null);
    const[courses,setCourses] = useState([]);


    useEffect(()=>{
        const getCourseDataWithStats = async(req,res)=>{
            setLoading(true);

            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);

            if(instructorApiData.length){
                setInstructorData(instructorApiData);
            }
            if(result){
                setCourses(result);
            }


            setLoading(false);
        }
        getCourseDataWithStats();
    },[])

    const totalStudents = instructorData?.reduce((acc,curr)=>acc + curr.totalStudentEnrolled);
    const totalAmount = instructorData?.reduce((acc,curr)=>acc + curr.totalAmountGenerated);

  return (
    <div className='text-white'>
        <div>
            <p>{user.firstName}</p>
            <p>Let's start something new</p>
        </div>
        {
            loading?
                (
                    <div className='loading'></div>
                )
                :
                (
                    courses.length > 0 
                    ? 
                    (
                        <div>
                            <div>
                                <InstructorChart courses={instructorData}/>

                                <div>
                                    <p>Statistics</p>
                                    <div>
                                        <p>Total Courses</p>
                                        <p>{courses.length}</p>
                                    
                                    </div>

                                    <div>
                                        <p>Total Students</p>
                                        <p>{totalStudents}</p>
                                    </div>

                                    <div>
                                        <p>Total Earning</p>
                                        <p>{totalAmount}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Show all the courses of the instructor */}
                            <div>
                                <div>
                                    <p>Your Courses</p>
                                    <Link to={'/dashboard'}>
                                        <p>View All</p>
                                    </Link>
                                </div>


                                {/* Show only data of 3 courses */}
                                <div>
                                    {
                                        courses.slice(0,3).map((course)=>{
                                            <div>
                                                <img src={course.thumbnail}/>

                                                <div>
                                                    <p>{course.courseName}</p>
                                                    <div>
                                                        <p>{course.studentsEnrolled.length}</p>
                                                        <p>|</p>
                                                        <p>Rs {course.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div>
                            <p>You have not created any course</p>
                            <Link to={'/dashboard/add-course'}>
                                <p>Add Course</p>
                            </Link>
                        </div>
                    )
                )
        }
    </div>
  )
}

export default Instructor