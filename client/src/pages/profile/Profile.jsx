import React from 'react'
import { Tabs } from 'antd'
import Products from './product/Products'

function Profile() {
  return (
    <div className='bg-white h-full w-full p-10 text-black rounded-xl'>
      <Tabs defaultActiveKey="1"tabPosition="left" >
            <Tabs.TabPane tab="Profile" key="1">
                <h1>general</h1>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Products" key="2">
                <Products />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Offers" key="3">
                <h1>Bids</h1>
            </Tabs.TabPane>
            
        </Tabs>
    </div>
  )
}

export default Profile
