import React, { useEffect, useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EmployerProfileDisplay({ employerId }) {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://localhost:7119/api/Employers/${employerId}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
    fetchProfile();
  }, [employerId]);


  if (!profileData) {
    return <p>Loading profile...</p>;
  }

  return (
    <MDBContainer className="py-5">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>{profileData.companyName}</MDBCardTitle>
              <MDBCardText>
                <strong>Website: </strong> {profileData.companyWebUrl} <br />
                <strong>Description: </strong> {profileData.companyDescription} <br />
                <strong>Address: </strong> {profileData.companyAddress} <br />
                <strong>Industry: </strong> {profileData.industry} <br />
                <strong>Job Position: </strong> {Object.keys(JobPosition)[profileData.jobPosition]} <br />
                <strong>Third-Party: </strong> {profileData.isThirdParty ? 'Yes' : 'No'}
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
