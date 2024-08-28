import React from 'react'
import HighlightText from './HighlightText'
import knowYourProgress from '../../../assets/Images/Know_your_progress.png'
import compareWithOthers from '../../../assets/Images/Compare_with_others.png'
import planYourLesson from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from './CTAButton'
const LearningLanguageSection = () => {
  return (
    <div className='mt-[120px] mb-16'>
        <div className='flex flex-col gap-4'>
            <div className='text-3xl font-bold text-center'>
                Your Swiss Knife for 
                <HighlightText text={'learnign any language'}/>
            </div>

            <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
                Using spin making learning multiple languages easy.With 20+ language realistic voice-over,progress tracking, custom schedule and more...
            </div>

            <div className='flex  items-center justify-center  w-[50%] mx-auto'>
                <img 
                    src={knowYourProgress}
                    alt='Know Your Progree'
                    className='object-contain -mr-32'
                    ></img>
                <img 
                src={compareWithOthers}
                alt='Compare with Others'
                className='object-contain'
                />
                <img 
                src={planYourLesson}
                alt='Plan your lesson'
                className='object-contain -ml-36'
                />
            </div>

            <div className='w-fit flex mx-auto items-center'>
                <CTAButton active={true} linkto={'/signup'}>
                    <div >
                        Learn More
                    </div>
                </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default LearningLanguageSection