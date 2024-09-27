import React from 'react';
import PostSideBar from '../components/jobpost/PostSideBar';
import { Outlet } from 'react-router-dom';

const JobPost = () => {
    return(
        <div style={{display:'flex',height:'100vh'}}>
            <div style={{height:'100vh'}}>
               <PostSideBar/>
            </div>
            
            <div style={{flexGrow: 1, padding:'20px',marginTop:"100px"}}>
               <Outlet/>
            </div>
        </div>
    );
}

export default JobPost;