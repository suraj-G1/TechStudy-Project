import React, { useEffect, useState } from 'react'
import Footer from '../components/common/footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
// import Course_Card from '../components/core/Catalog/Course_Card'
import CourseSlider from '../components/core/Catalog/CourseSlider';
const Catalog = () => {

    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    //Fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            console.log('Getting Categories');
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Getting Categories",res);
            const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                console.log("I am getting category detaios");
                const res = await getCatalogPageData(categoryId);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);

  return (
    <div>
        <div>
            <p>{`Home/Category/`} 
                <span>
                    {catalogPageData?.data?.selectedCategory?.name}
                </span>
            </p>
            <p>{catalogPageData?.data?.selectedCategory?.title}</p>
            <p>{catalogPageData?.data?.selectedCategory?.description}</p>
        </div>

        <div>
            {/* Section 1 */}
            <div>
                <div>Courses to get you started in <span>{setCatalogPageData?.data?.selectedCategory?.name}</span></div>
                <div className='flex gap-x-3'>
                    <p>Most Popular</p>
                    <p>New</p>
                </div>
                
                <div>
                     <CourseSlider Courses={setCatalogPageData?.data?.selectedCategory?.courses}/> 
                </div>
            </div>

            {/* Section 2 */}
            <div>

                <p>Top Course </p>
                <div>
                 <CourseSlider Courses={setCatalogPageData?.data?.differentCategory?.courses} />
                </div>
            </div>

            <div>
                <p>Frequently Bought Courses</p>
                <div className='py-8'>
                    <div className='grid lg:grid-cols-2 grid-col-1'>
                        {
                            catalogPageData?.data?.mostSellingCourses?.slice(0,4).map((course,index)=>{
                                // <Course_Card course={course} key={index} Height='h-[300px]/'/>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default Catalog