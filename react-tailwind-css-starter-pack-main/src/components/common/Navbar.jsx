import React, { useEffect, useState } from 'react'
import { Link,matchPath,useLocation } from 'react-router-dom'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import {NavbarLinks} from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {

    const [subLinks,setSubLinks] = useState([]);
    const fetchSubLinks = async() =>{
            try{
                const result =await apiConnector("GET",categories.CATEGORIES_API);
                console.log("Printing SubLinks",result);
                setSubLinks(result.data.data)
            }catch(error){
                console.log('Could not fetch categories')
            }
        
    }
    useEffect(()=>{
        fetchSubLinks();
    },[])


    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state)=>state.cart);
    const location = useLocation();
    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname);
    }
  return (
    <div className='flex h-14 items-center justify-between border-b-[1px] border-b-richblack-700'>
        <div className='w-9/12 max-w-maxContent flex items-center justify-between mx-auto'>
            <Link to='/'> 
                 <img src={Logo}  width={160} height={42}></img>
            </Link>


            <nav>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((link,index)=>{
                            return (
                                link.title === "Catalog" ? (
                                    <div className='relative flex items-center gap-2 group'>
                                        <p>{link.title}</p>
                                        <FaChevronDown />

                                        <div className='invisible absolute left-[50%] right-[50%] flex flex-col rounded-md
                                        translate-x-[-50%] translate-y-[80%]
                                        bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible
                                        group-hover:opacity-100 w-[300px]
                                        '>

                                            <div className='absolute left-[50%]  top-0 h-6 w-6
                                            translate-x-[80%] translate-y-[-45%]
                                             rotate-45 rounded bg-richblack-5'>

                                            </div>

                                            {
                                                subLinks.length ?
                                                (
                                                    subLinks.map((sublink,index)=>(
                                                        <Link to={`${sublink.link}`}>
                                                            <p>
                                                                {
                                                                    sublink.title
                                                                }
                                                            </p>
                                                        </Link>
                                                    ))
                                                ):
                                                (
                                                    <div></div>
                                                )
                                            }

                                        </div>
                                    </div>
                                ):
                                (
                                    <div>
                                        <li key={index} >
                                            <Link to={link.path}>
                                                <p className={`${matchRoute(link?.path)? "text-yellow-25":"text-richblack-25"}`}>
                                                    {link.title}
                                                </p>
                                            </Link>
                                        </li>
                                    </div>
                                )
                            )
                        })
                    }
                </ul>
            </nav>

            {/* Login/signup dashborad */}

            <div className='flex gap-x-4 items-center'>
                {
                    user && user?.accountType === 'Instructor' && (
                        <Link to='/dashboard/cart' className='relative'>
                             <AiOutlineShoppingCart/>

                             {
                                totalItems>0 && (
                                    <span>{totalItems}</span>
                                )
                             }
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to='/login'>
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                Login
                            </button>
                        </Link>

                    )
                }

                {
                    token === null && (
                        <Link to='/signup'>
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                Sign Up
                            </button>
                        </Link>
                    )
                }
                {
                    token !== null && <ProfileDropDown/>
                }
            </div>



            <div className='flex gap-x-4 items-center'></div>
        </div>
    </div>
  )
}

export default Navbar