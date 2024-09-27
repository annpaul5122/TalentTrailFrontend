import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Logo from '../../assets/images/logo-trail1.png';
import Icon from '../../assets/images/profile.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const pages = ['Recommended Jobs', 'Application Status', 'Saved Jobs'];
const settings = ['View Profile', 'Logout'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '25px', // Rounded corners
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // Shadow effect
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  height: '40px',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  color: '#0A3D62',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function Menubar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [searchTerm,setSearchTerm] = useState("")

  const handleSearchClick = () => {
    navigate('/jobseeker/search'); 
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#f5f5f5', color: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo Image that links to Home */}
          <Link to="/jobseeker">
            <img
              src={Logo}
              alt="logo"
              style={{ height: '75px', cursor: 'pointer' }}
            />
          </Link>

          {/* Centered Menu and Search */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
            {/* Opportunities Button with Dropdown */}
            <Box sx={{ position: 'relative' }}>
              <Button
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ my: 2, color: '#0A3D62', display: 'block', textTransform: 'capitalize' ,fontSize: '15px',fontWeight: 'bold',fontFamily: 'Poppins'}} // Lowercase
              >
                Opportunities
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ marginTop: '15px', fontFamily: 'Poppins',borderRadius: '25px'}} // Position the dropdown below the AppBar
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Search Bar */}
            <Search onClick={handleSearchClick}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search for jobs"
                sx={{fontFamily: 'Poppins'}}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(event)=>{
                  setSearchTerm(event.target.value)
                }}
                onKeyDown={(event)=>{
                  if(event.key=='Enter'){
                    console.log(searchTerm);
                      navigate("/jobseeker/jobposts",{ state: { searchTerm } })
                  }
                }}
              />
            </Search>
          </Box>

          {/* Right Side Avatar with Dropdown */}
          <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0}}>
                <Avatar alt="Profile Picture" src={Icon}/>
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Menubar;
