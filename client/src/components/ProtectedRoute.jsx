import React, { useEffect, useState } from 'react'
import { GetCurrentUser } from '../apicalls/users'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { SetLoader } from '../redux/loadersSlice'
import { SetUser } from '../redux/usersSlice'
import { useSelector } from 'react-redux'

//in protected route we are going to wrap the children component so that only authorized one can access those pages 

function ProtectedRoute({ children }) {
    const {user}=useSelector((state)=>state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //validate function will make a api request using getcurrentuser instance and tell us that if the token is present or not and on the basis of that the user will be logged in
    const validateToken = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetCurrentUser();
            dispatch(SetLoader(false));
            if (response.success) {
                dispatch(SetUser(response.data));
            } else {
                localStorage.removeItem("token");
                dispatch(SetUser(null)); // Clear user state
                message.error("Session expired. Please login again.");
                navigate("/login");
            }
        } catch (error) {
            dispatch(SetLoader(false));
            localStorage.removeItem("token");
            dispatch(SetUser(null)); // Clear user state
            message.error("Session expired. Please login again.");
            navigate("/login");
        }
    }

    //on 1st render it will check for the validity of the token and on the basis of that it will show homepage
    useEffect(() => {
        if (localStorage.getItem("token")) {
            validateToken()
        }
        else {
            dispatch(SetUser(null)); // Clear user state if no token
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