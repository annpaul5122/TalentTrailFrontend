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
import Illustration from '../../assets/images/Sign up.svg'
import { useLocation,useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

export default function SignUpForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const userType = location.pathname.includes('client') ? 'employer' : 'jobseeker';
  const [formValue, setFormValue] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccessMessage(null);

    const apiUrl = `https://localhost:7119/api/SignUp/signup/${userType}`; 

    try {
      const response = await axios.post(apiUrl, {
        FirstName: formValue.fname,
        LastName: formValue.lname,
        Email: formValue.email,
        Password: formValue.password,
      });

      console.log(response);

      if (response.status === 200) {
        setSuccessMessage(response.data.message); 

        const userId = response.data.userId;
        
        navigate(`/login`)
      }
    } catch (error) {

      if (error.response) {
        setError(error.response.data.message || 'Something went wrong, please try again.');
      } else {
        setError('Failed to connect to the server.');
      }
    }
  };

  return (
    <MDBContainer fluid className="d-flex justify-content-center align-items-center vh-100">
      <MDBRow className="w-75" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '15px', overflow: 'hidden', backgroundColor: '#fff' }}>

        <MDBCol md="6" className="d-none d-md-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(10, 61, 98, 0.1)' }}>
          <img src={Illustration} alt="Illustration" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
        </MDBCol>

        <MDBCol md="6" lg="6" className="p-5">
          <MDBCard style={{ border: 'none' }}>
            <MDBCardBody>
              <MDBValidation className='row g-3' onSubmit={handleSubmit}>

                <MDBValidationItem tooltip className='col-md-6' feedback='Please provide a first name.' invalid>
                  <MDBInput
                    value={formValue.fname}
                    name='fname'
                    onChange={onChange}
                    id='validationCustom01'
                    required
                    label='First name'
                  />
                </MDBValidationItem>

                <MDBValidationItem tooltip className='col-md-6' feedback='Please provide a last name.' invalid>
                  <MDBInput 
                    value={formValue.lname}
                    name='lname'
                    onChange={onChange}
                    id='validationCustom02'
                    required
                    label='Last name'
                  />
                </MDBValidationItem>

                <MDBValidationItem tooltip feedback='Please provide a valid email.' invalid className='col-md-12' style={{ marginTop: '20px' }}>
                  <MDBInputGroup textBefore={<MDBIcon fas icon="envelope" />}>
                    <input
                      type='email'
                      value={formValue.email}
                      name='email'
                      onChange={onChange}
                      className='form-control'
                      id='validationCustomEmail'
                      placeholder='Email'
                      required
                    />
                  </MDBInputGroup>
                </MDBValidationItem>

                <MDBValidationItem tooltip feedback='Please provide a valid password.' invalid className='col-md-12' style={{ marginTop: '20px' }}>
                  <MDBInput
                    value={formValue.password}
                    name='password'
                    onChange={onChange}
                    id='validationCustomPassword'
                    type='password'
                    required
                    label='Password (8 or more characters)'
                  />
                </MDBValidationItem>

                <MDBValidationItem tooltip className='col-12' feedback='You must agree before submitting.' invalid style={{ marginTop: '20px' }}>
                  <MDBCheckbox label='Agree to terms and conditions' id='invalidCheck' required />
                </MDBValidationItem>

                <div className='col-12' style={{ display: 'flex', justifyContent: 'center' }}>
                  <MDBBtn type='submit' style={{ marginTop: '20px', backgroundColor: '#0A3D62',borderRadius: '40px',fontSize:'14px' }}>Create My Account</MDBBtn>
                </div>

                <MDBRow className='mt-3'>
                  <MDBCol className='text-center'>
                    <span style={{ fontSize: '13px' }}>Already have an account?   </span>
                    <Link to="/login" style={{ color: '#0A3D62', textDecoration: 'underline', fontSize: '12px' }}>Log In</Link>
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