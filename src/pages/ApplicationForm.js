import React from 'react';
import JobApplicationMenubar from '../components/jobapplication/JobApplicationMenubar';
import JobApplicationForm from './JobApplicationForm';

const ApplicationForm = () => {
    return (
        <div>
            <JobApplicationMenubar/>
            <JobApplicationForm/>
        </div>
    );
}

export default ApplicationForm;