import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
    addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from "./RequirementField";
import IconBtn from "../../../../common/IconBtn";
import toast from "react-hot-toast";
import {setStep,setCourse} from '../../../../../slices/courseSlice'
const CourseInformationForm = () => {
  const { token } = useSelector((state) => state.auth);

  const {
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  //const {categories} = useSelector((state)=>state.course);
//   const { step, setStep } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      console.log("Printing Categories",categories);
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();
  }, []);

  const onSubmit = async (data) => {
    if (!editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);

        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }

        if (currentValues.courseShortDesc !== course.description) {
          formData.append("courseDescription", data.courseShortDesc);
        }

        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }

        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }

        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }

        if (
          currentValues.courseRequirments.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirments)
          );
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          setStep(2);
          // dispatch(setCourse(result));
        }
      } else {
        toast.error("No Changes made to Form");
      }
      return;
    }
    const formData = new FormData();
    formData.append('courseName',data.courseTitle);
    formData.append('courseDescription',data.courseShortDesc);
    formData.append('price',data.coursePrice);
    formData.append('whatYouWillLearn',data.courseBenefits);
    formData.append('category',data.courseCategory);
    formData.append('instructions',JSON.stringify(data.courseRequirments));
    // formData.append('status',COURSE_STATUS.DRAFT);
    setLoading(true);
    const result = await addCourseDetails(formData,token);
    if(result){
        setStep(2);
        dispatch(setCourse(result));
    }
    setLoading(false);

  };

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.description ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.coursePricerice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseImage !== course.thumbnail ||
      currentValues.courseRequirments.toString() !==
        course.instructions.toString()
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md bg-richblack-800 border-richblack-700 p-6 space-y-8"
    >
      <div>
        <label htmlFor="courseTitle">
          Course Title <sup>*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="w-full"
        />
        {errors.courseTitle && <span>Course Title is Required</span>}
      </div>

      <div>
        <label htmlFor="courseShortDesc">Add Short Description</label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Short Description"
          {...register("courseShortDesc", { required: true })}
          className="w-full min-h-[130px]"
        />
        {errors.courseShortDesc && <span>Course Description is Important</span>}
      </div>

      <div>
        <label htmlFor="coursePrice">Enter Course Price</label>
        <textarea
          id="coursePrice"
          placeholder="Enter Course Price"
          {...register("coursePrice", { required: true, valueAsNumber: true })}
          className="w-full min-h-[130px]"
        />
        <HiOutlineCurrencyRupee />
        {errors.coursePrice && <span>Course Price is required</span>}
      </div>

      <div>
        <label htmlFor="courseCategory">
          Course Category <sup>*</sup>
        </label>

        <select
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
        >
          <option value="" disabled>
            {" "}
            Choose a Category
          </option>
          {!loading &&
            courseCategories.map((category, index) => {
              <option key={index} value={category}>
                {category.name}
              </option>;
            })}
        </select>
        {errors.courseCategory && <span>Category is Must</span>}
      </div>

      {/* Chip Input */}
      {/* Upload */}

      {/* Benefits of this course */}
      <div>
        <lable htmlFor="courseBenefits">Benefits of the Course</lable>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the Course"
          {...register("courseBenefits", { required: true })}
          className="min-h-[130px] w-full"
        ></textarea>
        {errors.courseBenefits && <span>Course Benefits are required</span>}
      </div>

      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <div>
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            className="flex items-center bg-richblack-200 gap-x-2"
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn text={!editCourse ? "Next" : "Save Changes"} />
      </div>
    </form>
  );
};

export default CourseInformationForm;
