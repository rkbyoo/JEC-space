import React, { useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../apicalls/users'
import { useDispatch } from 'react-redux'
import { SetLoader } from '../redux/loadersSlice'


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onFinish = async (values) => {

        try {
            dispatch(SetLoader(true))
            const response = await LoginUser(values)
            dispatch(SetLoader(false))
            console.log("this is my response from backend on login",response)
            if (response.success) {
                localStorage.setItem("token", response.token)
                message.success(response.message)
                navigate("/")
            } 
            
        } catch (error) {
            dispatch(SetLoader(false))
            console.log("Some error while login", error)
            message.error(error.response?.data?.message)
        }
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/")
        }

    }, [])

    return (
        <div className='h-screen flex flex-col justify-center items-center text-center'>
            <Link to="/" className='cursor-default'>
                <h1 className='cursor-pointer text-3xl font-extrabold p-4'>
                    <span
                        className='text-center text-white  transition-all duration-200 hover:text-blue-400'>JEC
                    </span>
                    <span
                        className='text-white transition-all duration-200 hover:text-blue-600'>
                        -SPACE
                    </span>
                </h1>
            </Link>
            <div className='bg-white p-5 w-[450px] rounded-lg'>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Email' name="email">
                        <Input placeholder='Enter your Email' type='email' required></Input>
                    </Form.Item>
                    <Form.Item label='Password' name="password" >
                        <Input placeholder='Password' type='password' required></Input>
                    </Form.Item>
                    <Button type='primary' htmlType='submit' className='w-full'>Log In</Button>
                    <div className='mt-5 text-center'>
                        <span className='text-gray-500' >
                            Dont have an account? <Link to="/signup">Sign Up</Link>
                        </span>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login
