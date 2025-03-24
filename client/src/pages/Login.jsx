import React from 'react'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'

function Login() {
    const onFinish = (values) => {
        console.log("success", values)
    }
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
