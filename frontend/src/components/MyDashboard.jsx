import React from 'react'
import { Sidebar } from './Sidebar'
import { Outlet } from 'react-router-dom'

export const MyDashboard = () => {
  return (
    <div className='w-full h-full flex flex-row md:gap-12 gap-0'>
        <div className='md:w-fit w-[30%]'>
            <Sidebar/>
        </div>
        <div className='md:w-[75%] w-[70%] mx-auto'>
            <Outlet/>
        </div>
    </div>
  )
}
