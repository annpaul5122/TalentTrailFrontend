import React, { useState,useEffect} from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, IconButton } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import '../../styles/jobseekerprofile/Seekerprofile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileForm = ({userId}) => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    phone: '',
    profileSummary: '',
    experience: '',
    skills: '',
    languages: '',
    education: [],
    certificates: [],
    resumes: []
  });

  const [openEducationDialog, setOpenEducationDialog] = useState(false);
  const [openCertificateDialog, setOpenCertificateDialog] = useState(false);

  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    passedOutYear: ''
  });

  const [newCertificate, setNewCertificate] = useState({
    name: '',
    image: null,
    dateIssued: ''
  });

  useEffect(() => {

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

    fetchUserDetails();
  }, [userId]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onEducationChange = (e) => {
    const { name, value } = e.target;
    setNewEducation({ ...newEducation, [name]: value });
  };

  const onCertificateChange = (e) => {
    const { name, value } = e.target;
    setNewCertificate({ ...newCertificate, [name]: value });
  };

  const handleCertificateImageChange = (e) => {
    const file = e.target.files[0];
    setNewCertificate({ ...newCertificate, image: file });
  };

  const handleAddEducation = () => {
    if (newEducation.degree && newEducation.institution && newEducation.passedOutYear) {
      setFormValue((prev) => ({
        ...prev,
        education: [...prev.education, newEducation]
      }));
      setNewEducation({ degree: '', institution: '', passedOutYear: '' });
      setOpenEducationDialog(false);
    }
  };

  const handleAddCertificate = () => {
    if (newCertificate.name && newCertificate.dateIssued && newCertificate.image) {
      setFormValue((prev) => ({
        ...prev,
        certificates: [...prev.certificates, newCertificate]
      }));
      setNewCertificate({ name: '', image: null, dateIssued: '' });
      setOpenCertificateDialog(false);
    }
  };

  const handleResumeUpload = (e) => {
    const files = e.target.files;
    const resumePaths = Array.from(files).map((file) => file.name);
    setFormValue((prev) => ({
      ...prev,
      resumes: [...prev.resumes, ...resumePaths]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = {
      jobSeeker: {
        UserId: userId, 
        PhoneNumber: formValue.phone,
        ProfileSummary: formValue.profileSummary,
        Experience: formValue.experience,
        Skills: formValue.skills,
        LanguagesKnown: formValue.languages,
      },
      resumePaths: formValue.resumes,
      educations: formValue.education.map(edu => ({
        Degree: edu.degree,
        Institution: edu.institution,
        PassOutYear: parseInt(edu.passedOutYear),
      })),
      certifications: formValue.certificates.map(cert => ({
        CertificationName: cert.name,
        CertificatePicturePath: cert.image ? URL.createObjectURL(cert.image) : null,
        DateIssued: cert.dateIssued,
      })),
    };

  
    try {
      const response = await axios.post('https://localhost:7119/api/JobSeekers/ProfileCreation',profileData);
      console.log('Profile created successfully:', response.data);
      if (response.status === 200) {
        const seekerId = response.data.seekerId;
        console.log("Seeker ID:", seekerId);
        localStorage.setItem("SeekerId", seekerId); 
        navigate('/jobseeker/home');
    }
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  return (
    <div className="form-container">
      <h3 style={{marginTop:"20px",marginBottom:"30px"}}>Create Profile</h3>
      <form onSubmit={handleSubmit}>
        
      <div className="form-field">
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formValue.firstName}
            readOnly
            required
          />
        </div>

        <div className="form-field">
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formValue.lastName}
            readOnly
            required
          />
        </div>

        <div className="form-field">
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formValue.email}
            readOnly
            required
          />
        </div>

        <div className="form-field">
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={formValue.phone}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-field">
          <TextField
            fullWidth
            label="Profile Summary (Optional)"
            name="profileSummary"
            value={formValue.profileSummary}
            onChange={onChange}
            multiline
            rows={3}
          />
        </div>

        <div className="form-field">
          <TextField
            fullWidth
            label="Experience (Optional)"
            name="experience"
            value={formValue.experience}
            onChange={onChange}
            multiline
            rows={1}
          />
        </div>

        <div className="form-field">
          <TextField
            fullWidth
            label="Skills (Optional)"
            name="skills"
            value={formValue.skills}
            onChange={onChange}
          />
        </div>

        <div className="form-field">
          <TextField
            fullWidth
            label="Languages Known (Optional)"
            name="languages"
            value={formValue.languages}
            onChange={onChange}
          />
        </div>

        {/* Education Section */}
        <div className="section-header">
          <h6 style={{fontWeight:"bold"}}>Education</h6>
          <IconButton onClick={() => setOpenEducationDialog(true)}>
            <AddIcon />
          </IconButton>
        </div>
        <div>
          {formValue.education.length > 0 &&
            formValue.education.map((edu, index) => (
              <div key={index} className="education-entry">
                {edu.degree} from {edu.institution} (Passed out: {edu.passedOutYear})
              </div>
            ))}
        </div>

        {/* Certificate Section */}
        <div className="section-header">
          <h6 style={{fontWeight:"bold"}}>Certificates</h6>
          <IconButton onClick={() => setOpenCertificateDialog(true)}>
            <AddIcon />
          </IconButton>
        </div>
        <div>
          {formValue.certificates.length > 0 &&
            formValue.certificates.map((cert, index) => (
              <div key={index} className="certificate-entry">
                {cert.name} (Issued on: {cert.dateIssued})
                <br />
                <img
                  src={URL.createObjectURL(cert.image)}
                  alt={cert.name}
                  className="certificate-preview"
                />
              </div>
            ))}
        </div>

        {/* Resume Section */}
        <div className="form-field">
          <h6 style={{fontWeight:"bold"}}>Resume</h6>
          <input type="file" multiple onChange={handleResumeUpload} style={{ marginTop: '10px'}}/>
          <div>
            {formValue.resumes.length > 0 &&
              formValue.resumes.map((resume, index) => (
                <div key={index} className="resume-entry">
                  {resume}
                </div>
              ))}
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button type="submit" variant="contained" style={{backgroundColor:"#0A3D62",margin:"20px auto",padding:"10px 20px",borderRadius:"25px",fontSize:"14px",width:"30%"}}>
          Create Profile
        </Button>
        </div>
      </form>

      {/* Education Dialog */}
      <Dialog open={openEducationDialog} onClose={() => setOpenEducationDialog(false)} PaperProps={{
    style: {
      marginTop: '30px',
      marginBottom: '30px',
      borderRadius: '15px' // Rounded corners
    }
  }}>
        <DialogTitle style={{marginBottom:"10px"}}>Add Education</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Degree"
            name="degree"
            value={newEducation.degree}
            onChange={onEducationChange}
            style={{ marginBottom: '20px' }}
          />
          <TextField
            fullWidth
            label="Institution"
            name="institution"
            value={newEducation.institution}
            onChange={onEducationChange}
            style={{ marginBottom: '20px' }}
          />
          <TextField
            fullWidth
            label="Passed Out Year"
            name="passedOutYear"
            value={newEducation.passedOutYear}
            onChange={onEducationChange}
            style={{ marginBottom: '20px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEducationDialog(false)} color="#0A3D62" style={{marginRight:"20px",marginBottom:"30px"}}>
            Cancel
          </Button>
          <Button onClick={handleAddEducation} variant="contained" style={{backgroundColor:"#0A3D62",marginRight:"30px",marginBottom:"30px"}}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Certificate Dialog */}
      <Dialog open={openCertificateDialog} onClose={() => setOpenCertificateDialog(false)} PaperProps={{
    style: {
      marginTop: '30px',
      marginBottom: '30px',
      borderRadius: '15px' // Rounded corners
    }
  }}>
        <DialogTitle style={{marginBottom:"10px"}}>Add Certificate</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Certificate Name"
            name="name"
            value={newCertificate.name}
            onChange={onCertificateChange}
            style={{ marginBottom: '20px' }}
          />
          <TextField
            fullWidth
            label="Date Issued"
            name="dateIssued"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newCertificate.dateIssued}
            onChange={onCertificateChange}
            style={{ marginBottom: '20px' }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleCertificateImageChange}
            style={{ marginBottom: '20px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCertificateDialog(false)} color="#0A3D62" style={{marginRight:"20px",marginBottom:"30px"}}>
            Cancel
          </Button>
          <Button onClick={handleAddCertificate} variant="contained" style={{backgroundColor:"#0A3D62",marginBottom:"30px",marginRight:"30px"}}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfileForm;
