import React, { useEffect, useState } from 'react'
import { auth } from '../firebase.config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/UserSlice';
import Courses from './Courses';
import Resources from './Resources';
import Schedule from './Schedule';

    const Dashboard = () => {
      const [IsCreating, setIsCreating] = useState(false);

      const [CurrentFeature, setCurrentFeature] = useState('Resources')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [Name, setName] = useState(null)
    useEffect(()=>{
        onAuthStateChanged(auth,  (user)=>{
            try {
                if (user) {
                    setName(user.displayName)
                    const userCredentials = {
                      name:user.displayName,
                      email:user.email,
                      PhotoUrl:user.photoURL
                    }
                    dispatch(addUser(userCredentials))
              } else{
                  navigate('/auth')
              }
            } catch (error) {
                console.error(error.message) 
            }
           
        })
    },[])

    const HandleLogOut = async()=>{
        await signOut(auth)

        onAuthStateChanged(auth,(user)=>{
            if (!user) {
                alert("User logged out successfully")
                navigate('/')
            }
        })
    }
 
  return (
    <div className='flex h-[100vh] w-[100vw] '>
        <div className='bg-[#0F172A] w-[20%] hidden  md:flex flex-col justify-between p-7 items-center gap-11'>
            <div className='flex flex-col text-white h-[60%] w-[100%] justify-center items-center gap-12'>
               <span onClick={()=> setCurrentFeature('')}  className='text-xl font-semibold p-4 hover:transition hover:bg-white hover:bg-opacity-10 cursor-pointer rounded-lg hover:border border-gray-700'>Dashboard</span>
               <span onClick={()=> setCurrentFeature('Resources')} className='text-xl font-semibold p-4 hover:transition hover:bg-white hover:bg-opacity-10 cursor-pointer rounded-lg hover:border border-gray-700'>Resources</span>
               <span onClick={()=> setCurrentFeature('Courses')} className='text-xl font-semibold p-4 hover:transition hover:bg-white hover:bg-opacity-10 cursor-pointer rounded-lg hover:border border-gray-700'>Courses</span>
               <span onClick={()=> setCurrentFeature('Schedule')} className='text-xl font-semibold p-4 hover:transition hover:bg-white hover:bg-opacity-10 cursor-pointer rounded-lg hover:border border-gray-700'>Schedule</span>
            </div>
                 <div id='Profile' className='h-[50px] flex p-[10px] items-center justify-between rounded-md w-[100%] border '>
                   <div id='Image' className='h-[35px] rounded-full w-[35px] '>
                   <h1 className='text-sm text-white'>{Name}</h1> 
                   </div>
                   <span onClick={HandleLogOut} className='text-white bg-blue-400 p-1 rounded-md hover:bg-blue-300 cursor-pointer'>Logout </span>
                 </div>
        </div>
            <div className='bg-white w-[100%] md:w-[80%] overflow-scroll scroll'>
              <nav className='h-[60px] w-full bg-red-200 flex justify-between items-center px-5 x'>
                  <h1 className='font-semibold'>{CurrentFeature=='Courses'?'Courses':CurrentFeature=='Resources'?'Resources' :CurrentFeature=='Schedule'? 'Schedule':"Dashboard"}</h1>
                  {CurrentFeature=='Resources'&&<button onClick={()=>setIsCreating(!IsCreating)} className='bg-blue-500 text-white h-[40px] p-2 px-6 rounded-md hover:bg-opacity-50'>Add</button>}
              </nav>
              {CurrentFeature=='Courses'?<Courses/>:CurrentFeature=='Resources'?<Resources IsCreating={IsCreating}/> :CurrentFeature=='Schedule'? <Schedule/>:<div>


<h1>Dashboard

</h1>


              </div> }
            </div>
    <ToastContainer/>
    </div>
  )
}

export default Dashboard

