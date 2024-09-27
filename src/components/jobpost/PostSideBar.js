import React, { useState } from 'react';
import { FaPlus, FaPencilAlt,FaSearch, FaBell, FaUser, FaBook, FaFileVideo, FaVolleyballBall, FaBlog, FaLeaf } from "react-icons/fa";
import '../../styles/jobpost/PostSideNavBar.css';
import Logo from '../../assets/images/logo-trail1.png'
import {Link} from 'react-router-dom'

const PostSideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Toggle sidebar collapse state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`wrapper ${isCollapsed ? "collapsed" : ""}`}>
      {/* Top Navbar */}
      <div className="top_navbar">
        <div className="hamburger" onClick={toggleSidebar}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className="top_menu">
          <ul>
            <li><a href="#"><FaUser /></a></li>
          </ul>
        </div>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li>
            <a href="/employer/jobpost/createpost" className="post-button">
              <FaPlus />
              <span className="title">Create Post</span>
            </a>
          </li>
          <li><a href="#">
            <FaPencilAlt /> <span className="title">Job Post</span>
          </a></li>
          <li><a href="#">
            <FaFileVideo /> <span className="title">Movies</span>
          </a></li>
        </ul>
      </div>

    </div>
  );
};

export default PostSideBar;
