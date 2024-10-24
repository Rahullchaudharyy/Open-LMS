import React, { useEffect, useState } from 'react'
import { auth } from '../firebase.config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const [Name, setName] = useState(null)
    useEffect(()=>{
        onAuthStateChanged(auth, async (user)=>{
            if (user) {
                 await setName(user.displayName)
                toast.success(`Welcome ${user.displayName} `)
            } else{
                navigate('/auth')
                console.log('Someting is problem')
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
    <div>Hello {Name}

    <button onClick={HandleLogOut}>Log out</button>
    
    <ToastContainer/>
    </div>
  )
}

export default Home

