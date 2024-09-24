import React from 'react'
import { Outlet } from 'react-router-dom'
import PostSideBar from './PostSideBar'

const JobPostLayout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ height: '100vh' }}>
        <PostSideBar /> 
      </div>

      <div style={{ flexGrow: 1, padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  )
}

export default JobPostLayout
