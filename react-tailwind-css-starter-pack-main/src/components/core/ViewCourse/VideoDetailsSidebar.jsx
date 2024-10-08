import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';

const VideoDetailsSidebar = ({setReviewModal}) => {

    const[activeStatus,setActiveStatus] = useState("");
    const[videobarActive,setVideobarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const{sectionId,subSectionId} = useParams();
    const{
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state)=>state.viewCourse);

    useEffect(()=> {
        const setActiveFlags = () => {
            if(!courseSectionData.length)
                return;
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            )
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex]?._id;
            //set current section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            //set current sub-section here
            setVideobarActive(activeSubSectionId);
        }
        setActiveFlags();
    },[courseSectionData, courseEntireData, location.pathname])
  return (
    <>
        <div>
            {/* For buttons and headings */}
            <div>
                {/* For Buttons */}
                <div>
                    <div>
                        {/* Add back button arrow here */}
                        
                        <button onClick={navigate('/dashboard/enrolled-courses')}>
                            Back
                        </button>
                    </div>

                    <div>
                        <IconBtn text={"Add a Review"} onclick={()=>setReviewModal(true)}/>
                    </div>
                </div>
                {/* For headings */}
                <div>
                    <p>{courseEntireData?.courseName}</p>
                    <p>{completedLectures}/{totalNoOfLectures}</p>
                </div>
            </div>

            {/* For sections and subsections */}
            <div>
                {
                    courseSectionData.map((section,index)=>{
                        <div onclick={()=>setActiveStatus(section._id)} key={index}>

                            {/* Sections */}
                            <div>
                                <div>
                                    {
                                        section?.sectionName
                                    }
                                </div>
                            </div>

                            {/* sub Sections */}
                            <div>
                                {
                                    activeStatus === section._id && (
                                        <div>
                                            {
                                                section.subSection.map((subSection,index)=>{
                                                    <div key={index} 
                                                        className={`flex gap-x-5 p-5 
                                                        ${videobarActive === subSection._id?
                                                        "bg-yellow-200 text-richblack-900":
                                                        "bg-richblack-900 text-white"}`}
                                                        onClick={()=>{navigate(`/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${subSection._id}` 
                                                                    
                                                                )
                                                                setVideobarActive(subSection._id)
                                                        }}
                                                        >
                                                        <input type='checkbox'  
                                                                checked={completedLectures.includes(subSection._id)}
                                                                onChange={()=>{}}
                                                        /> 

                                                        <span>{subSection.title}</span>
                                                        
                                                    </div>
                                                })
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </>
  )
}

export default VideoDetailsSidebar