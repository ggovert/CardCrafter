'use client';
import { useState } from 'react';
import {
  Box,
  Typography,
  ThemeProvider,
  Avatar,
  Link,
  Button,
} from '@mui/material';
import theme from '../components/theme';
import NavBar from '../components/navbar';
import { useRouter } from 'next/navigation';
import Footer from '../components/footer';

export default function SignUpPage() {
  // --------------------------------- State management vars ----------------------
  const [error, setError] = useState('');
  const router = useRouter();

  // -------------------------------handle functions ----------------------
  const goBack = async () => {
    router.push('/');
  };

  //   // --------------------------------- UI ------------------------------------
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: theme.custom.subpageBackground,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Nav bar */}
        <NavBar />

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 2,
          }}
        >
          {/* Go Back Button */}
          <Box position="absolute" top={90} left={20}>
            <Button variant="contained" onClick={goBack}>
              Go Back
            </Button>
          </Box>

          {/* content */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            maxWidth="800px"
            width="100%"
            mb={4}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Mina',
                fontSize: '32px',
                fontStyle: 'normal',
                fontWeight: 700,
                color: 'text.darker',
                mt: 2,
              }}
            >
              Have a Question about CardCrafter?
            </Typography>

            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mt: 2, fontFamily: 'Lato' }}
            >
              Reach out to the team on LinkedIn.
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            maxWidth="600px"
            width="100%"
          >
            {/* Avatar boxes */}
            <Box display="flex" justifyContent="center" flexWrap="wrap">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mx={2}
              >
                <Avatar
                  alt="Developer of CardCrafter 1"
                  src="/H.JPG"
                  sx={{ width: 100, height: 100, border: '2px solid #1D1632' }}
                />
                <Typography mt={1} align="center">
                  Houlaymatou B.
                </Typography>
                <Button
                  variant="contained"
                  href="https://www.linkedin.com/in/houlaymatoub/"
                  sx={{
                    mt: 1,
                    backgroundColor: 'primary.purple',
                    color: 'text.light',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    borderRadius: '16px',
                  }}
                >
                  LinkedIn
                </Button>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mx={2}
              >
                <Avatar
                  alt="Developer of CardCrafter 2"
                  src="/g.png"
                  sx={{ width: 100, height: 100, border: '2px solid #1D1632' }}
                />
                <Typography mt={1} align="center">
                  Giovanni G.
                </Typography>
                <Button
                  variant="contained"
                  href="https://www.linkedin.com/in/giovanni-govert/"
                  sx={{
                    mt: 1,
                    backgroundColor: 'primary.purple',
                    color: 'text.light',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    borderRadius: '16px',
                  }}
                >
                  LinkedIn
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
