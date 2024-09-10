import React, { useState, useEffect } from "react";
import {useForm} from 'react-hook-form'
import CountryCode from "../../data/countrycode.json";
const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("Logging Data", data);
    try {
    } catch (error) {}
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);
  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div>
        {/* firstName */}
        <div className="flex flex-col">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            id="firstname"
            {...register("firstname", { required: true })}
          />
          {errors.message && <span>Please Enter First Name</span>}
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            placeholder="Lastt Name"
            id="lastname"
            {...register("lastname")}
          />
          {errors.message && <span>Please Enter Last Name</span>}
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Email Address"
          id="email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>Please Enter Email Address</span>}
      </div>

      <div>
        <label htmlFor="phonenumber">Phone Number</label>
        <div>
          <div>
            <select
              name="dropdown"
              id="dropdown"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((element, index) => {
                return (
                  <option key={index} value={element.code}>
                    {element.code} - {element.country}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <input
               name="phonenumber"
               id="phonenumber"
               type="number"
               placeholder="Enter Mobile Number"
               className="text-richblack-5"
               {...register("phoneNo",
               {required:{value:true,message:"Please enter phone number"},
                maxLength:{value:10 , message:"Invalid Input"},
                minLength:{value:8 , message:"Invalid Input"}
               })}
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="7"
          {...register("message", { required: true })}
        />
        errros.message && (<span>Enter The message</span>)
      </div>

      <button type="submit">Send Message</button>
    </form>
  );
};

export default ContactUsForm;
