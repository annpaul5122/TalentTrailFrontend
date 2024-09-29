import React, { useState,useEffect } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DisplayPost({ jobPosts }) {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    jobRequirements: '',
    jobLocation: '',
    salaryRange: '',
    employmentType: '',
    applicationDeadline: '',
    companyId: null,
  });
  const [companies, setCompanies] = useState([]);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const getBadgeColor = (employmentType) => {
    switch (employmentType) {
      case 'FullTime':
        return 'success';
      case 'PartTime':
        return 'warning';
      case 'Contract':
        return 'info';
      case 'Internship':
        return 'secondary';
      default:
        return 'primary';
    }
  };


  const handleViewClick = (job) => {
    setSelectedJob(job);
    setFormData({
      jobTitle: job.jobTitle,
      companyName: job.companyName,
      companyId : job.companyId,
      jobDescription: job.jobDescription,
      jobRequirements: job.jobRequirements,
      jobLocation: job.jobLocation,
      salaryRange: job.salaryRange,
      employmentType: job.employmentType,
      applicationDeadline: job.applicationDeadline,
      industry: job.industry
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen) {
      axios.get('https://localhost:7119/api/CompanyDetails')
        .then(response => setCompanies(response.data.$values))
        .catch(error => console.error('Failed to fetch companies', error));
    }
  }, [isModalOpen]);

  const handleViewApplicants = (selectedJob) => {
    navigate(`/employer/jobpost/posts/viewapplicants/${selectedJob.jobId}`); 
  };

  const handleSave = async () => {
    if (selectedJob) {
      const updatedJobPost = {
        JobTitle: formData.jobTitle || selectedJob.jobTitle,
        JobDescription: formData.jobDescription || selectedJob.jobDescription,
        JobRequirements: formData.jobRequirements || selectedJob.jobRequirements,
        JobLocation: formData.jobLocation || selectedJob.jobLocation,
        SalaryRange: formData.salaryRange || selectedJob.salaryRange,
        EmploymentType: employmentTypeOptions.find(option => option.label === formData.employmentType)?.value, 
        ApplicationDeadline: formData.applicationDeadline, 
        Industry: formData.industry,
        CompanyId: formData.companyId,
      };


      try {
        await axios.put(
          `https://localhost:7119/api/JobPosts/${selectedJob.jobId}`,
          updatedJobPost
        );
        setSelectedJob(null); 
        setIsModalOpen(false); 
        alert('Job post updated successfully!'); 
      } catch (error) {
        console.error('Failed to update job post:', error);
        alert('Failed to update job post. Please try again.'); 
      }
    }
  };

  const handleDelete = async () => {
    if (selectedJob) {
      try {
        await axios.delete(`https://localhost:7119/api/JobPosts/${selectedJob.jobId}`);
        setSelectedJob(null);
        setIsModalOpen(false);
        alert('Job post deleted successfully!'); 
      } catch (error) {
        console.error('Failed to delete job post:', error);
        alert('Failed to delete job post. Please try again.'); 
      }
    }
  };

  const employmentTypeOptions = [
    { label: 'FullTime', value: 0 },
    { label: 'PartTime', value: 1 },
    { label: 'Contract', value: 2 },
    { label: 'Internship', value: 3 },
  ];

  return (
    <>
      <MDBTable align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col' className='fw-bold'>Job Title</th>
            <th scope='col' className='fw-bold'>Employment Type</th>
            <th scope='col' className='fw-bold'>Application Deadline</th>
            <th scope='col' className='fw-bold'>Created At</th>
            <th scope='col' className='fw-bold'>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {jobPosts.map((job, index) => (
            <tr key={index}>
              <td>
                <div className='d-flex align-items-center'>
                  <div className='ms-3'>
                    <p className='fw-bold mb-1'>{job.jobTitle}</p>
                    <p className='text-muted mb-0'>{job.companyName}</p>
                  </div>
                </div>
              </td>
              <td>
                <MDBBadge color={getBadgeColor(job.employmentType)} pill>
                  {job.employmentType}
                </MDBBadge>
              </td>
              <td>
                <p className='fw-normal mb-1'>{new Date(job.applicationDeadline).toLocaleDateString()}</p>
              </td>
              <td>
                <p className='fw-normal mb-1'>{new Date(job.createdAt).toLocaleDateString()}</p>
              </td>
              <td>
                <MDBBtn color='link' rounded size='sm' onClick={() => handleViewClick(job)}>
                  View
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      {/* Modal to display the selected job details */}
      {selectedJob && (
        <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedJob.jobTitle} - Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.jobTitle}
                  readOnly={!isEditing}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Company</Form.Label>
                {isEditing ? (
                  <Form.Control
                    as="select"
                    value={formData.companyId}
                    onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                  >
                    <option value="">Select a company</option>
                    {companies.map((company) => (
                      <option key={company.companyId} value={company.companyId}>
                        {company.companyName}
                      </option>
                    ))}
                  </Form.Control>
                ) : (
                  <Form.Control
                    type="text"
                    value={formData.companyName}
                    readOnly={!isEditing}
                  />
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Job Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={formData.jobDescription}
                  readOnly={!isEditing}
                  rows={4}
                  onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Job Requirements</Form.Label>
                <Form.Control
                  as="textarea"
                  value={formData.jobRequirements}
                  readOnly={!isEditing}
                  rows={4}
                  onChange={(e) => setFormData({ ...formData, jobRequirements: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Job Location</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.jobLocation}
                  readOnly={!isEditing}
                  onChange={(e) => setFormData({ ...formData, jobLocation: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Salary Range</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.salaryRange}
                  readOnly={!isEditing}
                  onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Industry</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.industry} // Include industry in the modal
                  readOnly={!isEditing}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })} // Handle industry change
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Employment Type</Form.Label>
                <Form.Control
                  as="select"
                  value={employmentTypeOptions.find(option => option.label === formData.employmentType)?.value}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({ ...formData, employmentType: employmentTypeOptions[e.target.selectedIndex].label })}
                >
                  {employmentTypeOptions.map((option, idx) => (
                    <option key={idx} value={option.value}>{option.label}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Application Deadline</Form.Label>
                <Form.Control
                  type="date" // Change to date input for better user experience
                  value={new Date(formData.applicationDeadline).toISOString().split('T')[0]} // Convert date to input format
                  readOnly={!isEditing}
                  onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })} // Update state on change
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <div>
    <MDBBtn color='danger' rounded size='sm' style={{ textDecoration: 'none' }} onClick={() => setIsConfirmDeleteOpen(true)}>
      Delete
    </MDBBtn>
  </div>
  <div style={{ display: 'flex', gap: '10px' }}>
            <MDBBtn color='link' rounded size='sm' style={{
              color: '#0A3D62',
              marginLeft: '560px',
              textDecoration: 'none'
            }} onClick={() => {
              if (isEditing) {
                handleSave(); 
              }
              setIsEditing(!isEditing); 
            }}>
              {isEditing ? 'Save' : 'Edit'}
            </MDBBtn>
            {isEditing ? (
              <MDBBtn color='link' rounded size='sm' style={{
                color: '#DC3545',
                textDecoration: 'none'
              }} onClick={() => setIsEditing(false)}>
                Cancel
              </MDBBtn>
            ) : (
              <Button 
                style={{ 
                  backgroundColor: '#0A3D62', 
                  color: 'white', 
                  border: 'none',
                  fontSize: '14px', 
                  marginRight: '12px' 
                }} onClick={() => handleViewApplicants(selectedJob)}>
                View Applicants
              </Button>
            )}
            </div>
          </Modal.Footer>
        </Modal>
      )}

      {/* Confirmation Modal for Deleting the Job Post */}
      <Modal show={isConfirmDeleteOpen} onHide={() => setIsConfirmDeleteOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this job post?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsConfirmDeleteOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => { handleDelete(); setIsConfirmDeleteOpen(false); }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
