import React from 'react'
import { Link } from 'react-router-dom'
const Button = ({children,active,linkto}) => {
  return (
    <Link to = {linkto}>
      <div className={`text-center text-[13px] px-5 py-3 rounded-md font-bold
                    ${active?"bg-yellow-50 text-black":"bg-richblack-800 text-white"} hover:scale-95`
                    }>
        {children}
      </div>
        
    </Link>
  )
}

export default Button