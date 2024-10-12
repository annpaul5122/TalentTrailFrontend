import React from 'react';
import { MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import Image from '../../assets/images/JobPostMain.svg';
import { useNavigate } from 'react-router-dom';

export default function JobPostMain() {
    const navigate= useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
        padding: '0 20px', 
        marginTop: '-70px',
      }}
    >
      <MDBRow className="w-100" style={{ display: 'flex', alignItems: 'center' }}>
        <MDBCol md="6" className="p-4">
          <h1 className="display-4">Let's hire your next great candidate.</h1>
          <MDBBtn style={{ marginTop: '30px', backgroundColor: '#0A3D64' }} onClick={()=> navigate('/employer/jobpost/createpost')}>Post a job</MDBBtn>
        </MDBCol>
        <MDBCol md="6" className="p-0">
          <img
            src={Image}
            alt="People searching for jobs"
            className="d-block w-100"
            style={{ height: '100%', objectFit: 'cover' }}
          />
        </MDBCol>
      </MDBRow>
    </div>
  );
}
