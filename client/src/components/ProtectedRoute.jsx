import React, { Children, useEffect, useState } from 'react'
import { GetCurrentUser } from '../apicalls/users'
import { message } from 'antd'
import { getCurrentUser } from '../../../server/controllers/authN'
import { useNavigate } from 'react-router-dom'

//in protected route we are going to wrap the children component so that only authorized one can access those pages 

function ProtectedRoute({children}) {
    const [user,setuser]=useState(null) //it is the data recieved from the backend
    const navigate=useNavigate()
    const validateToken=async()=>{
        try {
            const response=await getCurrentUser()
            if(response.success){
                setuser(response.data)
                navigate("/")
            }
            else{
                message.error(error.message)
                navigate("/login")
            }
        } catch (error) {
            message.error(error.message)
            navigate("/login")
        }
    }

    //on every render it will check for the validity of the token and on the basis of that it will 
    useEffect(()=>{
        if(localStorage.getItem("token")){
            validateToken()   
        }
        else{
            message.error("please login to continue")
        }
    },[])

    return (
    <div>
      {
        user && (
            <div className='p-5'>
                {user.name}
                {children}
            </div>
        )
      }
    </div>
  )
}

export default ProtectedRoute
