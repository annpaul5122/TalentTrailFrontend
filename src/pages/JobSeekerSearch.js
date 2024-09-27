import React from 'react';
import Menubar from '../components/jobseekermain.js/Menubar';
import { Outlet } from 'react-router-dom';

const JobSeekerSearch = () => {
    return(
        <div >
            <div >
               <Menubar/>
            </div>
            
            <div >
               <Outlet/>
            </div>
        </div>
    );
}

export default JobSeekerSearch;