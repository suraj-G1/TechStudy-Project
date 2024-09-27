import React, { useEffect, useState } from 'react'
import { get, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross1 } from "react-icons/rx";
import IconBtn from '../../../../common/IconBtn';
import Upload from '../Upload';
const SubSectionModal = ({modalData,setModalData,add=false,edit=false,view=false}) => {
    const{
        handleSubmit,
        register,
        formData:{errors},
        getValues,
        setValue,
    } = useForm();

    const dispatch = useDispatch();
    const[loading,setLoading] = useState(false);
    const{course} = useSelector((state)=>state.course);
    const{token} = useSelector((state)=>state.auth);

    useEffect(()=>{
        if(view || edit){
            setValue("lectureTitle",modalData.title)
            setValue('lectureDesc',modalData.description);
            setValue('lectureVideo',modalData.videoUrl);
        }
    },[])

    const isFormUpdated=()=>{
        const currentValues = getValues();
        if(currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description || 
            currentValues.lectureVideo !== modalData.videoUrl
            )
        {
            return true;
        }else{
            return false;
        }
    }

    const handleEditSubSection = async() =>{
        const currentValues = getValues();
        const formData = new FormData();

        formData.append('sectionId',modalData.sectionId);
        formData.append('subSectionId',modalData._id);
        if(currentValues.lectureTitle !== modalData.title){
            formData.append('title',currentValues.lectureTitle);
        }

        if(currentValues.lectureDesc !== modalData.description){
            formData.append('description',currentValues.lectureDesc);
        }

        if(currentValues.lectureVideo !== modalData.videoUrl){
            formData.append('video',currentValues.lectureVideo);
        }
        setLoading(true);
        const result = await updateSubSection(formData,token);
        if(result){
            const updatedCourseContent = course.courseContent.map((section)=>section._id === modalData.sectionId?result:section);
            const updatedCourse = {...course,courseContent:updatedCourseContent};
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);

    }


    const onSubmit =async (data) =>{
        if(view)return;
        if(edit){
            if(!isFormUpdated()){
                return;
            }else{
                //update the form 
                handleEditSubSection();
                return;
            } 
        }

        const formData = new FormData();
        formData.append('sectionId',modalData);
        formData.append('title',data.lectureTitle);
        formData.append('description',data.lectureDesc);
        formData.append('video',data.lectureVideo);
        setLoading(true);

        const result = await createSubSection(formData,token);
        if(result){
            const updatedCourseContent = course.courseContent.map((section)=>section._id === modalData?result:section);
            const updatedCourse = {...course,courseContent:updatedCourseContent};
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        
    }
  return (
    <div>
        <div>
            <div>
                <p>{view && "Viewing"} {edit && "Editing"} { add &&"Adding"} Section</p>
                
                <button onClick={()=>{!loading ?(setModalData(null)):(<div></div>)}}>
                    <RxCross1/>
                </button>
            </div>

            <form onSubmit={()=>handleSubmit(onSubmit)}>
                <Upload
                    name='lectureVideo'
                    label='Lecture Video'
                    register={register}
                    errors={errors}
                    video={true}
                    viewData={view?(modalData.videoUrl):(null)}
                    editData={edit?modalData.video:null}
                />

                <div>
                    <label htmlFor='lectureTitle'>Lecture Title</label>
                    <input
                        id='lectureTitle'
                        placeholder='Enter Lecture Title'
                        {...register("lectureTitle",{required:true})}
                        className='w-full'
                    />
                    {
                        errors.lectureTitle && (
                            <span>Lecture Title is Required</span>
                        )
                    }
                    
                </div>

                <div>
                    <label>Lecture Description</label>
                    <textarea
                        id='lectureDesc'
                        placeholder='Enter Lecture Description'
                        {...register("lectureDesc",{required:true})}
                        className='w-full min-h-[130px]'
                    >

                    </textarea>
                    {
                        errors.lectureDesc && (
                            <span>Description is needed</span>
                        )
                    }
                    
                </div>
                {
                    !view && (
                        <IconBtn text={loading?"Loading":edit?"Save Canges":"Save"}/>
                    )
                }
            </form>
        </div>

    </div>
  )
}

export default SubSectionModal