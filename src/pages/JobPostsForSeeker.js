import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export const JobPostsForSeeker = () => {

    const location = useLocation();
  const { searchTerm } = location.state
  const [jobPosts,setJobPosts] = useState([])
  console.log(searchTerm);
  
  useEffect(()=>{
    try{
    const res = axios.get("https://localhost:7119/api/JobSeekers/search",searchTerm)
        setJobPosts(res)
    }
    catch(error){
        console.log(error);
        
    }
  },[])

  return (
    <div>
        {jobPosts.map((item,index)=>{
            <div>
                <h1>{item.jobTitle}</h1>
            </div>

        })}
    </div>
  )
}
