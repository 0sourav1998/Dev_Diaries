import React from 'react'
import { Sidebar } from './Sidebar'
import { Outlet } from 'react-router-dom'

export const MyDashboard = () => {
  return (
    <div className='w-full h-full flex flex-row mx-auto gap-24 sm:gap-28 md:gap-28 justify-between'>
        <div>
            <Sidebar/>
        </div>
        <div className='md:w-[75%] sm:w-[70%] w-full mx-auto'>
            <Outlet/>
        </div>
    </div>
  )
}
