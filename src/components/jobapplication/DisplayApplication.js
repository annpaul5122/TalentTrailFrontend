import React, { useEffect, useState } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import noResultsImage from '../../assets/images/No Results.svg';

const DisplayApplication = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { seekerId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [formData, setFormData] = useState({ coverLetter: '', resumeId: '' });
  const [isEditing, setIsEditing] = useState(false); 
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false); 
  const token = localStorage.getItem("Auth-Token");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`https://localhost:7119/api/JobApplications/GetApplicationByJobSeeker/${seekerId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const applications = response.data.$values;

        const applicationsWithJobTitles = await Promise.all(
          applications.map(async (application) => {
            const jobResponse = await axios.get(`https://localhost:7119/api/JobPosts/jobId/${application.jobId}`,{
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            return {
              ...application,
              JobTitle: jobResponse.data.jobTitle,
              CompanyName: jobResponse.data.companyName,
              CompanyDescription: jobResponse.data.companyDescription,
              CompanyWebUrl: jobResponse.data.companyWebUrl,
              CompanyLogo: jobResponse.data.companyLogo,
            };
          })
        );

        setJobApplications(applicationsWithJobTitles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job applications:', error);
        setLoading(false);
      }
    };

    const fetchResumes = async () => {
      try {
        const response = await axios.get(`https://localhost:7119/api/Resumes/${seekerId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResumes(response.data.$values);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };

    fetchApplications();
    fetchResumes();
  }, [seekerId]);

  const handleShowModal = (application) => {
    setSelectedApplication(application);
    setFormData({
      coverLetter: application.coverLetter,
      resumeId: application.resumeId || '',
    });
    setShowModal(true);
    setIsEditing(false); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedApplication(null);
    setFormData({ coverLetter: '', resumeId: '' });
    setIsEditing(false);
  };

  const handleDeleteClick = (application) => {
    setSelectedApplication(application); 
    setIsConfirmDeleteOpen(true); 
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://localhost:7119/api/JobApplications/${selectedApplication.applicationId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobApplications((prevApplications) =>
        prevApplications.filter((app) => app.applicationId !== selectedApplication.applicationId)
      ); 
      alert("Delete successful");
      window.location.reload();
    } catch (error) {
      alert('Error deleting application:', error);
    }
    setSelectedApplication(null); 
  };


  const handleUpdate = async () => {
    const applyJobDto = {
      seekerId: seekerId,
      jobId: selectedApplication.jobId,
      resumeId: formData.resumeId,
      coverLetter: formData.coverLetter
    };

    try {
      await axios.put(`https://localhost:7119/api/JobApplications`, applyJobDto,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Update successful");
      handleCloseModal();
      window.location.reload();
    } catch (error) {
      alert('Error updating application:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container my-5 p-4 bg-light rounded shadow">
      {jobApplications.length === 0 ? (
        <div className="no-results-container text-center">
          <img src={noResultsImage} alt="No results found" className="no-results-image" style={{ width: '400px', height: 'auto' }} />
          <h4 style={{ color: "#0A3D62", textAlign: "center", fontWeight: "bold" }}>Oops.. No records found</h4>
        </div>
      ) : (
        <>
      <h3 className="mb-4 text-center">Your Job Applications</h3>
      <MDBTable align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col'>Job Title</th>
            <th scope='col'>Resume</th>
            <th scope='col'>Application Status</th>
            <th scope='col'>Application Date</th>
            <th scope='col'>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {jobApplications.map((application) => (
            <tr key={application.applicationId}>
              <td>
                <div className='fw-bold'>{application.JobTitle}</div>
              </td>
              <td>
                <div>{application.resumePath}</div>
              </td>
              <td>
                <MDBBadge color={getBadgeColor(application.applicationStatus)} pill>
                  {application.applicationStatus}
                </MDBBadge>
              </td>
              <td>
                {new Date(application.applicationDate).toLocaleDateString()}
              </td>
              <td>
                <MDBBtn color='link' rounded size='sm' onClick={() => handleShowModal(application)}>
                  View
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      </>
      )}

      {selectedApplication && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Application Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formJobTitle">
                <Form.Label>Job Title</Form.Label>
                <Form.Control type="text" value={selectedApplication.JobTitle} readOnly />
              </Form.Group>
              <Form.Group controlId="formJobTitle">
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" value={selectedApplication.CompanyName} readOnly />
              </Form.Group>
              <Form.Group controlId="formJobTitle">
                <Form.Label>Company Description</Form.Label>
                <Form.Control type="text" value={selectedApplication.CompanyDescription} readOnly />
              </Form.Group>
              <Form.Group controlId="formResume">
                <Form.Label>Resume</Form.Label>
                {isEditing ? (
                  <Form.Control
                    as="select"
                    name="resumeId"
                    value={formData.resumeId}
                    onChange={handleChange}
                  >
                    <option value="">Select Resume</option>
                    {resumes.map((resume) => (
                      <option key={resume.resumeId} value={resume.resumeId}>
                        {resume.resumePath}
                      </option>
                    ))}
                  </Form.Control>
                ) : (
                  <Form.Control type="text" value={selectedApplication.resumePath} readOnly />
                )}
              </Form.Group>

              <Form.Group controlId="formCoverLetter">
                <Form.Label>Cover Letter</Form.Label>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                  />
                ) : (
                  <Form.Control type="text" value={formData.coverLetter} readOnly />
                )}
              </Form.Group>

              <Form.Group controlId="formApplicationStatus">
                <Form.Label>Application Status</Form.Label>
                <Form.Control type="text" value={selectedApplication.applicationStatus} readOnly />
              </Form.Group>

              <Form.Group controlId="formApplicationDate">
                <Form.Label>Application Date</Form.Label>
                <Form.Control type="text" value={new Date(selectedApplication.applicationDate).toLocaleDateString()} readOnly />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {isEditing ? (
              <>
                <Button variant="secondary" style={{fontSize:"14px"}} onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button variant="primary" style={{fontSize:"14px"}} onClick={handleUpdate}>Save</Button>
              </>
            ) : (
              <>
                <Button style={{backgroundColor:"#0A3D64",fontSize:"14px"}} onClick={() => setIsEditing(true)}>Update</Button>
                <Button variant="danger" style={{fontSize:"14px"}} onClick={() => handleDeleteClick(selectedApplication)}>Delete</Button>
              </>
            )}
          </Modal.Footer>
        </Modal>
      )}

     <Modal show={isConfirmDeleteOpen} onHide={() => setIsConfirmDeleteOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this job application?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsConfirmDeleteOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

const getBadgeColor = (status) => {
  switch (status) {
    case 'Applied':
      return 'primary';
    case 'InterviewScheduled':
      return 'info';
    case 'OfferExtended':
      return 'secondary';
    case 'Accepted':
      return 'success';
    case 'Rejected':
      return 'danger';
    case 'Withdrawn':
      return 'warning';
    default:
      return 'secondary';
  }
};

export default DisplayApplication;
