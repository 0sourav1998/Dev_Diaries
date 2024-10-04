import React from 'react'
import { Sidebar } from './Sidebar'
import { Outlet } from 'react-router-dom'

export const MyDashboard = () => {
  return (
    <div className='w-full h-full flex flex-row gap-6'>
        <div className='w-[15%]'>
            <Sidebar/>
        </div>
        <div className='w-[80%]'>
            <Outlet/>
        </div>
    </div>
  )
}
