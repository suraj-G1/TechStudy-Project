import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  OTPInput  from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";
const VerifyEmail = () => {
  const {signupData, loading } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!signupData){
        navigate('/signup');
    }
  },[])
  const onSubmitHandler = (e) =>{
    e.preventDefault();
    const{
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
    } = signupData;
    dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate))
  }
  return (
    <div>
      {loading ? (
        <div>Loading ....</div>
      ) : (
        <div>
          <h1>Verify Email</h1>
          <p>A verification code sent to your email.Enter the code below</p>

          <form onSubmit={onSubmitHandler}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}

              renderInput={(props) => <input {...props} />}
            ></OTPInput>

            <button type="submit">Verify OTP</button>
          </form>

          <div>
            <div>
              <Link to="/login">
                <p>Back to Login</p>
              </Link>
            </div>

            <button onSubmit={()=>dispatch(sendOtp(signupData.email,navigate))}>
                Resend OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
