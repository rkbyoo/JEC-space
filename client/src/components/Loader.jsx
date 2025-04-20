import React from 'react'
import { ColorRing } from 'react-loader-spinner'
function Loader() {
  return (
    <div className='fixed inset-0 bg-black z-[9999] flex justify-center items-center opacity-60'>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </div>
  )
}

export default Loader
