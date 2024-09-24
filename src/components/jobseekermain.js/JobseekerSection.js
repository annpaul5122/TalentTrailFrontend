import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import Image2 from '../../assets/images/Resume.png';
import Image3 from '../../assets/images/hiring.jpg';

export default function JobseekerSection() {
  return (
    <MDBContainer fluid className="d-flex justify-content-center align-items-center vh-100">
      <MDBRow className="w-75" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '15px', overflow: 'hidden', backgroundColor: '#fff' }}>
        <MDBCol md="12" className="p-0">
          <MDBCarousel showControls showIndicators>
            <MDBCarouselItem itemId={1}>
              <img src={Image2} className='d-block w-100' alt='...' style={{ height: '500px', objectFit: 'cover' }} />
            </MDBCarouselItem>
            <MDBCarouselItem itemId={2}>
              <img src={Image3} className='d-block w-100' alt='...' style={{ height: '500px', objectFit: 'cover' }} />
            </MDBCarouselItem>
          </MDBCarousel>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
