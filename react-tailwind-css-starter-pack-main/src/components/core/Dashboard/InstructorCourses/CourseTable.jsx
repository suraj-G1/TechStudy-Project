import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Table,Th,Tbody,Tr,Thead,Td} from 'react-super-responsive-table'
import { COURSE_STATUS } from '../../../../utils/constants';
import CourseInformationForm from '../AddCourse/CourseInformation/CourseInformationForm';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../slices/courseSlice';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useNavigate } from 'react-router-dom';
const CourseTable = ({courses,setCourses}) => {
    const dispatch = useDispatch();
    const{token} = useSelector((state)=>state.auth);
    const[loading,setLoading] = useState(false);
    const[confirmationModal,setConfirmationModal] = useState(null);
    const navigate = useNavigate();
    const handleDeleteCourse=async(courseId)=>{
        setLoading(true);
        await deleteCourse({courseId:courseId},token);
        setLoading(false);
        const result = await fetchInstructorCourses(token);
        if(result){
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
        setLoading(false);
    }
  return (
    <div>
        <Table>
            <Thead>
                <Tr>
                    <Th>Couses</Th>
                    <Th>Duration</Th>
                    <Th>Price</Th>
                    <Th>Action</Th>
                </Tr>
            </Thead>

            <Tbody>
                {
                    courses.length === 0 ?
                    (   
                        <Tr>
                            <Td>No Courses Found</Td>
                        </Tr> 
                    ):
                    (
                        courses?.map((course)=>{
                            <Tr key={course._id} className='flex gap-x-10 border-richblack-800'>
                                <Td className='flex gap-x-4'>
                                    <img src={course?.thumbnail} className='h-[150px] w-[120px] rounded-lg'/>
                                    <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.description}</p>
                                        <p>Craeted</p>
                                        {
                                            course.status === COURSE_STATUS.DRAFT?
                                            (<p className='text-pink-50'>Drafted</p>)
                                            :
                                            (<p className='text-yellow-50'>Published</p>)
                                        }
                                    </div>
                                </Td>

                                <Td>
                                    2 hrs 30 min
                                </Td>

                                <Td>
                                    {course.price}
                                </Td>

                                <Td>
                                    <button disabled={loading}
                                        onClick={()=>navigate(`/dashboard/edit-course/${course._id}`)}

                                        >
                                        Edit
                                    </button>

                                    <button  
                                        disabled={loading}
                                        onClick={()=>setConfirmationModal({
                                            text1:"Do you want to delete the course",
                                            text2:"Your Course will be permanantely Deleted",
                                            btn1Text:"Delete",
                                            btn2Text:"Cancel",
                                            btn1Handler:!loading?()=>handleDeleteCourse(course._id):(()=>{}),
                                            btn2Handler:!loading?()=>setConfirmationModal(null):()=>{}
                                        
                                        })}
                                        >


                                    </button>
                                </Td>
                            </Tr>
                        })
                    )
                }
            </Tbody>
        </Table>
        {
            confirmationModal && <CourseInformationForm modalData={confirmationModal}/>
        }
        
    </div>
  )
}

export default CourseTable