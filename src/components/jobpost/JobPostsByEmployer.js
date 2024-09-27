import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DisplayPost from './DisplayPost';
import axios from 'axios';

export default function JobPostsByEmployer() {
  const { employerId } = useParams(); // Get employerId from URL
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        // Fetching job posts using axios.get
        const response = await axios.get(`https://localhost:7119/api/JobPosts/getJobPostByEmpId/${employerId}`);
        
        // Check if response contains the data properly
        if (response.data && response.data.$values) {
          setJobPosts(response.data.$values);
        } else {
          setError("No job posts found or invalid response structure.");
        }
      } catch (error) {
        // Setting error message if API call fails
        setError(error.response?.data?.message || "An error occurred while fetching job posts.");
      } finally {
        // Set loading to false once data is fetched or an error occurred
        setLoading(false);
      }
    };

    fetchJobPosts();
  }, [employerId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <DisplayPost jobPosts={jobPosts} />;
}
