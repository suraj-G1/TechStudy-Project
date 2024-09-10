import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import {Link} from 'react-router-dom';
import HighlightText from '../components/core/Homepage/HighlightText';
import CTAButton from '../components/core/Homepage/CTAButton';
import Banner from '../assets/Images/banner.mp4'
import CodeBlock from '../components/core/Homepage/CodeBlock'
import TimelineSection from '../components/core/Homepage/TimelineSection';
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection';
import InstructorSection from '../components/core/Homepage/InstructorSection';
import ExploreMore from '../components/core/Homepage/ExploreMore';
import Footer from '../components/common/footer';
import Navbar from '../components/common/Navbar';

const Home = () => {
  return (
    <div>
        {/* Navbar */}
        {/* <Navbar/> */}
        {/*Section 1 */}
        <div className='relative mx-auto max-w-maxContent  flex flex-col w-8/12 items-center text-white justify-between'>
            <Link to={'/signup'}>
                <div className='mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                               transition-all duration-200 hover:scale-95 w-fit group'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight />

                    </div>
                </div>

            </Link>

            <div className='font-semibold mt-4 text-center text-3xl'>
                Empower your future growth 
                <HighlightText text={' Coding Skills'}/>
                
            </div>

            <div className='w-[90%] mt-4 text-center text-lg font-semibold text-richblack-300'>
                With our online courses you can at your own place,from anywhere
                 in the world and get access to wealth of resources,
                 including hands-on projects, quizzes and personalized feedback from instructor
        
            </div>

            <div className='flex gap-7 mt-8'>
                <CTAButton active={true} linkto={'/signup'}>Learn More</CTAButton>
                <CTAButton active={false} linkto={'/login'}>Book a Demo</CTAButton>
            </div>

            <div className='shadow-blue-200 mx-3 my-8'>
                <video
                muted
                autoPlay
                loop
                >
                    <source src={Banner}/>
                </video>
            </div>

            {/*Code Section 1*/}
            <div >
                <CodeBlock
                    position={'flex flex-row'} 
                    heading={
                        <div className='text-3xl font-semibold'>
                            Unlock Your
                            <HighlightText text={'Coding Potential'}/>
                            with our online courses
                        </div>
                    }
                    subHeading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding ans passionate about sharing their knowledge with you"
                    }
                    ctabtn1={
                        {
                            btnText: "Try it Yourself",
                            linkto : '/signup',
                            active:true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            linkto:'/login',
                            active: false,

                        }
                        
                    }
                    codeblock={
                        "<!DOCTYPE html> \n<html> \n <head> \n<title>HTML Tutorial</title> \n </head> \n<body> \n<h1>This is a heading</h1> \n<p>This is a paragraph.</p> \n</body> \n</html>"
                    }
                    codeColor={'text-yellow-25'}
                    backgroundGradient={
                        {
                            background: "radial-gradient(circle, #ff7e5f, #feb47b)"
                        }
                    }


                ></CodeBlock>
            </div>
             {/*Code Section 2*/}
             <div >
                <CodeBlock
                    position={'flex flex-row-reverse'} 
                    heading={
                        <div className='text-3xl font-semibold'>
                            Start
                            <HighlightText text={'Coding in Seconds'}/>
                            
                        </div>
                    }
                    subHeading={
                        "Go ahead give it a try.Our hands-on learining environment you'll be writing real code from your first lesson"
                    }
                    ctabtn1={
                        {
                            btnText: "Continue Lesson",
                            linkto : '/signup',
                            active:true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn more",
                            linkto:'/login',
                            active: false,

                        }
                        
                    }
                    codeblock={
                        "<!DOCTYPE html> \n<html> \n <head> \n<title>HTML Tutorial</title> \n </head> \n<body> \n<h1>This is a heading</h1> \n<p>This is a paragraph.</p> \n</body> \n</html>"
                    }
                    codeColor={'text-yellow-25'}


                ></CodeBlock>
            </div>
            <ExploreMore/>
        </div>

        {/*Section 2*/}
        <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[310px]'>
                <div className='w-9/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                    <div className='h-[150px]'></div>
                    <div className='flex gap-7 items-center text-white'>
                        <CTAButton active={true} linkto={'/signup'} >
                            <div className='flex items-center gap-3'>
                                Explore Full Catalog
                                <FaArrowRight/>
                            </div>
                        </CTAButton>

                        <CTAButton active={false} linkto={'/signup'}>
                            Learn More
                        </CTAButton>
                        
                        
                    </div>
                </div>

            </div>

            <div className='w-8/12 mx-auto flex flex-col items-center justify-between gap-7'>

                <div className='flex gap-7 mb-10 mt-[95px]'>
                    <div className='text-3xl font-semibold w-[45%]'>
                        Get the skills you need for a 
                        <HighlightText text={'Job that is in demand'}/>
                    </div>
                    <div className='flex flex-col gap-5 w-[40%] items-start'>
                        <div className='text-[16px]'>
                            The modern studynotion is the dictates its own term. Today to be a , competetive specialist requires more than professional skills
                        </div>
                        <div>
                            <CTAButton active={true} linkto={'/signup'}> 
                                 <div>Learn More</div>
                            </CTAButton>
                        </div>
                    </div>
                </div>
                <TimelineSection/>
                <LearningLanguageSection/>

            </div>

            {/* <TimelineSection/>
            <LearningLanguageSection/> */}

        </div>


        {/*Section 3 */}

        <div className='w-8/12 mx-auto max-w-maxContent  flex flex-col justify-between gap-8 bg-richblack-900 items-center'>
            <InstructorSection/>
            <h2>Reviews form other learner</h2>
        </div>


        {/*Footer*/}
        <Footer/>

    </div>
  )
}

export default Home