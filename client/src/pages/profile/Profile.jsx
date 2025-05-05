import React from 'react'
import { Tabs } from 'antd'
import Products from './product/Products'
import ProfileInfo from './userProfile/ProfileInfo'
import UserBids from './UserBids/UserBids'

function Profile() {
  return (
    <div className='bg-white  p-10 text-black rounded-xl'>
      <Tabs defaultActiveKey="1" tabPosition="top" className='w-full h-full'>
        <Tabs.TabPane tab="Profile" key="1">
          <ProfileInfo />
        </Tabs.TabPane>
        <Tabs.TabPane tab="My Products" key="2">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Offers sent" key="3">
          <UserBids />
        </Tabs.TabPane>

      </Tabs>
    </div>
  )
}

export default Profile
