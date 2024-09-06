import React from 'react'
import SignupForm from './SignupForm'
import LoginFrom from './LoginFrom'
const Template = ({title,description1,description2,image,formType}) => {
  return (
    <div>
        <div>
            <h2>{title}</h2>
            <p>
                <span>{description1}</span>
                <span>{description2}</span>
            </p>
            
            {
                formType == "login" ? <LoginForm/>:<SignupForm/>
            }
                
        </div>
        

        {/* Image */}
        <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
            />
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-4 right-4 z-10"
            />
          </div>

    </div>
  )
}

export default Template