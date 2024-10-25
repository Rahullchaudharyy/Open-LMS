import React, { useEffect, useState } from 'react'
import { auth } from '../firebase.config'
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [IsSignUp, setIsSignUp] = useState(true)
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()
   const [Name, setName] = useState('')
   const [Email, setEmail] = useState('')
   const [Password, setPassword] = useState('')
   const [ResetingPassword, setResetingPassword] = useState(false)
  const [EmailForReset, setEmailForReset] = useState('')
   
   const HandleSignUp = async(e)=>{
    e.preventDefault()
       try {
        setloading(true)
          const UserCredentials = await createUserWithEmailAndPassword(auth,Email,Password)
          const user = UserCredentials.user;

          await updateProfile(user,{
            displayName:Name
          })
          console.log("User created successfully ", user)
        onAuthStateChanged(auth,(user)=>{
            if (user) {
              setloading(false)
                navigate('/home')
                toast.success("Registration has been completed")
                toast.success(`Welcome ${user.displayName}`)
            } else{
                navigate('/auth')
            }
        })

       } catch (error) {
          console.log(error.message)
          toast.error(error.message == 'Firebase: Error (auth/email-already-in-use).' ? 'User already exists':error.message)
          setloading(false)

       }
   }

   const HandleSignIn = async (e) => {
    e.preventDefault();

    try {
      setloading(false)

        const userCredential = await signInWithEmailAndPassword(auth, Email, Password);
        console.log("User logged in", userCredential);

        navigate('/home');
        toast.success("User logged in successfully");
    } catch (error) {
      setloading(false)
        console.error("Error during sign-in:", error.message);
        toast.error("Error logging in: " + error.message + "WIth the email "+ Email); // Notify user about the error
    }
};


   useEffect(() => {
     onAuthStateChanged(auth,(user)=>{
        if (user) {
            navigate('/home')
        } else{
            navigate('/auth')
        }
     })
   }, [])
   
   const HandleResetPassword = async()=>{
    try {
        
      await  sendPasswordResetEmail(auth,EmailForReset)
      setResetingPassword(false)
      toast.success("Password reset email sent!");

    } catch (error) {
        toast.error(error.message)
    } finally{
        setResetingPassword(false)
        setEmailForReset('')
    }
   }

  return (
    <div className='h-[100vh] w-[100vw] flex'>
        <ToastContainer/>
     
      <div id='Auth-Left' className='h-full w-[50%] hidden md:flex justify-center items-center flex-col p-6'>
        <h1 className='text-white text-5xl pb-5 font-semibold text-center'>Open-LMS</h1>
        <img className='min-h-[300px] animate-float max-h-[400px] min-w-[300px] max-w-[400px]' src="../public/Images/Auth_Left_oBJ.png" alt="" />
        <h1 className='text-white text-2xl p-6 text-center w-[400px]'>Online Learning Made Easy: Manage Your Resources!</h1>
        <h1 className='text-white text-md p-6 text-center  w-[350px]'>Empower Your Learning Journey: Manage, Learn, Achieve</h1>

      </div>
      <div id='Auth-Right' className='h-full w-full md:w-[50%] flex justify-center items-center p-10 md:p-20'>
        {IsSignUp?<div className='flex flex-col gap-9'>
            <div className='flex flex-col justify-center items-center gap-11'>
            <h1 className='text-center text-3xl font-semibold'>Empower Your Learning Experience: Create Your Account</h1>
            <button className='p-5 bg-gray-300 rounded-full'><i class="ri-google-fill"></i>Signup with Google</button> 
            </div>

        <form className='flex flex-col gap-3' onSubmit={HandleSignUp}>
            <label  htmlFor="Username" className='text-sm'>Name</label>
            <input value={Name} onChange={(e)=>setName(e.target.value)} className='p-4 outline-none focus:border-gray-800 transition-opacity border-b-2 border-gray-500' type="text" placeholder='Name' />
            <label htmlFor="Email" className='text-sm'>Email</label>
            <input value={Email} onChange={(e)=>setEmail(e.target.value)} className='p-4 outline-none focus:border-gray-800 transition-opacity border-b-2 border-gray-500' type="text" placeholder='Email' />
            <label htmlFor="Username" className='text-sm'>Password</label>
            <input value={Password} onChange={(e)=>setPassword(e.target.value)} className='p-4 outline-none focus:border-gray-800 transition-opacity border-b-2 border-gray-500' type="text" placeholder='Password' />
            <span className='flex items-center  gap-4'><input type="checkbox" className='rounded-full h-[20px] w-[20px] ' />  Show the password <button type='submit' className={`bg-purple-500 p-3 ${loading?'cursor-not-allowed bg-purple-400':'cursor-pointer'}  fixed md:right-[4.9rem] right-9 text-white rounded-full mt-3`}>SignUp</button></span> 
        </form>
        <h1 className=''>Already have an account ? <button onClick={()=>setIsSignUp(!IsSignUp)} className={`border-b ${loading?'cursor-not-allowed':'cursor-pointer'} border-b-blue-600 bg-none`}>SignIn</button></h1>

        </div>:<div className='flex flex-col gap-9'>
            <div className='flex flex-col justify-center items-center gap-11'>
            <h1 className='text-center text-3xl font-semibold'>Join & Connect the Fastest Growing Online Community</h1>
            <button className='p-5 bg-gray-300 rounded-full'><i class="ri-google-fill"></i>Signin with Google</button> 
            </div>

        <form onSubmit={HandleSignIn} className='flex flex-col gap-3' action="">
            <label htmlFor="Email" className='text-sm'>Email</label>
            <input value={Email} onChange={(e)=>setEmail(e.target.value)} className='p-4 outline-none focus:border-gray-800 transition-opacity border-b-2 border-gray-500' type="text" placeholder='Email' />
            <label htmlFor="Username" className='text-sm'>Password</label>
            <input value={Password} onChange={(e)=>setPassword(e.target.value)} className='p-4 outline-none focus:border-gray-800 transition-opacity border-b-2 border-gray-500' type="text" placeholder='Password' />
            <span className='flex items-center  gap-4'><input type="checkbox" className='rounded-full h-[20px] w-[20px] ' />  Show the password <button type='submit' className={`bg-purple-500 p-3 ${loading?'cursor-not-allowed bg-purple-400':'cursor-pointer'}  fixed md:right-[4.9rem] right-9 text-white rounded-full mt-3`}>Signin</button></span>
            <h1 onClick={()=>setResetingPassword(true)} className='text-blue-600 cursor-pointer'>Forgot password ?</h1> 
        </form>
         <h1 className=''>Don't have an account ? <button onClick={()=>setIsSignUp(!IsSignUp)} className='border-b border-b-blue-600 bg-none'>Register</button></h1>
        </div>}
    
      </div>
       {ResetingPassword&&<div className='absolute p-[30px] flex justify-center items-center flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[250px] w-[350px] md:w-[500px] rounded-md bg-gray-100'>
         <h1 className='text-center p-6'>Enter your registerd email</h1>
         <input type="email" value={EmailForReset} onChange={(e)=>setEmailForReset(e.target.value)} placeholder='Email' className=' p-4 outline-none transition-opacity border rounded-xl border-gray-500'/>
         <button onClick={HandleResetPassword} className='bg-purple-500 p-3 w-64 text-white rounded-full mt-3'>Send Reset link</button>
       </div>}
    </div>
  )
}

export default Auth