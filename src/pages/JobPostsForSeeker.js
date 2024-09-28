import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import '../styles/jobpost/JobPostCard.css'; // Assuming this is where your CSS is stored
import noResultsImage from '../assets/images/No Results.svg'; // Path to the image to show when no results are found

export const JobPostsForSeeker = () => {
    const location = useLocation();
    const { searchTerm } = location.state;

    // State for job posts, toggle, and filter options
    const [jobPosts, setJobPosts] = useState([]);
    const [showFilters, setShowFilters] = useState(false);  // Toggle for filter display
    const [filters, setFilters] = useState({
        location: '',
        requirements: '',
        employmentType: '',
        industry: ''
    });
    const [noResults, setNoResults] = useState(false);  // State for handling no results
    const [showModal, setShowModal] = useState(false);  // State to handle modal visibility
    const [selectedJobPost, setSelectedJobPost] = useState(null); // State for selected job post

    // Fetch job posts on component mount or searchTerm change
    useEffect(() => {
        const fetchJobPosts = async () => {
            try {
                const res = await axios.get("https://localhost:7119/api/JobSeekers/search", {
                    params: { jobTitle: searchTerm }
                });
                if (res.data && res.data.$values.length === 0) {
                    setNoResults(true);
                } else {
                    setJobPosts(res.data.$values);
                    setNoResults(false); // Reset if there are results
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setNoResults(true); // No results found
                } else {
                    console.error(error);
                }
            }
        };
        fetchJobPosts();
    }, [searchTerm]);

    // Fetch job posts based on selected filters
    const applyFilters = async () => {
        try {
            const res = await axios.get("https://localhost:7119/api/JobSeekers/filter", {
                params: {
                    jobTitle: searchTerm,
                    industry: filters.industry,
                    requirements: filters.requirements,
                    location: filters.location,
                    employmentType: filters.employmentType
                }
            });
            if (res.data && res.data.$values.length === 0) {
                setNoResults(true);
            } else {
                setJobPosts(res.data.$values);
                setNoResults(false); // Reset if there are results
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setNoResults(true); // No results found for the filters
            } else {
                console.error(error);
            }
        }
    };

    // Handle input changes for the filters
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    // Helper function to format dates
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Handle opening the modal with selected job post details
    const handleJobPostClick = (jobPost) => {
        setSelectedJobPost(jobPost);
        setShowModal(true);
    };

    // Handle closing the modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedJobPost(null);
    };

    return (
        <div>
            {/* Filter section */}
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
    
            {/* Job Posts Section */}
            <div className="job-posts-container">
                {/* No Results Found Section */}
                {noResults ? (
                    <div className="no-results-container">
                        <img src={noResultsImage} alt="No results found" className="no-results-image" style={{ width: '400px', height: 'auto' }} />
                        <h4 style={{ color: "#0A3D62", textAlign: "center", fontWeight: "bold" }}>Oops.. No records found</h4>
                    </div>
                ) : (
                    /* Job Posts List */
                    jobPosts.map((item, index) => (
                        <div
                            key={index}
                            className="job-post-card"
                            onClick={() => handleJobPostClick(item)} // Open modal on click
                        >
                            <div className="job-post-header">
                                <h2 className="job-title">{item.jobTitle}</h2>
                                <p className="job-location">{item.jobLocation}</p>
                            </div>
                            <div className="job-post-details">
                                <span className="employment-type-badge">{item.employmentType}</span>
                                <p className="application-deadline"><strong>Deadline:</strong> {formatDate(item.applicationDeadline)}</p>
                                <p className="job-requirements"><strong>Requirements:</strong> {item.jobRequirements}</p>
                            </div>
                            <button className="apply-now-button">Apply Now</button>
                        </div>
                    ))
                )}
            </div>

            {/* Modal for Job Post Details */}
            {selectedJobPost && (
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedJobPost.jobTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Description:</strong> {selectedJobPost.jobDescription}</p>
                        <p><strong>Requirements:</strong> {selectedJobPost.jobRequirements}</p>
                        <p><strong>Location:</strong> {selectedJobPost.jobLocation}</p>
                        <p><strong>Salary Range:</strong> {selectedJobPost.salaryRange}</p>
                        <p><strong>Employment Type:</strong> {selectedJobPost.employmentType}</p>
                        <p><strong>Industry:</strong> {selectedJobPost.industry}</p>
                        <p><strong>Application Deadline:</strong> {formatDate(selectedJobPost.applicationDeadline)}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => alert("Apply Now clicked!")}>
                            Apply Now
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};
