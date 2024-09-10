import React from 'react'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/footer'

const contactUs = () => {
  return (
    <div>
        <div className='flex '>
            <div className='flex flex-col'>
                <div className='flex flex-col'>
                    <div className='flex'>
                        {/* img */}
                        <h2>Char with Us</h2>
                    </div>
                    <p>Can friendly learn and helping each other is the new way to learn</p>
                </div>


                <div className='flex flex-col'>
                    <div className='flex'>
                        {/* img */}
                        <h2>Call Us</h2>
                    </div>
                    <p>Can friendly learn and helping each other is the new way to learn</p>
                </div>


                <div className='flex flex-col'>
                    <div className='flex'>
                        {/* img */}
                        <h2>Visit Us</h2>
                    </div>
                    <p>Can friendly learn and helping each other is the new way to learn</p>
                </div>

                
            </div>

            <div className='flex flex-col'>
                <div className='flex flex-col'>
                    <h2>Got an idea? We got the skills.Let's team Up</h2>
                    <p>Tell us about yourself and what you got in your mind</p>

                </div>
                <ContactFormSection/>
            </div>
        </div>

        <div>
            Review by Learner
        </div>

        <Footer/>
    </div>
  )
}

export default contactUs