import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Button, Modal, Form } from 'react-bootstrap';
import noResultsImage from '../../assets/images/No Results.svg';

export default function ViewApplicants() {
  const { jobId } = useParams(); 
  const [applicants, setApplicants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [newStatus, setNewStatus] = useState(''); 
  const token = localStorage.getItem("Auth-Token");

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`https://localhost:7119/api/JobApplications/GetApplicationByJobPost/${jobId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApplicants(response.data.$values);  
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };
    
    fetchApplicants();
  }, [jobId]);

  const getBadgeColor = (status) => {
    switch (status) {
      case 'Applied':
        return 'info';
      case 'InterviewScheduled':
        return 'primary';
      case 'OfferExtended':
        return 'warning';
      case 'Accepted':
        return 'success';
      case 'Rejected':
        return 'danger';
      case 'Withdrawn':
        return 'dark';
      default:
        return 'secondary';
    }
  };

  const handleViewClick = (applicant) => {
    setSelectedApplicant(applicant); 
    setNewStatus(applicant.applicationStatus); 
    setShowModal(true); 
  };

  const handleClose = () => setShowModal(false);

  
  const ApplicationStatus = {
    Applied: 0,
    InterviewScheduled: 1,
    OfferExtended: 2,
    Accepted: 3,
    Rejected: 4,
    Withdrawn: 5,
  };

  const handleStatusUpdate = async () => {
    if (!newStatus || !selectedApplicant) return;

    const updateDto = {
      applicationId: selectedApplicant.applicationId,
      newStatus: ApplicationStatus[newStatus]
    };

    try {
      const response = await axios.put('https://localhost:7119/api/JobPosts/UpdateApplicationStatus', updateDto,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Application status updated successfully.');
      setShowModal(false); 
      window.location.reload();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status.');
    }
  };

  const handleDownload = async (applicationId) => {
    const url = `https://localhost:7119/api/JobApplications/DownloadApplicantPDF/${applicationId}`;
    
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // Important to handle binary data
      });

      // Create a blob URL and trigger download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', `Applicant_Profile_${applicationId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download applicant PDF.');
    }
  };

  return (
    <div>
       {applicants.length === 0 ? (
        <div className="no-results-container text-center">
          <img src={noResultsImage} alt="No results found" className="no-results-image" style={{ width: '400px', height: 'auto' }} />
          <h4 style={{ color: "#0A3D62", textAlign: "center", fontWeight: "bold" }}>Oops.. No records found</h4>
        </div>
      ) : (
        <>
      <h3 style={{ marginBottom: '50px' }}>Applicants</h3>
      <MDBTable align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col'>Applicant</th>
            <th scope='col'>Resume</th>
            <th scope='col'>Status</th>
            <th scope='col'>Application Date</th>
            <th scope='col'>Actions</th>
            <th scope='col'>Download</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {applicants.map((applicant, index) => (
            <tr key={index}>
              <td>
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>{applicant.seekerName}</p>
                  <p className='text-muted mb-0'>{applicant.email}</p>
                </div>
              </td>
              <td>
                <p className='fw-normal mb-1'>{applicant.resumePath}</p>
              </td>
              <td>
                <MDBBadge color={getBadgeColor(applicant.applicationStatus)} pill>
                  {applicant.applicationStatus}
                </MDBBadge>
              </td>
              <td>{new Date(applicant.applicationDate).toLocaleDateString()}</td>
              <td>
                <MDBBtn color='link' rounded size='sm' onClick={() => handleViewClick(applicant)}>
                  View
                </MDBBtn>
              </td>
              <td>
                    <MDBBtn color='link' rounded size='sm' onClick={() => handleDownload(applicant.applicationId)}>
                      Download
                    </MDBBtn>
                  </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      </>
      )}

      <Modal show={showModal} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Applicant Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApplicant && (
            <form>
              <div className='mb-3'>
                <label className='form-label'>Applicant Name</label>
                <input
                  type='text'
                  className='form-control'
                  value={selectedApplicant.seekerName}
                  readOnly
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input
                  type='email'
                  className='form-control'
                  value={selectedApplicant.email}
                  readOnly
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Cover Letter</label>
                <textarea
                  className='form-control'
                  rows='3'
                  value={selectedApplicant.coverLetter || 'N/A'}
                  readOnly
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Resume</label>
                <input
                  type='text'
                  className='form-control'
                  value={selectedApplicant.resumePath}
                  readOnly
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Application Status</label>
                <Form.Select 
                  value={newStatus} 
                  onChange={(e) => setNewStatus(e.target.value)}
                  aria-label="Select Application Status">
                  <option value="Applied">Applied</option>
                  <option value="InterviewScheduled">Interview Scheduled</option>
                  <option value="OfferExtended">Offer Extended</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Withdrawn">Withdrawn</option>
                </Form.Select>
              </div>
              <div className='mb-3'>
                <label className='form-label'>Application Date</label>
                <input
                  type='text'
                  className='form-control'
                  value={new Date(selectedApplicant.applicationDate).toLocaleDateString()}
                  readOnly
                />
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' style={{fontSize:'14px'}} onClick={handleClose}>
            Close
          </Button>
          <Button
            style={{ 
              backgroundColor: '#0A3D62', 
              color: 'white', 
              border: 'none',
              fontSize: '14px', 
              marginRight: '12px' 
            }}
            onClick={handleStatusUpdate}
          >
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
