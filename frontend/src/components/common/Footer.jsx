import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className='flex flex-col md:flex-row gap-8 border-t p-6  text-gray-200'>
      <div className='flex flex-col gap-4 w-full md:w-1/3'>
        <h1 className='font-bold text-2xl'>About</h1>
        <p className='text-xs text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati saepe, officiis magnam accusantium maiores libero, voluptatum labore nostrum impedit corrupti, ipsam adipisci magni exercitationem...</p>
      </div>
      <div className='flex flex-col gap-4 w-full md:w-1/4'>
        <h1 className='font-bold text-2xl'>Quick Links</h1>
        <div className='flex flex-col gap-2 text-lg'>
          <Link to="/" className='text-gray-400 hover:text-yellow-500 transition-all duration-300'>Home</Link>
          <Link to="blogs" className='text-gray-400 hover:text-yellow-500 transition-all duration-300'>Blogs</Link>
          <Link to="/about" className='text-gray-400 hover:text-yellow-500 transition-all duration-300'>Authors</Link>
        </div>
      </div>
      <div className='flex flex-col gap-4 w-full md:w-1/4'>
        <h1 className='font-bold text-2xl'>Categories</h1>
        <div className='flex flex-col gap-1'>
          <p className='text-gray-400'>Travel</p>
          <p className='text-gray-400'>Business</p>
          <p className='text-gray-400'>Economics</p>
          <p className='text-gray-400'>Technology</p>
          <p className='text-gray-400'>Health & Food</p>
          <p className='text-gray-400'>Sports</p>
          <p className='text-gray-400'>Others</p>
        </div>
      </div>
      <div className='flex flex-col gap-4 w-full md:w-1/4'>
        <h1 className='font-bold text-2xl'>Social Links</h1>
        <div className='flex gap-4 text-gray-300'>
          <FaYoutube className='hover:text-yellow-400 transition-all duration-300 hover:scale-110 cursor-pointer' />
          <FaInstagram className='hover:text-yellow-400 transition-all duration-300 hover:scale-110 cursor-pointer' />
          <FaLinkedinIn className='hover:text-yellow-400 transition-all duration-300 hover:scale-110 cursor-pointer' />
          <FaFacebook className='hover:text-yellow-400 transition-all duration-300 hover:scale-110 cursor-pointer' />
        </div>
      </div>
    </div>
  )
}
