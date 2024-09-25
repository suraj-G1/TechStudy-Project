import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { IoIosAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { TiArrowRight } from "react-icons/ti";
import { setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';
const CourseBuilderForm = () => {
    const{register,handleSubmit,setValue,formState:{errors}} = useForm();
    const[editSectionName,setEditSectionName] = useState(null);
    const{course,setCourse}  = useSelector((state)=>state.course);
    const [loading,setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth);

    const dispatch = useDispatch();;

    const cancelEdit=()=>{
        setEditSectionName(null);
        setValue("");

    }


    const goBack=()=>{
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    const goToNext=()=>{
        if(course.courseContent.length === 0){
            toast.error("Please add atleast on section");
            return;
        }

        if(course.courseContent.some((section)=>section.subSection.length === 0)){
            toast.error("Please add atleast one lecture in each subsection");
            return;
        }
        dispatch(setStep(3));
    }
    const onSubmit= async(data)=>{
        setLoading(true);
        let result;
        if(editSectionName){
            
            result = await updateSection({
                sectionName:data.sectionName,
                sectionId:editSectionName,
                courseId:course._id
            },token)
        }else{
            result = await createSection({
                sectionName:data.sectionName,
                courseId:course._id
            },token)
        }

        if(result){
            dispatch(setCourse(result));
            setEditSectionName(false);
            setValue("sectionName","");
        }
        setLoading(false);
    }


    const handleChangeEditSectionName=(sectionId,sectionName)=>{
        if(editSectionName === sectionId){
            cancelEdit();
            return;
        }
        setEditSectionName(sectionId);
        setValue("sectionName",sectionName);
    }
  return (
    <div className='text-white'>
        <p>Course Builder</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='sectionName'>Section Name <sup>*</sup></label>
                <input
                    id='sectionName'
                    placeholder='Add Section name'
                    {...register('sectionName',{required:true})}
                    className='w-full'
                />
                {
                    errors.sectionName && (
                        <span>Section name is required</span>
                    )
                }
            </div>

            
            <div>
                <IconBtn type="submit" text={!setEditSectionName?"Create Section":"Edit Section Name"}  outline={true} 
                    customClasses={"text-white"}
                >
                    <IoIosAddCircle />


                </IconBtn>
                {
                    editSectionName && (
                        <button 
                            type='button'
                            onClick={cancelEdit}
                            className='text-sm text-richblack-300'
                        >
                            Cancel Edit
                        </button>
                    )
                }
            </div>
        </form>

        {
            course.courseContent.length>0 && (
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
            )
        }

        <div className='flex justify-end'>
            <button onClick={goBack} className='rounded-md cursor-pointer flex items-center'>
                Back
            </button>
            <IconBtn text="next" onclick={goToNext}>
                <TiArrowRight/>
            </IconBtn>
        </div>
    </div>
  )
}

export default CourseBuilderForm