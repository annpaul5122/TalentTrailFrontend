import React from "react";
import '../../styles/homepage/Header.css';
import Logo from '../../assets/images/logo-trail1.png';
import { useNavigate,Link } from 'react-router-dom';

const Header = ({ onScrollToSection }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

    return(
      <header className="header">
      <div className="logo">
        <img src={Logo} alt="Talent Trail Logo" />
      </div>
      <nav className="why">
      <a href="#!" onClick={onScrollToSection}>
        Why Us?
      </a>
      </nav>
      <div className="header-buttons">
        <button className="login-btn" onClick={handleLoginClick}>Log In</button>
        <button className="signup-btn" onClick={handleSignUpClick}>Sign Up</button>
      </div>
    </header>
    );
}

export default Header;