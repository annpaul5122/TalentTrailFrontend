import React from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import Logo from '../../assets/images/Logo-Talent.png';
import '../../styles/signup/Header.css'
import { Link } from 'react-router-dom';

export default function Header({userType}) {
  const displayText =
    userType === 'Client'
      ? { question: 'Looking for work?', action: 'Apply as Jobseeker',link: '/signup/jobseeker' }
      : { question: 'Here to hire talent?', action: 'Apply as Client',link: '/signup/client' };
  return (
    <>
          <div className='wrap-div'>
          <MDBNavbarBrand>
            <Link to="/">
            <img style={{margin:"20px"}}
              src={Logo}
              height='30'
              alt=''
              loading='lazy'
            />
            </Link>
          </MDBNavbarBrand>
          <div className='header-nav-work'>
          <span className='navbar-text' >{displayText.question}</span>
          <Link to={displayText.link} className='nav-link' style={{ marginLeft: '10px', color: '#0A3D62' }}>
            {displayText.action}
          </Link>
          </div>
          </div>
    </>
  );
}
