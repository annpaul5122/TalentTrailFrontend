import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DisplayPost from './DisplayPost';
import axios from 'axios';
import noResultsImage from '../../assets/images/No Results.svg';

export default function JobPostsByEmployer() {
  const { employerId } = useParams();
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("Auth-Token");

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
      
        const response = await axios.get(`https://localhost:7119/api/JobPosts/getJobPostByEmpId/${employerId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        
        if (response.data && response.data.$values) {
          setJobPosts(response.data.$values);
        } else {
          setError("No job posts found or invalid response structure.");
        }
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred while fetching job posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobPosts();
  }, [employerId]);

  if (loading) return <p>Loading...</p>;

  if (jobPosts.length === 0) {
    return (
      <div className="no-results-container text-center">
        <img
          src={noResultsImage}
          alt="No results found"
          className="no-results-image"
          style={{ width: '400px', height: 'auto' }}
        />
        <h4 style={{ color: "#0A3D62", textAlign: "center", fontWeight: "bold" }}>
          Oops.. No records found
        </h4>
      </div>
    );
  }

  return <DisplayPost jobPosts={jobPosts} />;
}
