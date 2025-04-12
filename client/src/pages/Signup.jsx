import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { Link } from 'react-router-dom'
import { SingupUser } from '../apicalls/users'

function Signup() {
    const onFinish = async(values) => {
        try {
            const response=await SingupUser(values)
            if(response.success){
                return message.success(response.message)
            }
            else{
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
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