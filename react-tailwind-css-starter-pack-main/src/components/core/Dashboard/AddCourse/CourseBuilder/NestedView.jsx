import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BiSolidDownArrow } from "react-icons/bi";
import { FaPlusCircle } from "react-icons/fa";
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../common/ConfirmationModal'
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
const NestedView = ({handleChangeEditSectionName}) => {

    const {course} = useSelector((state)=>state.course);
    const{token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const[addSubSection,setAddSubSection] = useState(null);
    const[viewSubSection,setViewSubSection] = useState(null);
    const[editSubSection,setEditSubSection] = useState(null);
 
    const [confirmationModal,setConfirmationModal] = useState(null);

    const handleDeleteSection=async (sectionId)=>{
        const result = await deleteSection({
            sectionId,
            courseid:course._id,
            token,
        })
        if(result){
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);

    }

    const handleDeleteSubSection=async(subSectionId,sectionId)=>{
        const result = await deleteSubSection({
            subSectionId,
            sectionId,
            token,
            
        })
        if(result){
            const updatedCourseContent = await course.courseContent.map((section)=>section._id === sectionId?result:section);
            const updatedCourse = {...course,courseContent:updatedCourseContent};
            dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null);
    }
  return (
    <div>
        <div className='rounded-lg bg-richblack-700 p-6 px-8'>
            {
                course?.courseContent?.map((section)=>{
                    <details key={section._id} open>
                        <summary className='flex items-center justify-between gap-x-3 border-b-2'>
                            <div className='flex items-center gap-x-3'>
                                <RxDropdownMenu/>
                                <p>{section.sectionName}</p>
                            </div>

                            <div className='flex'>
                                <button onClick={()=>handleChangeEditSectionName(section._id,section.sectionName)}>
                                    <MdModeEditOutline/>
                                </button>

                                <button onClick={()=>{
                                    setConfirmationModal({
                                        text1:"Delete This Section",
                                        text2:"All the lectures from this section will be deleted",
                                        btn1Text:"Delete",
                                        btn2Text:"Cancel",
                                        btn1Handler:()=>handleDeleteSection(section._id),
                                        btn2Handler:()=>setConfirmationModal(null)


                                    })
                                }}>
                                    <MdDelete/>
                                </button>

                                <span>|</span>
                                
                                <button>
                                    <BiSolidDownArrow/>
                                </button>
                            </div>
                        </summary>

                        <div>
                            {
                                section.subSection.map((data)=>{
                                    <div key={data?._id}
                                        onClick={setViewSubSection(data)}
                                        className='flex items-center justify-between gap-x-3 boder-b-2'
                                        >
                                            <div className='flex items-center gap-x-3'>
                                                <RxDropdownMenu/>
                                                <p>{data.title}</p>
                                            </div>

                                            <div 
                                            onClick={(e)=>e.stopPropagation()}
                                            className='flex items-center gap-x-3'>
                                                <button onClick={()=>setEditSubSection({...data,sectionId:section._id})}>
                                                    <MdModeEditOutline/> 
                                                </button>

                                                <button onClick={()=>{
                                                    setConfirmationModal({
                                                        text1:"Delete This Section",
                                                        text2:"Selected lecture will be deleted",
                                                        btn1Text:"Delete",
                                                        btn2Text:"Cancel",
                                                        btn1Handler:()=>handleDeleteSubSection(data._id,section._id),
                                                        btn2Handler:()=>setConfirmationModal(null)

                                                    })
                                                }}>
                                                    <MdDelete/>

                                                </button>
                                            </div>
                            

                                    </div>
                                })
                            }
                            <button onClick={()=>setAddSubSection(section._id)}>
                                <FaPlusCircle/>
                                <p>Add Lecture</p>
                            </button>
                        </div>
                    </details>
                })
            }
        </div>
        {
            addSubSection?
            (<SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true}/>):
            (viewSubSection?(<SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true}/>):
            (editSubSection?(<SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true}/>):
            (<div></div>)))
        }
        {
            confirmationModal?(<ConfirmationModal modalData={confirmationModal}/>):(<div></div>)
        }
    </div>
  )
}

export default NestedView