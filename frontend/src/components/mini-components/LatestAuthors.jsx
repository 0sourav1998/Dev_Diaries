import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAuthors } from '../../services/operations/user';
import { setAllAuthors } from '../../redux/slice/user';

export const LatestAuthors = () => {
  const {allAuthors} = useSelector((state)=>state?.user);
  const dispatch = useDispatch();
  const fetchAuthors = async()=>{
    const result = await getAllAuthors();
    dispatch(setAllAuthors(result))
  };
  useEffect(()=>{
    fetchAuthors();
  },[])
  return (
    <div className='w-full'>
      <h1 className="text-2xl font-bold text-gray-100 mb-6 w-full flex justify-start">Authors</h1>
      <div className='flex md:flex-row flex-col'>
      {
        allAuthors && allAuthors.length > 0 && allAuthors?.map((author)=>(
          <div key={author._id} className='w-full flex flex-col sm:gap-4 gap-1 mb-4 items-center'>
            <img src={author?.profilePicture} alt={author.name} className='sm:h-52 sm:w-52 h-36 w-36 rounded-full'/>
            <h4 className='text-gray-100 text-semibold text-xl'>{author?.name}</h4>
          </div>
        ))
      }
      </div>
    </div>
  )
}
