import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Image1 from '../../assets/images/Amazon_(company)-Logo.wine.svg';
import Image2 from '../../assets/images/Google-Logo.wine.svg';
import Image3 from '../../assets/images/Microsoft-Logo.wine.svg';
import Image4 from '../../assets/images/Hexaware_Technologies-Logo.wine.svg';
import Image5 from '../../assets/images/Infosys_Consulting-Logo.wine.svg';
import Image6 from '../../assets/images/Zoho_Corporation-Logo.wine.svg';

const TopRecruiters = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: '150px', textAlign: 'center' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Trusted by 100+ companies
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '20px',
          marginTop: '20px'
        }}
      >

        <Box
          sx={{
            width: '150px',
            height: '150px',
            overflow: 'hidden',
            borderRadius: '8px',
            transition: 'transform 0.3s, filter 0.3s',
            '& img': {
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'grayscale(100%)', 
              transition: 'filter 0.3s' 
            },
            '&:hover': {
              transform: 'scale(1.05)', 
              '& img': {
                filter: 'none' 
              }
            }
          }}
        >
          <img
            src={Image1}
            alt="Top MNC"
          />
        </Box>

        <Box
          sx={{
            width: '150px',
            height: '150px',
            overflow: 'hidden',
            borderRadius: '8px',
            transition: 'transform 0.3s, filter 0.3s',
            '& img': {
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'grayscale(100%)', 
              transition: 'filter 0.3s' 
            },
            '&:hover': {
              transform: 'scale(1.05)',
              '& img': {
                filter: 'none' 
              }
            }
          }}
        >
          <img
            src={Image2} 
            alt="Top MNC"
          />
        </Box>

        <Box
          sx={{
            width: '150px',
            height: '150px',
            overflow: 'hidden',
            borderRadius: '8px',
            transition: 'transform 0.3s, filter 0.3s',
            '& img': {
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'grayscale(100%)',
              transition: 'filter 0.3s' 
            },
            '&:hover': {
              transform: 'scale(1.05)', 
              '& img': {
                filter: 'none' 
              }
            }
          }}
        >
          <img
            src={Image3} 
            alt="Top MNC"
          />
        </Box>

        <Box
          sx={{
            width: '150px',
            height: '150px',
            overflow: 'hidden',
            borderRadius: '8px',
            transition: 'transform 0.3s, filter 0.3s',
            '& img': {
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'grayscale(100%)', 
              transition: 'filter 0.3s' 
            },
            '&:hover': {
              transform: 'scale(1.05)', 
              '& img': {
                filter: 'none'
              }
            }
          }}
        >
          <img
            src={Image4}
            alt="Top MNC"
          />
        </Box>

        <Box
          sx={{
            width: '150px',
            height: '150px',
            overflow: 'hidden',
            borderRadius: '8px',
            transition: 'transform 0.3s, filter 0.3s',
            '& img': {
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'grayscale(100%)', 
              transition: 'filter 0.3s' 
            },
            '&:hover': {
              transform: 'scale(1.05)',
              '& img': {
                filter: 'none' 
              }
            }
          }}
        >
          <img
            src={Image5} 
            alt="Top MNC"
          />
        </Box>

        <Box
          sx={{
            width: '150px',
            height: '150px',
            overflow: 'hidden',
            borderRadius: '8px',
            transition: 'transform 0.3s, filter 0.3s',
            '& img': {
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'grayscale(100%)', 
              transition: 'filter 0.3s' 
            },
            '&:hover': {
              transform: 'scale(1.05)',
              '& img': {
                filter: 'none' 
              }
            }
          }}
        >
          <img
            src={Image6} 
            alt="Top MNC"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default TopRecruiters;