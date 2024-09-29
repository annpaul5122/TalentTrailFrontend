import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBValidation,
  MDBValidationItem
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmploymentType = {
  FullTime: 0,
  PartTime: 1,
  Contract: 2,
  Internship: 3,
};

const CreatePostForm = () => {
  const [formValue, setFormValue] = useState({
    jobTitle: '',
    jobDescription: '',
    jobRequirements: '',
    jobLocation: '',
    salaryRange: '',
    employmentType: '',
    industry: '',
    applicationDeadline: '',
    companyId: '',  // Add companyId field for the selected company
  });

  const [companies, setCompanies] = useState([]);  // Store the company list
  const employerId = localStorage.getItem("EmployerId");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the company details from the endpoint on component mount
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('https://localhost:7119/api/CompanyDetails');  // Adjust URL based on your route
        setCompanies(response.data.$values);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleEmploymentTypeChange = (e) => {
    setFormValue({ ...formValue, employmentType: parseInt(e.target.value) });
  };

  const handleCompanyChange = (e) => {
    setFormValue({ ...formValue, companyId: parseInt(e.target.value) });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7119/api/JobPosts', {
        EmployerId : employerId,
        CompanyId : formValue.companyId,
        JobTitle : formValue.jobTitle,
        JobDescription :formValue.jobDescription,
        JobRequirements :formValue.jobRequirements,
        JobLocation: formValue.jobLocation,
        SalaryRange: formValue.salaryRange,
        EmploymentType:formValue.employmentType ,
        Industry: formValue.industry,
        ApplicationDeadline: formValue.applicationDeadline
      });
      alert('Job post created successfully!');
      navigate(`/employer/jobpost/posts/${employerId}`);
    } catch (error) {
      console.error('Error creating job post:', error);
    }

  };

  return (
    <MDBContainer fluid style={{ paddingBottom: '50px' }}>
      <MDBRow className="d-flex justify-content-center align-items-center vh-100">
        <MDBCol md="6">
          <MDBCard className="mb-5">
            <MDBCardBody>
              <h3 style={{ marginTop: "10px", marginBottom: "30px" }}>Create Job Post</h3>
              <MDBValidation onSubmit={handleSubmit}>
                
                {/* Job Title */}
                <MDBValidationItem tooltip className="mb-3" feedback="Please provide a job title." invalid>
                  <MDBInput
                    name="jobTitle"
                    value={formValue.jobTitle}
                    onChange={handleChange}
                    label="Job Title"
                    required
                  />
                </MDBValidationItem>

                {/* Job Description */}
                <MDBValidationItem tooltip className="mb-3" feedback="Please provide a job description." invalid>
                  <MDBInput
                    name="jobDescription"
                    value={formValue.jobDescription}
                    onChange={handleChange}
                    label="Job Description"
                    required
                    type="textarea"
                    rows={4}
                  />
                </MDBValidationItem>

                {/* Job Requirements */}
                <MDBValidationItem tooltip className="mb-3" feedback="Please provide job requirements." invalid>
                  <MDBInput
                    name="jobRequirements"
                    value={formValue.jobRequirements}
                    onChange={handleChange}
                    label="Job Requirements"
                    type="textarea"
                    rows={3}
                  />
                </MDBValidationItem>

                {/* Job Location */}
                <MDBValidationItem tooltip className="mb-3" feedback="Please provide a job location." invalid>
                  <MDBInput
                    name="jobLocation"
                    value={formValue.jobLocation}
                    onChange={handleChange}
                    label="Job Location"
                    required
                  />
                </MDBValidationItem>

                {/* Salary Range */}
                <MDBValidationItem tooltip className="mb-3" feedback="Please provide a salary range." invalid>
                  <MDBInput
                    name="salaryRange"
                    value={formValue.salaryRange}
                    onChange={handleChange}
                    label="Salary Range"
                    required
                  />
                </MDBValidationItem>

                {/* Employment Type Dropdown */}
                <MDBValidationItem tooltip className="mb-3" feedback="Please select an employment type." invalid>
                  <div className="position-relative">
                    <select
                      name="employmentType"
                      value={formValue.employmentType}
                      onChange={handleEmploymentTypeChange}
                      className="form-control"
                      required
                    >
                      <option value="">Select Employment Type</option>
                      {Object.keys(EmploymentType).map((key) => (
                        <option key={key} value={EmploymentType[key]}>
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </option>
                      ))}
                    </select>
                  </div>
                </MDBValidationItem>

                {/* Industry */}
                <MDBValidationItem tooltip className="mb-3" feedback="Please provide an industry." invalid>
                  <MDBInput
                    name="industry"
                    value={formValue.industry}
                    onChange={handleChange}
                    label="Industry"
                    required
                  />
                </MDBValidationItem>

                {/* Application Deadline */}
                <MDBValidationItem tooltip className="mb-3" feedback="Please provide an application deadline." invalid>
                  <MDBInput
                    name="applicationDeadline"
                    value={formValue.applicationDeadline}
                    onChange={handleChange}
                    label="Application Deadline"
                    required
                    type="date"
                  />
                </MDBValidationItem>

                {/* Company Dropdown */}
                <MDBValidationItem tooltip className="mb-3" feedback="Please select a company." invalid>
                  <div className="position-relative">
                    <select
                      name="companyId"
                      value={formValue.companyId}
                      onChange={handleCompanyChange}
                      className="form-control"
                      required
                    >
                      <option value="">Select Company</option>
                      {companies.map((company) => (
                        <option key={company.companyId} value={company.companyId}>
                          {company.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                </MDBValidationItem>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <MDBBtn
                    type="submit"
                    className="mt-3"
                    style={{ backgroundColor: '#0A3D62', margin: "20px auto", padding: "10px 20px", borderRadius: "25px", fontSize: "14px", width: "30%" }}
                  >
                    Create
                  </MDBBtn>
                </div>
              </MDBValidation>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default CreatePostForm;
