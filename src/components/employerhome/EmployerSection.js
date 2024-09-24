import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn } from 'mdb-react-ui-kit';
import Image from '../../assets/images/Hiring.svg'

export default function EmployerSection() {
  return (
    <MDBContainer fluid className="d-flex justify-content-center align-items-center vh-100">
      <MDBRow className="w-75" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '15px', overflow: 'hidden', backgroundColor: '#fff' }}>
        <MDBCol md="6" className="p-4" style={{marginTop:"40px"}}>
          <h1 className="display-4">Hire talent with TalentTrail</h1>
          <p className="lead">Find, engage, and hire talent on India’s leading recruitment platform.</p>
          <div className="text-primary mb-3">
            <span>Job Posting </span> | 
            <span> Resume Database </span> | 
            <span> Assisted Hiring</span>
          </div>
        </MDBCol>

        <MDBCol md="6" className="p-0">
          <img src={Image} className='d-block w-100' alt='People searching for jobs' style={{ height: '100%', objectFit: 'cover' }} />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
