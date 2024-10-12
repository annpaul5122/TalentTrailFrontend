import React, { useEffect, useState } from 'react';
import { Button, Form, ListGroup, Row, Col, Container } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import '../../styles/viewProfile/ResumeList.css';

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const [newResume, setNewResume] = useState(null);
  const [uploading, setUploading] = useState(false);
  const seekerId = localStorage.getItem("SeekerId");
  const token = localStorage.getItem("Auth-Token");

  const fetchResumes = async () => {
    try {
      const response = await axios.get(`https://localhost:7119/api/Resumes/${seekerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResumes(response.data.$values);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };

  const handleDeleteResume = async (resumeId) => {
    try {
      await axios.delete(`https://localhost:7119/api/Resumes/${resumeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResumes(resumes.filter(resume => resume.resumeId !== resumeId));
      window.location.reload();
    } catch (error) {
      console.error('Error deleting resume:', error);
      alert("An error occurred while deleting. Try again!!!");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewResume(file);
    }
  };

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
      setUploading(false);
      return null;
    }
  };

  const handleAddResume = async () => {
    if (!newResume) return;
    
    try {
      setUploading(true);
      const fileLink = await uploadFileToGoogleDrive(newResume);

      if (!fileLink) {
        setUploading(false);
        return; 
      }
      const payload = {
        seekerId: seekerId,
        resumePath: fileLink,
      };

      const response = await axios.post('https://localhost:7119/api/Resumes', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      fetchResumes();
      setNewResume(null);
      setUploading(false);
      window.location.reload();
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert("Error occurred while uploading. Try again!!!");
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <Container className="resume-container shadow-sm bg-light p-4 rounded">
      <h5>Resume</h5>
      <p>Your resume is the first impression you make on potential employers. Craft it carefully to secure your desired job or internship.</p>

      <ListGroup className="mb-3">
        {resumes.map((resume) => (
          <ListGroup.Item key={resume.resumeId}>
            <Row>
              <Col md={8}>
                <strong>{resume.resumePath}</strong><br />
                <small>Uploaded on {new Date(resume.createdAt).toLocaleDateString()}</small>
              </Col>
              <Col md={4} className="text-end">
                <Button variant="link" onClick={() => handleDeleteResume(resume.resumeId)}>
                  <FaTrashAlt size={20} />
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div className="upload-section border p-3 rounded">
        <Form.Group controlId="formResumeUpload">
          <Form.Label>
            <strong>Add resume</strong>
          </Form.Label>
          <Form.Control
            type="file"
            accept=".doc,.docx,.rtf,.pdf"
            onChange={handleFileChange}
          />
          <Button
            variant="outline-primary"
            className="mt-2"
            onClick={handleAddResume}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Add Resume'}
          </Button>
          <p className="mt-2 text-muted">
            Supported formats: doc, docx, rtf, pdf, up to 2MB
          </p>
        </Form.Group>
      </div>
    </Container>
  );
};

export default ResumeList;
