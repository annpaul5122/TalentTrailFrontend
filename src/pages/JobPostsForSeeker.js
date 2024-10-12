import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../styles/jobpost/JobPostCard.css'; 
import noResultsImage from '../assets/images/No Results.svg'; 

export const JobPostsForSeeker = () => {
    const location = useLocation();
    const { searchTerm } = location.state;
    const navigate = useNavigate();
 
    const [jobPosts, setJobPosts] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [showFilters, setShowFilters] = useState(false);  
    const [filters, setFilters] = useState({
        location: '',
        requirements: '',
        employmentType: '',
        industry: ''
    });
    const [noResults, setNoResults] = useState(false);
    const [showModal, setShowModal] = useState(false); 
    const [selectedJobPost, setSelectedJobPost] = useState(null); 
    const seekerId = localStorage.getItem("SeekerId");
    const token = localStorage.getItem("Auth-Token");
    console.log(token);

    useEffect(() => {
        const fetchJobPosts = async () => {
            try {
                const res = await axios.get("https://localhost:7119/api/JobSeekers/search", {
                    params: { jobTitle: searchTerm },
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                if (res.data && res.data.$values.length === 0) {
                    setNoResults(true);
                } else {
                    setJobPosts(res.data.$values);
                    setNoResults(false); 
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setNoResults(true); 
                } else {
                    console.error(error);
                }
            }
        };

        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get("https://localhost:7119/api/JobSeekers/appliedJobs", {
                    params: { seekerId } ,
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                setAppliedJobs(res.data.$values); 
            } catch (error) {
                console.error(error);
            }
        };

        fetchJobPosts();
        fetchAppliedJobs();
    }, [searchTerm,seekerId]);

    const applyFilters = async () => {
        try {
            const res = await axios.get("https://localhost:7119/api/JobSeekers/filter", {
                params: {
                    jobTitle: searchTerm,
                    industry: filters.industry,
                    requirements: filters.requirements,
                    location: filters.location,
                    employmentType: filters.employmentType
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            });
            if (res.data && res.data.$values.length === 0) {
                setNoResults(true);
            } else {
                setJobPosts(res.data.$values);
                setNoResults(false); 
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setNoResults(true); 
            } else {
                console.error(error);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    const handleJobPostClick = (jobPost) => {
        setSelectedJobPost(jobPost);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedJobPost(null);
    };

    const isDeadlineCrossed = (deadline) => {
        const currentDate = new Date();
        const applicationDeadlineDate = new Date(deadline);
        return applicationDeadlineDate < currentDate;
    };

    return (
        <div>
            <div className="filter-container">
                <button className="toggle-filter-btn" onClick={() => setShowFilters(!showFilters)}>
                    {showFilters ? 'Hide Filter Options' : 'Show Filter Options'}
                </button>
    
                {showFilters && (
                    <div className="filter-options">
                        <div className="filter-item">
                            <label>Location:</label>
                            <input
                                type="text"
                                name="location"
                                value={filters.location}
                                onChange={handleInputChange}
                                className="filter-input"
                            />
                        </div>
                        <div className="filter-item">
                            <label>Requirements:</label>
                            <input
                                type="text"
                                name="requirements"
                                value={filters.requirements}
                                onChange={handleInputChange}
                                className="filter-input"
                            />
                        </div>
                        <div className="filter-item">
                            <label>Employment Type:</label>
                            <select
                                name="employmentType"
                                value={filters.employmentType}
                                onChange={handleInputChange}
                                className="filter-select"
                            >
                                <option value="">Select Type</option>
                                <option value="FullTime">Full-Time</option>
                                <option value="PartTime">Part-Time</option>
                                <option value="Contract">Contract</option>
                                <option value="Temporary">Temporary</option>
                            </select>
                        </div>
                        <div className="filter-item">
                            <label>Industry:</label>
                            <input
                                type="text"
                                name="industry"
                                value={filters.industry}
                                onChange={handleInputChange}
                                className="filter-input"
                            />
                        </div>
                        <button onClick={applyFilters} className="apply-filter-btn">
                            Apply Filters
                        </button>
                    </div>
                )}
            </div>
    

            <div className="job-posts-container">

                {noResults ? (
                    <div className="no-results-container">
                        <img src={noResultsImage} alt="No results found" className="no-results-image" style={{ width: '400px', height: 'auto' }} />
                        <h4 style={{ color: "#0A3D62", textAlign: "center", fontWeight: "bold" }}>Oops.. No records found</h4>
                    </div>
                ) : (
                    
                    jobPosts.map((item, index) => (
                        <div
                            key={index}
                            className="job-post-card"
                            onClick={() => handleJobPostClick(item)} 
                        >
                            <div className="job-post-header">
                                <h2 className="job-title">{item.jobTitle}</h2>
                                <p className="job-location"><strong>{item.companyName}, </strong>{item.jobLocation}</p>
                            </div>
                            <div className="job-post-details">
                                <span className="employment-type-badge">{item.employmentType}</span>
                                <p className="application-deadline"><strong>Deadline:</strong> {formatDate(item.applicationDeadline)}</p>
                                <p className="job-requirements"><strong>Requirements:</strong> {item.jobRequirements}</p>
                            </div>
                            <button
                                className="apply-now-button"
                                disabled={appliedJobs.includes(item.jobId) || isDeadlineCrossed(item.applicationDeadline)}
                            >
                                {appliedJobs.includes(item.jobId) ? "Applied" : isDeadlineCrossed(item.applicationDeadline) ? "Deadline Crossed" : "Apply Now"}
                            </button>
                        </div>
                    ))
                )}
            </div>

    
            {selectedJobPost && (
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedJobPost.jobTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Company:</strong> {selectedJobPost.companyName}</p>
                        <p><strong>Company Description:</strong> {selectedJobPost.companyDescription}</p>
                        <p><strong>Company Website:</strong> {selectedJobPost.companyWebUrl}</p>
                        <p><strong>Description:</strong> {selectedJobPost.jobDescription}</p>
                        <p><strong>Requirements:</strong> {selectedJobPost.jobRequirements}</p>
                        <p><strong>Location:</strong> {selectedJobPost.jobLocation}</p>
                        <p><strong>Salary Range:</strong> {selectedJobPost.salaryRange}</p>
                        <p><strong>Employment Type:</strong> {selectedJobPost.employmentType}</p>
                        <p><strong>Industry:</strong> {selectedJobPost.industry}</p>
                        <p><strong>Application Deadline:</strong> {formatDate(selectedJobPost.applicationDeadline)}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" style={{fontSize: '14px'}} onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button style={{ 
                  backgroundColor: '#0A3D62', 
                  color: 'white', 
                  border: 'none',
                  fontSize: '14px', 
                  marginRight: '12px' 
                }} onClick={() => navigate(`/jobseeker/applications/apply/${selectedJobPost.jobId}`)} 
                disabled={appliedJobs.includes(selectedJobPost.jobId) || isDeadlineCrossed(selectedJobPost.applicationDeadline)} >
                    {appliedJobs.includes(selectedJobPost.jobId) ? "Applied" : isDeadlineCrossed(selectedJobPost.applicationDeadline) ? "Deadline Crossed" : "Apply Now"}
                </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};
