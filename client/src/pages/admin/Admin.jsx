import React from 'react'
import { Tabs } from 'antd'
import Products from './Products'
import Users from './Users'


const Admin = () => {
    return (
        <div>
            <Tabs className="text-white">
                <Tabs.TabPane tab="Products" key="1">
                    <Products />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Users" key="2">
                    <Users />
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default Admin