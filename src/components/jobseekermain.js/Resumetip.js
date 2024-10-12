import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

export default function Resumetip() {
  return (
    <MDBContainer fluid className="d-flex justify-content-center align-items-center" style={{ height: '80vh', marginTop:'-50px' }}>
      <MDBRow className="w-50 mt-4" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '15px', overflow: 'hidden', backgroundColor: '#fff' }}>
        <MDBCol md="12" className="p-0 d-flex justify-content-center align-items-center">
          <iframe
            width="100%"
            height="315px"
            src="https://www.youtube.com/embed/KD_oQk0zxsU"
            title="7 Resume Tips to Get You Hired"
            frameBorder="0"
            allowFullScreen
            style={{ borderRadius: '15px', maxWidth: '600px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
          ></iframe>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
