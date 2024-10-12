import React, { useState } from 'react';
import { Modal, Button, Form,Alert } from 'react-bootstrap';
import axios from 'axios'

const EditProfileModal = ({ show, handleClose, formData, handleInputChange, handleSubmit }) => {
  const [newEducation, setNewEducation] = useState({ degree: '', institution: '', passOutYear: '' });
  const [newCertification, setNewCertification] = useState({ certificationName: '', certificatePicturePath: '', dateIssued: '' });

  const [newEducations, setNewEducations] = useState([]);
  const [newCertifications, setNewCertifications] = useState([]);
  const [newCertificationFile, setNewCertificationFile] = useState(null);

  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const uploadFileToGoogleDrive = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('https://localhost:7119/api/FileUpload/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      return response.data.fileLink; 
    } catch (error) {
      console.error('Error uploading file to Google Drive:', error);
      return null;
    }
  };

  const handleAddEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      setNewEducations([...newEducations, newEducation]);
      setNewEducation({ degree: '', institution: '', passOutYear: '' });
      setAlertMessage('Education added successfully!');
      setShowAlert(true);

      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleAddCertification = async () => {
    if (newCertification.certificationName && newCertificationFile) {
      const fileLink = await uploadFileToGoogleDrive(newCertificationFile);
      if (fileLink) {
        setNewCertifications([...newCertifications, {
          ...newCertification,
          certificatePicturePath: fileLink, 
        }]);
      setNewCertification({ certificationName: '', certificatePicturePath: '', dateIssued: '' });
      setNewCertificationFile(null); 
      setAlertMessage('Certification added successfully!');
      setShowAlert(true);

      setTimeout(() => setShowAlert(false), 3000);
    } else {
      setAlertMessage('Error uploading certification image.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
   }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSubmit({
      ...formData,
      educations: newEducations.map(edu => ({
        educationId: 0, 
        degree: edu.degree,
        institution: edu.institution,
        passOutYear: parseInt(edu.passOutYear),
      })),
      certifications: newCertifications.map(cert => ({
        certificationId: 0, 
        certificationName: cert.certificationName,
        certificatePicturePath: cert.certificatePicturePath,
        dateIssued: cert.dateIssued,
      }))
    });
  };

  return (
    <Modal show={show} onHide={handleClose} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {showAlert && <Alert variant="success">{alertMessage}</Alert>}
        <Form onSubmit={handleSubmitForm}>
          {/* Basic Information Fields */}
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </Form.Group><br />
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </Form.Group><br />
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group><br />
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </Form.Group><br />
          <Form.Group controlId="formProfileSummary">
            <Form.Label>Profile Summary</Form.Label>
            <Form.Control
              as="textarea"
              name="profileSummary"
              value={formData.profileSummary}
              onChange={handleInputChange}
            />
          </Form.Group><br />
          <Form.Group controlId="formExperience">
            <Form.Label>Experience</Form.Label>
            <Form.Control
              as="textarea"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
            />
          </Form.Group><br />
          <Form.Group controlId="formSkills">
            <Form.Label>Skills</Form.Label>
            <Form.Control
              as="textarea"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
            />
          </Form.Group><br />
          <Form.Group controlId="formLanguagesKnown">
            <Form.Label>Languages Known</Form.Label>
            <Form.Control
              as="textarea"
              name="languagesKnown"
              value={formData.languagesKnown}
              onChange={handleInputChange}
            />
          </Form.Group><br />

          <h5>New Education</h5><br />
          <Form.Group controlId="formDegree">
            <Form.Label>Degree</Form.Label>
            <Form.Control
              type="text"
              value={newEducation.degree}
              onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
            />
          </Form.Group><br />
          <Form.Group controlId="formInstitution">
            <Form.Label>Institution</Form.Label>
            <Form.Control
              type="text"
              value={newEducation.institution}
              onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
            />
          </Form.Group><br />
          <Form.Group controlId="formPassoutYear">
            <Form.Label>Passout Year</Form.Label>
            <Form.Control
              type="text"
              value={newEducation.passOutYear}
              onChange={(e) => setNewEducation({ ...newEducation, passOutYear: e.target.value })}
            />
          </Form.Group><br />
          <Button variant="secondary" onClick={handleAddEducation}>Add Education</Button><br />

          <h5 style={{ marginTop: '20px' }}>New Certifications</h5><br />
          <Form.Group controlId="formCertificationName">
            <Form.Label>Certification Name</Form.Label><br />
            <Form.Control
              type="text"
              value={newCertification.certificationName}
              onChange={(e) => setNewCertification({ ...newCertification, certificationName: e.target.value })}
            />
          </Form.Group><br />
          <Form.Group controlId="formCertificationFile">
            <Form.Label>Upload Certificate</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setNewCertificationFile(e.target.files[0])}
            />
          </Form.Group><br />
          <Form.Group controlId="formCertificationDateIssued">
            <Form.Label>Date Issued</Form.Label>
            <Form.Control
              type="date"
              value={newCertification.dateIssued}
              onChange={(e) => setNewCertification({ ...newCertification, dateIssued: e.target.value })}
            />
          </Form.Group><br />
          <Button variant="secondary" onClick={handleAddCertification}>Add Certification</Button><br />

          <Button variant="primary" type="submit" className="mt-3">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProfileModal;
