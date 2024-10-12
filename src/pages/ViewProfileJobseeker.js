import React from 'react'
import ProfileViewJobseeker from '../components/dashboardjobseeker/ProfileViewJobseeker'
import Menubar from '../components/jobseekermain.js/Menubar'
import ResumeList from '../components/dashboardjobseeker/ResumeList'

function ViewProfileJobseeker() {
  return (
    <div>
        <Menubar/>
        <ProfileViewJobseeker/>
        <ResumeList/>
    </div>
  )
}

export default ViewProfileJobseeker