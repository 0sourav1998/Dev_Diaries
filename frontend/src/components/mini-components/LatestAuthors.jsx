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
      <div className='flex flex-row'>
      {
        allAuthors && allAuthors.length > 0 && allAuthors?.map((author)=>(
          <div key={author._id} className='w-full flex flex-col gap-4 items-center'>
            <img src={author?.profilePicture} alt={author.name} className='h-52 w-52 rounded-full'/>
            <h4 className='text-gray-100 text-semibold text-xl'>{author?.name}</h4>
          </div>
        ))
      }
      </div>
    </div>
  )
}
