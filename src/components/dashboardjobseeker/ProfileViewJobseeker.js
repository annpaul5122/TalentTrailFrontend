import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileImage from '../../assets/images/profile.png'; 
import '../../styles/viewProfile/ProfileViewJobseeker.css'; 
import EditProfileModal from './EditProfileModal';
import ConfirmDeleteModal from '../dashboardemployer/ConfirmDeleteModal';
import { useNavigate } from 'react-router-dom';

const ProfileViewJobseeker = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false); 
  const [formData, setFormData] = useState({});
  const seekerId = localStorage.getItem("SeekerId");
  const token=localStorage.getItem("Auth-Token");
  const navigate=useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://localhost:7119/api/JobSeekers/${seekerId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setProfile(response.data);
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [seekerId]);

  const handleShowModal = () => setShowEditModal(true);
  const handleCloseModal = () => setShowEditModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditProfileSubmit = async (updatedProfile) => {
    console.log(updatedProfile);
    try {
      const response = await axios.put(`https://localhost:7119/api/JobSeekers/${seekerId}`, updatedProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
      handleCloseModal(); 
      alert("Update successful!");
      window.location.reload();
    } catch (err) {
      setError(err.message);
      alert("Error updating the profile. Try again!!!");
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await axios.delete(`https://localhost:7119/api/JobSeekers/${seekerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Account deleted successfully!");
      localStorage.removeItem("SeekerId"); 
      localStorage.removeItem("Auth-Token");
      
    } catch (err) {
      console.error("Error deleting profile:", err);
      alert("Error deleting profile. Try again!!!");
    } finally {
      setDeleteModalShow(false);
      navigate('/'); 
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container className="profile-view-container">
      <Row className="justify-content-center text-center">
        <Col md={12}>
          <div className="profile-pic-container">
            <img 
              src={ProfileImage} 
              alt="Profile" 
              className="profile-image" 
              style={{ width: '150px', height: '150px' }} 
            />
          </div>
          <h3 className="profile-name">{profile.firstName} {profile.lastName}</h3>
          <p>{profile.profileSummary}</p>
          <p>
            <strong>Email:</strong> {profile.email} <br />
            <strong>Phone:</strong> {profile.phoneNumber}
          </p>
        </Col>
      </Row>

      <Card className="mt-5 shadow-sm">
        <Card.Body>
          <Row>
            <Col md={12}>
              <h5 className="profile-subheading">Resumes</h5>
              <ul className="profile-list">
                {profile.resumePath.$values.map((resume, index) => (
                  <li key={index} className="profile-list-item">{resume}</li>
                ))}
              </ul>
            </Col>
            <Col md={12}>
              <h5 className="profile-subheading">Educations</h5>
              <ul className="profile-list">
                {profile.educations.$values.map((edu, index) => (
                  <li key={index} className="profile-list-item">
                    {edu.degree} from {edu.institution} (Year: {edu.passOutYear})
                  </li>
                ))}
              </ul>
            </Col>
            <Col md={12}>
              <h5 className="profile-subheading">Certifications</h5>
              <ul className="profile-list">
                {profile.certifications.$values.map((cert, index) => (
                  <li key={index} className="profile-list-item">
                    {cert.certificationName} - {cert.certificatePicturePath} (Issued: {new Date(cert.dateIssued).toLocaleDateString()})
                  </li>
                ))}
              </ul>
            </Col>
            <Col md={12}>
              <h5 className="profile-subheading">Experience</h5>
              <p>{profile.experience}</p>
              <h5 className="profile-subheading">Skills</h5>
              <p>{profile.skills}</p>
              <h5 className="profile-subheading">Languages Known</h5>
              <p>{profile.languagesKnown}</p>
            </Col>
            <Col md={12}>
              <Button className="edit-btn" onClick={handleShowModal}>Edit Profile</Button>
            </Col>

          </Row>
        </Card.Body>
      </Card>
     <center> <Button variant="danger" className="delete-btn" onClick={() => setDeleteModalShow(true)}>Delete Account</Button></center>

      <EditProfileModal
        show={showEditModal}
        handleClose={handleCloseModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleEditProfileSubmit}
      />

     <ConfirmDeleteModal
        show={deleteModalShow}
        handleClose={() => setDeleteModalShow(false)}
        onConfirm={handleDeleteProfile}
      /> 

    </Container>
  );
};

export default ProfileViewJobseeker;
