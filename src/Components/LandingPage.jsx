import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { addUser } from '../features/UserSlice'
import { Link } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase.config'

const LandingPage = () => {
  const [MenuOpen, setMenuOpen] = useState(false)
  const [IsLoggedIn, setIsLoggedIn] = useState(false)


  useEffect(() => {
    onAuthStateChanged(auth,(user)=>{
       if (user) {
        console.log("Login is true")
         setIsLoggedIn(true)
       } else{
        setIsLoggedIn(false)
       }
    })
  
  })
  




  return (
    <div
    id='LandingPage'
    className='h-screen w-[100vw] bg-[#043873]'>
         <nav className='h-[60px] w-full flex justify-between px-5 items-center text-white '>
              <div>
            <h1 className='text-2xl'>Open-LMS</h1>
              </div>

              <div className=' flex gap-6 relative'>
              {MenuOpen?<i onClick={()=>{setMenuOpen(!MenuOpen) 
                dispatch(addUser(UserData))
              }} class="ri-close-large-line text-2xl md:hidden"></i>:<i onClick={()=>setMenuOpen(!MenuOpen)} class="ri-menu-line text-2xl md:hidden"></i>}
              <Link to={'/auth'} className='hidden md:flex p-2 bg-[#4F9CF9] text-white rounded-md font-semibold'>{IsLoggedIn?"Go to Dashboard/Home":"Login to Your Account"}</Link>
              {MenuOpen&&<div className='h-[150px] w-[150px] absolute right-0 top-8 md:hidden rounded-md bg-white flex flex-col justify-center items-center gap-7'>
              <Link to={'/auth'} className='p-1 bg-[#4F9CF9] text-white rounded-md font-semibold'>{IsLoggedIn?"Go to Dashboard/Home":"Login to access"}</Link>
              </div>}
              </div>
         </nav>
        <div className='h-[90%] w-full flex-col md:flex-row flex p-5'>
          <div className='w-[100%] md:w-[50%]  h-[60%] md:h-full flex justify-center items-center md:items-start gap-5 md:gap-8 flex-col'>
         <h1 className='text-3xl md:text-5xl md:text-left text-center text-white px-3 font-bold'>Empower Your Learning Journey & </h1>
         <p className='text-center px-3 font-[500] text-[#FFFFFF] md:text-left md:text-2xl'>Project management software designed to help your teams collaborate, organize, and track tasks effortlessly. Simplify workflows, boost productivity.</p>
              <Link to={'/auth'} className='bg-[#4F9CF9] w-[90px] p-[5px] rounded-md text-white md:ml-3 '>Get started</Link>
          </div>
          <div className='w-[100%] md:w-[50%] h-[40%] md:h-full  flex justify-center items-center'>
          <img src="../public/Images/Landing.png" alt="" className='min-h-[200px] max-h-[350px] md:max-h-[500px] animate-float ' />
          </div>
        </div>
    </div>
  )
}

// Just checked

export default LandingPage