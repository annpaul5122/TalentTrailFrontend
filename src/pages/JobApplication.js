import React from 'react';
import JobApplicationMenubar from '../components/jobapplication/JobApplicationMenubar';
import DisplayApplication from '../components/jobapplication/DisplayApplication';
import { Outlet } from 'react-router-dom';

const JobApplication = () => {
    return(
        <div >
               <JobApplicationMenubar/>
                <DisplayApplication/>
        </div>
    );
}

export default JobApplication;