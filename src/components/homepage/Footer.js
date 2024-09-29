import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

export default function Footer() {
  const buttonStyle = {
    width: '40px',
    height: '40px', 
    borderRadius: '50%', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 0, 
  };

  return (
    <MDBFooter className='bg-light text-center text-white'>
      <MDBContainer className='p-4 pb-0' style={{ marginTop: "150px" }}>
        <section className='mb-4' style={{ display: 'flex', justifyContent: 'center' }}>
          <MDBBtn
            floating
            className='m-1'
            style={{ ...buttonStyle, backgroundColor: '#3b5998' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ ...buttonStyle, backgroundColor: '#55acee' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ ...buttonStyle, backgroundColor: '#dd4b39' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='google' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ ...buttonStyle, backgroundColor: '#ac2bac' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ ...buttonStyle, backgroundColor: '#0082ca' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ ...buttonStyle, backgroundColor: '#333333' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(10, 61, 98, 0.7)' }}>
        © 2024 Copyright : 
        <Link className='text-white' to="/">
          TalentTrail.com
        </Link>
      </div>
    </MDBFooter>
  );
}
