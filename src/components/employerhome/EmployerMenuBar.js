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
import Logo from '../../assets/images/logo-trail1.png';
import Icon from '../../assets/images/profile.png';
import { Link } from 'react-router-dom';

const pages = ['Job Post','Saved Talents'];
const settings = ['View Profile', 'Logout'];

function EmployerMenuBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  return (
    <AppBar position="static" sx={{ backgroundColor: '#f5f5f5', color: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          
          <Link to="/employer">
            <img
              src={Logo}
              alt="logo"
              style={{ height: '75px', cursor: 'pointer' }}
            />
          </Link>
          
          <Box sx={{ display: 'flex', marginLeft:"30px", flexGrow: 1 }}>
            <Link to="/employer" style={{ textDecoration: 'none' }}>
              <Typography
                sx={{
                  my: 2,
                  color: '#0A3D62',
                  textTransform: 'capitalize',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  fontFamily: 'Poppins',
                  cursor: 'pointer',
                }}
              >
                Home
              </Typography>
            </Link>
          </Box>

         
            <Box sx={{marginRight:"830px"}}>
              <Button
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ my: 2, color: '#0A3D62',display: 'block', textTransform: 'capitalize', fontSize: '15px', fontWeight: 'bold', fontFamily: 'Poppins' }} // Lowercase
              >
                Talents
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
                sx={{ marginTop: '15px', fontFamily: 'Poppins', borderRadius: '25px' }} // Position the dropdown below the AppBar
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

          {/* Right Side Avatar with Dropdown */}
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

export default EmployerMenuBar;
