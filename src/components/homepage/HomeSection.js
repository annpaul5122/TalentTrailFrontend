import React from "react";
import '../../styles/homepage/HomeSection.css';
import home from '../../assets/images/JobHunt.svg';
import { useNavigate } from "react-router-dom";

const HomeSection = () => {

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

    return (
        <section className="home-section">
        <div className="home-content">
          <h1>Redefining Talent</h1>
          <p>Forget the old rules. </p>
          <p>Get the Best, Right Here, Right Now.</p>
          <button className="started-btn" onClick={handleSignUpClick}><span>Get Started</span></button>
        </div>
        <div className="illustration-image">
          <img src={home} alt="Talent illustration" />
        </div>
      </section>
    );
}

export default HomeSection;