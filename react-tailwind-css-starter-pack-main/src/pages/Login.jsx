import React from 'react'
import loginImage from '../assets/Images//login.webp'
import Template from '../components/core/Auth/Template'
const Login = () => {
  return (
     <Template 
           title="Welcome Back"
           description1 = "Build skills for today, tomorrow, and beyond."
           desscription2 = "Education to future-proof your career."
           image = {loginImage}
           formType = "login"
     />
  )
}

export default Login