import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from '../../assets/images/profile.png';
import '../../styles/viewProfile/ProfileViewEmployer.css';
import EditProfileModal from './EditProfileModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { useNavigate } from 'react-router-dom';

const ProfileViewEmployer = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false); 
  const [deleteModalShow, setDeleteModalShow] = useState(false); 
  const employerId = localStorage.getItem("EmployerId");
  const token = localStorage.getItem("Auth-Token");
  const navigate=useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://localhost:7119/api/Employers/${employerId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [employerId]);

  const handleUpdateProfile = async (updatedData) => {
    try {
      const response = await axios.put(`https://localhost:7119/api/Employers/${employerId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
      alert("Update successful!");
      window.location.reload(); 
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Error updating the profile. Try again!!!");
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await axios.delete(`https://localhost:7119/api/Employers/${employerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Account deleted successfully!");
      localStorage.removeItem("EmployerId"); 
      localStorage.removeItem("Auth-Token");
      
    } catch (err) {
      console.error("Error deleting profile:", err);
      alert("Error deleting the profile. Try again!!!");
    } finally {
      setDeleteModalShow(false);
      navigate('/'); 
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container className="profile-container mt-4">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <div className="profile-section">
            <div className="profile-pic-container">
              <img
                src={Profile}
                alt="Profile Picture"
                className="rounded-circle"
              />
            </div>
            <h3>{profile.firstName} {profile.lastName}</h3>
            <p>{profile.jobPosition}</p>
            {profile.isThirdParty && <span className="badge bg-warning">Third Party</span>}
          </div>
        </Col>
        <Col md={8}>
          <Card className="shadow-sm company-details-card">
            <Card.Body>
              <h5 style={{color:"#007bff"}}>Contact Information</h5>
              <p>
                <strong>Email : </strong> {profile.email} <br />
                <strong>Job Position : </strong> {profile.jobPosition}
              </p>
              {!profile.isThirdParty && profile.companyDetails && (
                <div className="company-details">
                  <h5 style={{color:"#007bff"}}>Company Information</h5>
                  <p>
                    <strong>Company Name : </strong> {profile.companyDetails.companyName} <br />
                    <strong>Website : </strong> <a href={profile.companyDetails.companyWebUrl}>{profile.companyDetails.companyWebUrl}</a> <br />
                    <strong>Description : </strong> {profile.companyDetails.companyDescription} <br />
                    <strong>Address : </strong> {profile.companyDetails.companyAddress} <br />
                    <strong>Industry : </strong> {profile.companyDetails.industry}
                  </p>
                </div>
              )}

              <Button className="edit-btn" onClick={() => setModalShow(true)}>Edit Profile</Button>
            </Card.Body>
          </Card>
        </Col>
        <Button variant="danger" className="delete-btn" onClick={() => setDeleteModalShow(true)}>Delete Account</Button>
      </Row>

      <EditProfileModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        profile={profile}
        onUpdate={handleUpdateProfile}
      />
      
      <ConfirmDeleteModal
        show={deleteModalShow}
        handleClose={() => setDeleteModalShow(false)}
        onConfirm={handleDeleteProfile}
      /> 

    </Container>
  );
};

export default ProfileViewEmployer;
