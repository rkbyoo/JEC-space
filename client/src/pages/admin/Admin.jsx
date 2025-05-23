import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import Products from './Products'
import Users from './Users'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ContactResponse from './ContactResponse'


const Admin = () => {

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.users);
    useEffect(() => {
        if (user?.role !== "admin") {
            navigate("/");
        }
    }, []);

    return (
        <div className='bg-white  p-10 text-black rounded-xl'>
            <Tabs className="text-white">
                <Tabs.TabPane tab="Products" key="1">
                    <Products />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Users" key="2">
                    <Users />
                </Tabs.TabPane>
                <Tabs.TabPane tab="User Responses" key="3">
                    <ContactResponse />
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default Admin