import React, { useState } from 'react';
import '../../styles/signupselection/SignupModule.css'
import employer from '../../assets/images/Employer.png'
import jobseeker from '../../assets/images/Jobseeker.png'
import { useNavigate,Link } from 'react-router-dom';

function ModuleSelection() {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleCreateAccount = () => {
    if (selectedOption === 'client') {
      navigate('/signup/client');
    } else if (selectedOption === 'jobseeker') {
      navigate('/signup/jobseeker');
    }
  };

  return (
    <div className="module-container">
      <h2>Join as a Client or Jobseeker</h2>

      <div className="module-card-options">
        <div
          className={`module-card ${selectedOption === 'client' ? 'selected' : ''}`}
          onClick={() => handleOptionChange('client')}
        >
          <div className="module-icon"><img src={employer}/></div>
          <p>I'm a client, hiring for a project</p>
        </div>
        <div
          className={`module-card ${selectedOption === 'jobseeker' ? 'selected' : ''}`}
          onClick={() => handleOptionChange('jobseeker')}
        >
          <div className="module-icon"><img src={jobseeker}/></div>
          <p>I'm a Jobseeker, looking for work</p>
        </div>
      </div>

      <button
        className="create-account-btn"
        onClick={handleCreateAccount}
        disabled={!selectedOption}
      >
        Create Account
      </button>

      <div className="module-login-link">
        <p>Already have an account? <Link to="/login" >Login</Link></p>
      </div>
    </div>
  );
}

export default ModuleSelection;