import React, { useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBInputGroup,
  MDBBtn,
  MDBCheckbox,
  MDBValidation,
  MDBValidationItem,
  MDBIcon
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Illustration from '../../assets/images/login.svg';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [formValue, setFormValue] = useState({
    Email: '',
  });

  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const nav = useNavigate();

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { Email, Password } = formValue;

    if (!Email) {
      setError("Please fill the field");
      return;
    }

    try {
      const response = await axios.post("https://localhost:7119/api/Users/request-password-reset", {
        Email: Email
      });

      if(response.status===200)
      {
        alert("Reset Email has been sent. Check your email");
        nav('/login');
      }
     
    } catch (error) {
      console.log("Error caught:", error);
        console.error("Error:", error);
    }
  };

  return (
    <MDBContainer fluid className="d-flex justify-content-center align-items-center vh-100">
      <MDBRow className="w-75" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '15px', overflow: 'hidden', backgroundColor: '#fff' }}>
        
        <MDBCol md="6" className="d-none d-md-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(10, 61, 98, 0.1)' }}>
          <img src={Illustration} alt="Illustration" style={{ width: '80%', height: 'auto', borderRadius: '10px' }} />
        </MDBCol>

        <MDBCol md="6" lg="6" className="p-5">
          <MDBCard style={{ border: 'none' }}>
            <MDBCardBody>
              <MDBValidation className='row g-3' onSubmit={handleSubmit}>

                <MDBValidationItem tooltip feedback='Please provide a valid email.' invalid className='col-md-12' style={{ marginTop: '20px' }}>
                  <MDBInputGroup textBefore={<MDBIcon fas icon="envelope" />}>
                    <input
                      type='email'
                      value={formValue.Email}
                      name='Email'
                      onChange={onChange}
                      className='form-control'
                      id='validationCustomEmail'
                      placeholder='Email'
                      required
                    />
                  </MDBInputGroup>
                </MDBValidationItem>

                <div className='col-12' style={{ display: 'flex', justifyContent: 'center' }}>
                  <MDBBtn type='submit' style={{ marginTop: '20px', backgroundColor: '#0A3D62',  borderRadius: '40px',fontSize:"14px" }}>Submit</MDBBtn>
                </div>

               

              </MDBValidation>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}