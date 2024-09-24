import React from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import Logo from '../../assets/images/Logo-Talent.png'
import { Link } from 'react-router-dom';

export default function LoginHeader() {
  return (
    <>
      <MDBNavbar light bgColor='light'>
        <MDBContainer>
          <MDBNavbarBrand >
            <Link to="/">
            <img
              src={Logo}
              height='30'
              alt=''
              loading='lazy'
            />
            </Link>
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}