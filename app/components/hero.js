import { Box, Typography, Button, ThemeProvider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import theme from './theme';
import React, { useRef } from 'react';

const HeroSection = () => {
  // -------------------- scroll fucntion ---------------------
  const problemSectionRef = useRef(null);
  const scrollToProblemSection = () => {
    if (problemSectionRef.current) {
      problemSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  // ----------------------- UI -------------------------------
  return (
    <ThemeProvider theme={theme}>
      {/* container */}
      <Box
        height="100vh"
        maxWidth="100wh"
        sx={{
          position: 'relative',
          // zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {/* LittleMan mask */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '50%',
            left: '60px',
            zIndex: 3,
          }}
        >
          <img src="/littleman.png" alt="Little Man" />
          {/* Star */}
          <StarIcon
            sx={{
              position: 'absolute',
              top: '-15%',
              left: '70%',
              fontSize: 50,
              color: 'primary.yellow',
              transform: 'rotate(15deg)',
            }}
          />
        </Box>

        {/* Purple ellipse */}
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: 'primary.main',
            left: '-25%',
            top: '10%',
            width: '200%',
            height: '100vh',
            borderRadius: '50%',
            transform: 'rotate(-10deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // zIndex: -1,
          }}
        ></Box>

        {/* Tagline */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt="50px"
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'primary.light_purple',
            zIndex: 4,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              textAlign: 'center',
              fontFamily: 'Mina',
              fontSize: '58px',
              fontWeight: 700,
              letterSpacing: '3px',
            }}
          >
            From Mountains of Text to <br />
            <span
              style={{
                color: theme.palette.primary.yellow,
                fontFamily: 'Mina',
              }}
            >
              Interactive{' '}
            </span>
            Flashcards and{' '}
            <span
              style={{
                color: theme.palette.primary.yellow,
                fontFamily: 'Mina',
              }}
            >
              Fun
            </span>
            !
          </Typography>
          <Button
            variant="contained"
            sx={{
              borderRadius: '16px',
              boxShadow: 'none',
              bgcolor: 'primary.purple',
              '&:hover': {
                bgcolor: 'primary.purple',
              },
              mt: 5,
            }}
            onClick={scrollToProblemSection}
          >
            -CardCrafter-
          </Button>
        </Box>
      </Box>
      {/* end of tagline */}

      {/* Container for problem section */}
      <Box
        ref={problemSectionRef}
        sx={{
          backgroundColor: 'primary.main',
          color: 'text.light',
          height: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          // mt: '-400px',
          zIndex: 0,
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          // mt="90px"
        >
          {/* heading  */}
          <Typography
            variant="h4"
            component="h2"
            mb="50px"
            sx={{
              textAlign: 'center',
              fontFamily: 'Mina',
              fontSize: '40px',
              fontStyle: 'normal',
              fontWeight: 700,
            }}
          >
            Are you a CS student who is....
          </Typography>

          {/* Circled text */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: '600px',
              padding: '60px 40px',
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                border: '2px solid white',
                borderRadius: '50%',
                transform: 'scale(1, 1)',
              }}
            />
            <Typography
              variant="body1"
              align="center"
              sx={{
                color: 'primary.light_purple',
                fontSize: '24px',
              }}
            >
              struggling with intense coding projects and heavy workloads, and
              finding it difficult to keep up with the large amounts of reading
              required for general education courses?
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default HeroSection;
