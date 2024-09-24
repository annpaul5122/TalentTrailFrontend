import React, { useState } from 'react';
import { FaSearch, FaBell, FaUser, FaBook, FaFileVideo, FaVolleyballBall, FaBlog, FaLeaf } from "react-icons/fa";
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
            <Link to="/employer/create" className="create-post-button">
              Create Post <span className="plus-icon">+</span>
            </Link>
          </li>
          <li><a href="/employer/createpost">
            <FaBook /> <span className="title">Books</span>
          </a></li>
          <li><a href="/employer/seepost">
            <FaFileVideo /> <span className="title">Movies</span>
          </a></li>
          <li><a href="#">
            <FaVolleyballBall /> <span className="title">Sports</span>
          </a></li>
          <li><a href="#">
            <FaBlog /> <span className="title">Blogs</span>
          </a></li>
          <li><a href="#">
            <FaLeaf /> <span className="title">Nature</span>
          </a></li>
        </ul>
      </div>

      {/* Main Content Area */}
      
    </div>
  );
};

export default PostSideBar;
