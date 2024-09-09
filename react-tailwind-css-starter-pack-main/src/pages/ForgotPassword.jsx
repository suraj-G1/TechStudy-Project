import React, {  useState } from 'react'
import { useSelector } from 'react-redux'
import { getPasswordResetToken } from '../services/operations/authAPI';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
const ForgotPassword = () => {
  const {loading} = useSelector((state)=>state.auth);
  const[email,setEmail] = useState("");
  const[emailSent,setEmailSent] = useState(false);

  const dispatch = useDispatch();
  const handleOnSubmit = (e) =>{
    e.preventDefault();
    dispatch(getPasswordResetToken(email,setEmailSent));
  }
  return (
    <div className='flex items-center justify-center text-white'>
      {
        loading?
        (
          <div> Loading </div>
        )
        :
        (
          <div>
            <h1>
              {
                !emailSent?"Reset Your Password":"Check Your Email"
              }
            </h1>
            <p>
              {
                !emailSent?"Have No fear , we'll sent you the instructions to reset your password.If you don't have access to your email we can try account recovery"
                :
                `We have sent reset email link to ${email}`
              }
            </p>

            <form onSubmit={handleOnSubmit}>
              {
                !emailSent && (
                  <label>
                    <p>Email Address</p>
                    <input
                    required
                    placeholder='Enter your Email Address'
                    type='email'
                    name={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    ></input>
                  </label>
                )
              }

              <button type='submit'>
                {
                  !emailSent?"Reset Password":"Resent Email"
                }
              </button>
            </form>

            <div>
              <Link to='/login'>
                <p>Back to Login</p>
              </Link>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ForgotPassword