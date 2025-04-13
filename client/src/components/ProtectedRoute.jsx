import React, { useEffect, useState } from 'react'
import { GetCurrentUser } from '../apicalls/users'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

//in protected route we are going to wrap the children component so that only authorized one can access those pages 

function ProtectedRoute({children}) {
    const [user,setuser]=useState(null) //it is the data recieved from the backend
    const navigate=useNavigate()

    //validate function will make a api request using getcurrentuser instance and tell us that if the token is present or not and on the basis of that the user will be logged in
    const validateToken=async()=>{
        try {
            const response=await GetCurrentUser()
            console.log("response i got from getcurrentuser:",response)
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

    //on every render it will check for the validity of the token and on the basis of that it will show homepage
    useEffect(()=>{
        if(localStorage.getItem("token")){
            validateToken()   
            navigate("/")
        }
        else{

            navigate("/login")
        }
    },[])

    return (
    <div>
      {
        user && (
            <div className='p-5 text-white'>
                {user.name}
                {children}
            </div>
        )
      }
    </div>
  )
}

export default ProtectedRoute