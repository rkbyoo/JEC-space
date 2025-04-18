import React, { useEffect, useState } from 'react'
import { GetCurrentUser } from '../apicalls/users'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SetLoader } from '../redux/loadersSlice'
import { SetUser } from '../redux/usersSlice'


//in protected route we are going to wrap the children component so that only authorized one can access those pages 

function ProtectedRoute({ children }) {
    const dispatch = useDispatch()
    // const [user, setuser] = useState(null) //it is the data recieved from the backend
    const {user}=useSelector((state)=>state.users)
    const navigate = useNavigate()

    //validate function will make a api request using getcurrentuser instance and tell us that if the token is present or not and on the basis of that the user will be logged in
    const validateToken = async () => {
        try {
            dispatch(SetLoader(true))
            const response = await GetCurrentUser()
            console.log("response i got from getcurrentuser:", response.data)
            dispatch(SetLoader(false))
            if (response.success) {
                dispatch(SetUser(response.data))
                // navigate("/")
            }
            else {
                message.error("token is not valid")
                navigate("/login")
            }
        } catch (error) {
            dispatch(SetLoader(false))
            message.error(error.message)
        }
    }

    //on 1st render it will check for the validity of the token and on the basis of that it will show homepage
    useEffect(() => {
        if (localStorage.getItem("token")) {
            validateToken()
        }
        else {
            message.error("You are not logged in")
            navigate("/login")
        }
    }, [])

    return (
        <div>
            {
                user && (
                    <div className='p-5 text-white'>
                        {children}
                    </div>
                )
            }
        </div>
    )
}

export default ProtectedRoute