import React from 'react'
import { Tabs } from 'antd'
import Products from './Products'


const Admin = () => {
    return (
        <div>
            <Tabs className="text-white">
                <Tabs.TabPane tab="Products" key="1">
                    <Products />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Users" key="2">
                    <h1>Users</h1>
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default Admin