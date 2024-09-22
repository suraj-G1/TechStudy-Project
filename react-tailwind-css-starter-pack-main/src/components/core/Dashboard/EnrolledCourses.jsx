import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar'
const EnrolledCourses = () => {
    const {token} = useSelector((state)=>state.auth);
    const[enrolledCourses,setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async()=>{
        try{
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        }catch(error){
            console.log("Unable to Fetch Error");
        }
    }

    useEffect(()=>{
        getEnrolledCourses();
    },[])

    
  return (
    <div>
        <div>Enrolled Courses</div>
        {
            !enrolledCourses ?
             (
             <div>Loading</div>
             )
             :
             !enrolledCourses.length?(<div> You haven't enrolled to any course</div>):
             (
                <div>
                    <div>
                        <p>Course Name</p>
                        <p>Duration</p>
                        <p>Progress</p>
                    </div>
                    {
                        enrolledCourses.map((course,index)=>{
                            return (
                                <div>
                                    <div>
                                        <img src={course.thumbnail}/>
                                        <div>
                                            <p>{course.name}</p>
                                            <p>{course.courseDescription}</p>
                                        </div>
                                    </div>

                                    <div>
                                        {
                                            course?.duration
                                        }
                                    </div>

                                    <div>
                                        <p>Progress : {course.progressPercentage || 0}%</p>
                                        <ProgressBar
                                        completed={course.progressPercentage || 0}
                                        height='8px'
                                        isLabelVisible={false}

                                        />
                                    </div>

                                    
                                </div>
                            )
                        })
                    }
                </div>
             )
        }
    </div>
  )
}

export default EnrolledCourses
