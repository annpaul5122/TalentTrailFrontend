import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const EditProfileModal = ({ show, handleClose, profile, onUpdate }) => {
  const [formData, setFormData] = useState({ ...profile });
  const [companyNames, setCompanyNames] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [error, setError] = useState(null);
  
  const token = localStorage.getItem("Auth-Token");

  useEffect(() => {
    const fetchCompanyNames = async () => {
      try {
        const response = await axios.get('https://localhost:7119/api/CompanyDetails', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompanyNames(response.data.$values);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingCompanies(false);
      }
    };

    if (show) {
      fetchCompanyNames();
      setFormData({ ...profile });
    }
  }, [show, token, profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      FirstName:formData.firstName,
      LastName:formData.lastName,
      Email:formData.email,
      IsThirdParty:formData.isThirdParty,
      JobPosition: parseInt(formData.jobPosition), 
      CompanyId: parseInt(formData.companyId), 
    };

    await onUpdate(updatedData); 
    handleClose(); 
  };

  const jobPositions = [
    { id: "0", name: "HR" },
    { id: "1", name: "Recruiter" },
    { id: "2", name: "Talent Acquisition Manager" },
    { id: "3", name: "Hiring Manager" },
  ];

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleChange}
              required
            />
          </Form.Group><br/>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleChange}
              required
            />
          </Form.Group><br/>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              required
            />
          </Form.Group><br/>
          <Form.Group controlId="jobPosition">
            <Form.Label>Job Position</Form.Label>
            <Form.Control
              as="select"
              name="jobPosition"
              value={formData.jobPosition || ''}
              onChange={handleChange}
              required
            >
              <option value="">Select Job Position</option>
              {jobPositions.map((position) => (
                <option key={position.id} value={position.id}>{position.name}</option>
              ))}
            </Form.Control>
          </Form.Group><br/>
          <Form.Group controlId="companyId">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              as="select"
              name="companyId"
              value={formData.companyId || ''}
              onChange={handleChange}
              required
            >
              <option value="">Select Company</option>
              {companyNames.map((company) => (
                <option key={company.companyId} value={company.companyId}>{company.companyName}</option>
              ))}
            </Form.Control>
          </Form.Group><br/>
          <Form.Group controlId="isThirdParty">
            <Form.Check
              type="checkbox"
              label="Third Party"
              name="isThirdParty"
              checked={formData.isThirdParty || false}
              onChange={(e) => setFormData({ ...formData, isThirdParty: e.target.checked })}
            />
          </Form.Group><br/>
          <Button variant="primary" type="submit">Save Changes</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProfileModal;
