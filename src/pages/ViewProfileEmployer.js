import React from 'react'
import ProfileViewEmployer from '../components/dashboardemployer/ProfileViewEmployer'
import EmployerMenuBar from '../components/employerhome/EmployerMenuBar'

function ViewProfileEmployer() {
  return (
    <div>
        <EmployerMenuBar/>
        <ProfileViewEmployer/>
    </div>
  )
}

export default ViewProfileEmployer