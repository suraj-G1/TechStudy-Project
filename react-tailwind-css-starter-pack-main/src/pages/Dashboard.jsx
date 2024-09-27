import React from 'react'
import { useSelector } from 'react-redux'
import {Outlet} from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar'
const Dashboard = () => {

    const {loading:authLoading} = useSelector((state) => state.auth);
    const {loading:profileLoading} = useSelector((state) => state.profile);
    if(authLoading || profileLoading){
        return(
            <div>
                Loading
            </div>
        )
    }

  return (
    <div className='relative flex min-h-[calc(100vh- 3.5rem)]'>
        <h1 className='text-richblack-50'>I am on Dashboard</h1>
        <Sidebar/>
        <div className='h-[calc(100vh - 3.5rem)] overflow-auto'>
            <div className='mx-auto'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard