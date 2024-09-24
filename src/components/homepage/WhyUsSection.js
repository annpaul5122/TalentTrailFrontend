import React from "react";
import { Button, Box, Typography, Container, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import WorkIcon from '@mui/icons-material/Work';
import PaymentIcon from '@mui/icons-material/Payment';
import Logo from '../../assets/images/Logo-Talent.png';
import { useNavigate } from "react-router-dom";

const WhyUsSection = () => {

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <section id="why-us">
    <Container maxWidth="lg" sx={{ marginTop: '100px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box 
            sx={{ 
              height: '100%', 
              borderRadius: '16px', 
              backgroundColor: '#f5f5f5',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <img 
              src={Logo}
              alt="logo" 
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} 
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'center', padding: '20px' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Up your work game, it’s easy
            </Typography>
            
            <List sx={{ display: 'inline-block', textAlign: 'left' }}>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon sx={{ color: 'black', marginRight: 1 }} />
                </ListItemIcon>
                <ListItemText 
                  primary="No cost to join"
                  secondary="Register and browse talent profiles, explore projects, or even book a consultation." 
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <WorkIcon sx={{ color: 'black', marginRight: 1 }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Post a job and hire top talent" 
                  secondary="Finding talent doesn't have to be a chore. Post a job or we can search for you."
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <PaymentIcon sx={{ color: 'black', marginRight: 1 }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Work with the best—without breaking the bank"
                  secondary="Talent Trail makes it affordable to up your work without having to break the bank." 
                />
              </ListItem>
            </List>

            <Box sx={{ marginTop: '20px' }}>
              <Button variant="contained" 
                 sx={{ color: 'white',
                       backgroundColor: '#0A3D62', 
                       borderRadius: '20px', 
                       marginRight: '250px',
                       '&:hover': {
                           backgroundColor: '#083A5B' 
                       }
                 }} onClick={handleSignUpClick}>
                Sign up for free
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
    </section>
  );
};


export default WhyUsSection;