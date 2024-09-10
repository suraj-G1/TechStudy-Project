import React from 'react'
import HighlightText from '../components/core/Homepage/HighlightText'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from '../assets/Images/FoundingStory.png'
import Stats from '../components/core/AboutPage/Stats'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import footer from '../components/common/footer'
const About = () => {
  return (
    <div>
        {/* section 1  */}

        <div>
            <header>
                Driving an Innovation in online education for a 
                <HighlightText text={'Brighter Future'}/>
                <p>Studynotion is at the forefront of driving innovation in online education.We're passionate
                     about creating  a brighter future by offering cutting-edge
                     courses,leveraging emerging technologies and nurturing a vibrant learing community
                </p>
            </header>

            <div className='flex gap-x-3  mx-auto'>
                <img src={BannerImage1}/>
                <img src={BannerImage2}/>
                <img src={BannerImage3}/>
                
            </div>
        </div>

        {/* Section 2 */}
        <section>
            <div>
                <Quote/>
            </div>
        </section>

        {/* section 3 */}
        <section>
            <div>
                <div>
                    <div>
                        <h1>Our Founding Story</h1>
                        <p>
                            Our e-learning platform born out of shared vision and passion for transforming education
                            It all began with a group of education, technologists and lifelong learner who recognized the need for 
                            accessible, high quality learning opportunity
                        </p>
                        <p>
                            As experienced educator ourself,we witnessed the firsthand the limitation and challenge of traditional education system
                        </p>
                    </div>

                    <div>
                        <img src={FoundingStory}/>
                    </div>
                </div>

                <div>
                    <div>
                        <h1>Our Vision</h1>
                        <p>With this vision in our mind , we set out on a journey
                            to create an e-learning platform that will revolutionize many people
                            the way they learn
                        </p>
                    </div>


                    <div>
                        <h1>Our Mission</h1>
                        <p>With this mission in our mind , we set out on a journey
                            to create an e-learning platform that will revolutionize many people
                            the way they learn
                        </p>
                    </div>

                </div>
            </div>
        </section>

        {/* Section 4 */}

        <Stats/>


        {/* section 5 */}

        <section>
            <LearningGrid/>
            <ContactFormSection/>
        </section>

        <section>
            <p>Reviews form Learner</p>
        </section>

        <footer/>


    </div>
  )
}

export default About