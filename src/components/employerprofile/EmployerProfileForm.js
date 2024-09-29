import React, { useState, useEffect } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../styles/employerprofile/EmployerProfile.css'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBCheckbox,
  MDBValidation,
  MDBValidationItem,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobPosition = {
  HR: 0,
  Recruiter: 1,
  TalentAcquisitionManager: 2,
  HiringManager: 3,
};

export default function EmployerProfileForm({ userId }) {
    const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    companyName: '',
    companyWebUrl: '',
    companyDescription: '',
    companyLogo: '',
    companyAddress: '',
    industry: '',
    jobPosition: '',
    isThirdParty: false,
  });

  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [isCompanySelected, setIsCompanySelected] = useState(false);
  const [isJobPositionDropdownOpen, setIsJobPositionDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('https://localhost:7119/api/CompanyDetails');
        const data = response.data.$values;
        setCompanies(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7119/api/Users/details/${userId}`);
        const userData = response.data;
        setFormValue((prev) => ({
          ...prev,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
        }));
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchCompanies();
    fetchUserDetails();
  }, [userId]);

  const handleCompanyNameChange = (e) => {
    const { value } = e.target;
    setFormValue({ ...formValue, companyName: value });
    const filtered = companies.filter((company) =>
      company.companyName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCompanies(filtered);
    setIsCompanySelected(false);
  };

  const handleCompanySelect = (company) => {
    setFormValue({
        ...formValue,
        companyName: company.companyName,
        companyWebUrl: company.companyWebUrl,
        companyDescription: company.companyDescription,
        companyLogo: company.companyLogo,
        companyAddress: company.companyAddress,
        industry: company.industry,
      });
      setIsCompanySelected(true);
      setFilteredCompanies([]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValue({ ...formValue, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7119/api/Employers', {
        UserId: userId,
        JobPosition: formValue.jobPosition,
        IsThirdParty: formValue.isThirdParty,
        CompanyName: formValue.companyName,
        CompanyWebUrl: formValue.companyWebUrl,
        CompanyDescription: formValue.companyDescription,
        CompanyLogo: formValue.companyLogo,
        CompanyAddress: formValue.companyAddress,
        Industry: formValue.industry}
      );
      console.log('Profile created:', response.data);
      if (response.status === 200) {
        const employerId = response.data.employerId;
        console.log("Employer ID:", employerId);
        localStorage.setItem("employerId", employerId);
          navigate('/employer');
      }
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  // Toggle job position dropdown visibility
  const toggleJobPositionDropdown = () => {
    setIsJobPositionDropdownOpen((prev) => !prev);
  };

  // Handle job position selection
  const handleJobPositionSelect = (position) => {
    setFormValue({ ...formValue, jobPosition: position });
    setIsJobPositionDropdownOpen(false);
  };

  return (
    <MDBContainer fluid style={{ paddingBottom: '50px' }}>
      <MDBRow className="d-flex justify-content-center align-items-center vh-100">
        <MDBCol md="6">
          <MDBCard className="mb-5">
            <MDBCardBody>
              <h3 style={{ marginTop: "10px", marginBottom: "30px" }}>Create Profile</h3>
              <MDBValidation onSubmit={handleSubmit}>
                
                {/* User Details */}
                <MDBValidationItem tooltip className="mb-3" feedback="Please provide your first name." invalid>
                  <MDBInput name="firstName" value={formValue.firstName} label="First Name" readOnly required />
                </MDBValidationItem>

                <MDBValidationItem tooltip className="mb-3" feedback="Please provide your last name." invalid>
                  <MDBInput name="lastName" value={formValue.lastName} label="Last Name" readOnly required />
                </MDBValidationItem>

                <MDBValidationItem tooltip className="mb-3" feedback="Please provide your email." invalid>
                  <MDBInput name="email" value={formValue.email} label="Email" readOnly required />
                </MDBValidationItem>

                {/* Company Name Input with Dropdown */}
                <MDBValidationItem tooltip className="mb-3" feedback="Please provide a company name." invalid>
                  <div className="position-relative">
                    <MDBInput
                      name="companyName"
                      value={formValue.companyName}
                      onChange={handleCompanyNameChange}
                      label="Company Name"
                      required
                      autoComplete="off"
                    />
                    {filteredCompanies.length > 0 && (
                      <ul className="dropdown-menu show w-100" style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1 }}>
                        {filteredCompanies.map((company) => (
                          <li key={company.companyId} onClick={() => handleCompanySelect(company)}>
                            <a className="dropdown-item" href="#">
                              {company.companyName}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </MDBValidationItem>

                {/* Other Fields */}
                <MDBValidationItem tooltip className="mb-3" feedback="Please provide a company website." invalid>
                  <MDBInput
                    name="companyWebUrl"
                    value={formValue.companyWebUrl}
                    onChange={handleChange}
                    label="Company Website URL"
                    required
                    readOnly={isCompanySelected}
                  />
                </MDBValidationItem>

                <MDBValidationItem tooltip className="mb-3" feedback="Please provide a company description." invalid>
                  <MDBInput
                    name="companyDescription"
                    value={formValue.companyDescription}
                    onChange={handleChange}
                    label="Company Description"
                    required
                    readOnly={isCompanySelected}
                  />
                </MDBValidationItem>

                <MDBValidationItem tooltip className="mb-3" feedback="Please provide a logo URL." invalid>
                  <MDBInput
                    name="companyLogo"
                    value={formValue.companyLogo}
                    onChange={handleChange}
                    label="Company Logo URL"
                    required
                    readOnly={isCompanySelected}
                  />
                </MDBValidationItem>

                <MDBValidationItem tooltip className="mb-3" feedback="Please provide a company address." invalid>
                  <MDBInput
                    name="companyAddress"
                    value={formValue.companyAddress}
                    onChange={handleChange}
                    label="Company Address"
                    required
                    readOnly={isCompanySelected}
                  />
                </MDBValidationItem>

                <MDBValidationItem tooltip className="mb-3" feedback="Please provide the industry." invalid>
                  <MDBInput
                    name="industry"
                    value={formValue.industry}
                    onChange={handleChange}
                    label="Industry"
                    required
                    readOnly={isCompanySelected}
                  />
                </MDBValidationItem>

                {/* Job Position Dropdown */}
                <MDBValidationItem tooltip className="mb-3" feedback="Please select a job position." invalid>
                  <div className="position-relative">
                    <MDBInput
                      name="jobPosition"
                      value={formValue.jobPosition !== '' ? Object.keys(JobPosition)[formValue.jobPosition] : ''}
                      label="Job Position"
                      onClick={toggleJobPositionDropdown}
                      readOnly
                      required
                    />
                    {isJobPositionDropdownOpen && (
                      <ul className="dropdown-menu show w-100">
                        {Object.keys(JobPosition).map((key, index) => (
                          <li key={index} onClick={() => handleJobPositionSelect(JobPosition[key])}>
                            <a className="dropdown-item" href="#">
                              {key}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </MDBValidationItem>

                {/* Is Third Party Checkbox */}
                <MDBCheckbox
                  name="isThirdParty"
                  checked={formValue.isThirdParty}
                  onChange={handleChange}
                  label="Are you a third-party employer?"
                />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <MDBBtn type="submit" className="mt-3" style={{ backgroundColor: '#0A3D62', margin: "20px auto", padding: "10px 20px", borderRadius: "25px", fontSize: "14px", width: "30%" }}>
                    Create Profile
                  </MDBBtn>
                </div>
              </MDBValidation>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
