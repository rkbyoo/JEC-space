import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SetLoader } from '../redux/loadersSlice'
import { SendOTP } from '../apicalls/users' // <-- Import your SendOTP function

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onFinish = async (values) => {
        try {
            dispatch(SetLoader(true))
            // Call backend to send OTP
            console.log("hello i am inside signup page")
            const response = await SendOTP({ email: values.email })
            
            dispatch(SetLoader(false))
            if (response.success) {
                // Navigate to OTP verification page with form values
                navigate("/otpverification", { state: values })
            }
            else{
                console.log("hello i am inside signup else block")
                message.error(response || "Failed to send OTP");
            }
        } catch (error) {
            dispatch(SetLoader(false))
            console.log("hello i am inside signup catch block")
            message.error(error.response?.data?.message || "Failed to send OTP");
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/")
        }
    }, [])

    return (
        <div className='h-screen flex flex-col justify-center items-center text-center'>
            <Link to="/" className='cursor-default'>
                <h1 className='cursor-pointer text-3xl font-extrabold p-4'>
                    <span className='text-center text-white  transition-all duration-200 hover:text-blue-400'>JEC</span>
                    <span className='text-white transition-all duration-200 hover:text-blue-600'>-SPACE</span>
                </h1>
            </Link>
            <div className='bg-white p-5 w-[450px] rounded-lg'>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Name' name="name" >
                        <Input placeholder='name' required></Input>
                    </Form.Item>
                    <Form.Item label='Email' name="email">
                        <Input placeholder='Enter your Email' type='email' required></Input>
                    </Form.Item>
                    <Form.Item label='Password' name="password">
                        <Input placeholder='Password' type='password' required></Input>
                    </Form.Item>
                    <Button type='primary' htmlType='submit' className='w-full'>Sign Up</Button>
                    <div className='mt-5 text-center'>
                        <span className='text-gray-500' >
                            Already have an account? <Link to="/login">Log in</Link>
                        </span>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Signup