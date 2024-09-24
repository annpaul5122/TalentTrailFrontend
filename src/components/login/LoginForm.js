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

export default function LoginForm() {
  const [formValue, setFormValue] = useState({
    Email: '',
    Password: '',
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

    if (!Email || !Password) {
      setError("Please fill in both fields");
      return;
    }

    try {
      const response = await axios.post("https://localhost:7119/api/Auth/UserAuth", {
        Email: Email,
        Password: Password,
      });
     
      const token = response.data;
      console.log("Token received:", token);
    
      localStorage.setItem("Auth-Token", token);
    
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);
    
      if (decodedToken && decodedToken.nameid) {
        const userId = decodedToken.nameid;
        console.log("User ID:", userId);

        const userRole = decodedToken.role; 
        console.log("User Role:", userRole);
    
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          if (userRole === 'Employer') {
            nav("/employer");  
          } else if (userRole === 'Job Seeker') {
            nav("/jobseeker"); 
          } else {
            nav("/not-authorized"); 
          }
        }, 2000);

      } else {
        throw new Error("Token is invalid or does not contain nameid");
      }
      
    } catch (error) {
      console.log("Error caught:", error);
    
      if (error.response && (error.response.status === 400 || error.response.status === 401)) {
        nav("/not-authorized");
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <MDBContainer fluid className="d-flex justify-content-center align-items-center vh-100">
      <MDBRow className="w-75" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '15px', overflow: 'hidden', backgroundColor: '#fff' }}>
        
        {/* Left Side - Illustration */}
        <MDBCol md="6" className="d-none d-md-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(10, 61, 98, 0.1)' }}>
          <img src={Illustration} alt="Illustration" style={{ width: '80%', height: 'auto', borderRadius: '10px' }} />
        </MDBCol>

        {/* Right Side - Form */}
        <MDBCol md="6" lg="6" className="p-5">
          <MDBCard style={{ border: 'none' }}>
            <MDBCardBody>
              <MDBValidation className='row g-3' onSubmit={handleSubmit}>
               
                {/* Email */}
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

                {/* Password */}
                <MDBValidationItem tooltip feedback='Please provide a valid password.' invalid className='col-md-12' style={{ marginTop: '20px' }}>
                  <MDBInput
                    value={formValue.Password}
                    name='Password'
                    onChange={onChange}
                    id='validationCustomPassword'
                    type='password'
                    required
                    label='Password'
                  />
                </MDBValidationItem>

                {/* Submit Button */}
                <div className='col-12' style={{ display: 'flex', justifyContent: 'center' }}>
                  <MDBBtn type='submit' style={{ marginTop: '20px', backgroundColor: '#0A3D62',  borderRadius: '40px' }}>Login</MDBBtn>
                </div>

                {showAlert && <div className="custom-alert">Login successful!</div>}

                <MDBRow className='mt-3'>
                  <MDBCol className='text-center'>
                    <span style={{ fontSize: '13px' }}>Don't have an account? </span>
                    <Link to="/signup" style={{ color: '#0A3D62', textDecoration: 'underline', fontSize: '12px' }}>Sign Up</Link>
                  </MDBCol>
                </MDBRow>

              </MDBValidation>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}