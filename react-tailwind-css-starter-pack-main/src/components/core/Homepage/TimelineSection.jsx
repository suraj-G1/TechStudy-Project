import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'

import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'

import timelineImage from '../../../assets/Images/TimelineImage.png'

const timeline =[
    {
        Logo:Logo1,
        heading:"Leadership",
        Description:"Fully commited to success company"
    },
    {
        Logo:Logo2,
        heading:"Responsibility",
        Description:"Students will always be our priority"
    },
    {
        Logo:Logo3,
        heading:"Flexibility",
        Description:"The ability to switch is important skill"
    },
    {
        Logo:Logo4,
        heading:"Solve the problem",
        Description:"Fully commited to success company"
    },
]
const TimelineSection = () => {
  return (
    <div>
        <div className='flex flex-row items-center gap-10'>
            <div className=' w-[45%] flex flex-col gap-5'>
                {
                    timeline.map((element,index)=>{
                        return (
                            <div className='flex flex-row gap-7' key={index}>
                                <div className='w-[50px] h-[50px] bg-white flex items-center justify-center rounded-sm'>
                                    <img src={element.Logo}></img>
                                </div>

                                <div>
                                    <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                    <p className='text-base'>{element.Description}</p>
                                </div>

                            </div>
                        )

                    })

                }
                
            </div>

            <div className='relative shadow-blue-200'>
                <img src={timelineImage} alt='Aleternate Image' className='object-cover rounded-sm h-fit'></img>

                <div className='absolute bg-caribbeangreen-700 flex text-white uppercase py-7
                               left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <div className='flex items-center gap-5 border-r border-caribbeangreen-300 px-7'>
                        <p className='text-2xl font-bold'>
                            10
                        </p>
                        <p className='text-caribbeangreen-300 text-sm'>
                            Years of Experience
                        </p>
                    </div>

                    <div className='flex gap-5 items-center px-7'>
                        <p className='text-2xl font-bold'>
                            250
                        </p>
                        <p className='text-caribbeangreen-300 text-sm'>
                           Type of Courses
                        </p>
                        
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default TimelineSection