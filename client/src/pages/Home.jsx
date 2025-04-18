import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
  const {user}=useSelector((state)=>state.users)
  return (
    <div className='text-white'>
      hello this is my homepage i dont know why it is not showing
      {user.name}
    </div>
  )
}

export default Home
