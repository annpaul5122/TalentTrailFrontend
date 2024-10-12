import React, { useState } from 'react';
import { FaPlus, FaHome,  FaBriefcase } from "react-icons/fa";
import '../../styles/jobpost/PostSideNavBar.css';
import Icon from '../../assets/images/profile.png';
import {Link,useNavigate} from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const settings = ['View Profile', 'Logout'];

const PostSideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDropDownClick = (setting) => {
    handleCloseUserMenu();
    if (setting === 'View Profile') {
      navigate('/employer/view-profile');
    }
    if (setting === 'Logout') {
      localStorage.removeItem("Auth-Token");
      localStorage.removeItem("EmployerId");
      navigate('/');
      window.location.reload();
    }
  };

  const employerId = localStorage.getItem("EmployerId");
  console.log("emp:",employerId);

  return (
    <div className={`wrapper ${isCollapsed ? "collapsed" : ""}`}>
   
      <div className="top_navbar">
        <div className="hamburger" onClick={toggleSidebar}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className="top_menu">
          <ul>
            <li>
              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Profile Picture" src={Icon} />
                </IconButton>
                <Menu
                  sx={{ mt: '45px', borderRadius: '8px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => handleDropDownClick(setting)}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </li>
          </ul>
        </div>
      </div>

      <div className="sidebar">
        <ul>
          <li>
            <a href="/employer/jobpost/createpost" className="post-button">
              <FaPlus />
              <span className="title">Create Post</span>
            </a>
          </li>
          <li><Link to={`/employer`}>
            <FaHome /> <span className="title">Home</span>
          </Link></li>
          <li><Link to={`/employer/jobpost/posts/${employerId}`}>
            <FaBriefcase /> <span className="title">Job Post</span>
          </Link></li>
          
        </ul>
      </div>

    </div>
  );
};

export default PostSideBar;
