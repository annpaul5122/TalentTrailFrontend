import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBValidation,
  MDBValidationItem,
  MDBTextArea
} from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';

const JobApplicationForm = () => {
  const { jobId } = useParams(); 
  const [formValue, setFormValue] = useState({
    resumeId: '',
    coverLetter: ''
  });
  const [resumes, setResumes] = useState([]);
  const seekerId = localStorage.getItem("SeekerId");

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get(`https://localhost:7119/api/Resumes/${seekerId}`);
        setResumes(response.data.$values);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };
    
    fetchResumes();
  }, [seekerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleResumeChange = (e) => {
    setFormValue({ ...formValue, resumeId: parseInt(e.target.value) });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const applyJobDto = {
        seekerId,
        jobId,
        resumeId: formValue.resumeId,
        coverLetter: formValue.coverLetter,
      };
      await axios.post('https://localhost:7119/api/JobApplications', applyJobDto);
      alert('Job Application created successfully!');
    } catch (error) {
      console.error('Error creating job application:', error);
    }
  };

  return (
    <MDBContainer fluid style={{ paddingBottom: '50px'}}>
      <MDBRow className="d-flex justify-content-center align-items-center vh-100">
        <MDBCol md="6">
          <MDBCard className="mb-5">
            <MDBCardBody>
              <h3 style={{ marginTop: "10px", marginBottom: "30px" }}>Apply for Job</h3>
              <MDBValidation onSubmit={onSubmit}>
                
                {/* Cover Letter */}
                <MDBValidationItem tooltip className="mb-3" feedback="Please provide a cover letter." invalid>
                  <MDBTextArea
                    name="coverLetter"
                    value={formValue.coverLetter}
                    onChange={handleChange}
                    label="Cover Letter"
                    required
                    rows={4}
                  />
                </MDBValidationItem>

                {/* Resume Dropdown */}
                <MDBValidationItem tooltip className="mb-3" feedback="Please select a resume." invalid>
                  <div className="position-relative">
                    <select
                      name="resumeId"
                      value={formValue.resumeId}
                      onChange={handleResumeChange}
                      className="form-control"
                      required
                    >
                      <option value="">Select Resume</option>
                      {resumes.map((resume) => (
                        <option key={resume.resumeId} value={resume.resumeId}>
                          {resume.resumePath} {/* You can display the path or any other relevant info */}
                        </option>
                      ))}
                    </select>
                  </div>
                </MDBValidationItem>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <MDBBtn type="submit" className="mt-3" style={{ backgroundColor: '#0A3D62', margin: "20px auto", padding: "10px 20px", borderRadius: "25px", fontSize: "14px", width: "30%" }}>
                    Apply
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

export default JobApplicationForm;
