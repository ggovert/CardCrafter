'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useSearchParams } from 'next/navigation';
import {
  Container,
  Typography,
  ThemeProvider,
  Alert,
  CircularProgress,
  Box,
  Paper,
  Button,
} from '@mui/material';
import theme from '../components/theme';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const PaymentResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return;

      try {
        const response = await fetch(
          `/api/checkout_session?session_id=${session_id}`
        );
        const sessionData = await response.json();

        if (response.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error || 'An unexpected error occurred.');
        }
      } catch (err) {
        console.error(err);
        setError(
          'An error occurred while processing your request. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutSession();
  }, [session_id]);

  if (loading) {
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
          <Navbar />

          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              textAlign: 'center',
              padding: 2,
            }}
          >
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Processing your payment...
            </Typography>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            background: theme.custom.subpageBackground,
            minHeight: '100vh',
          }}
        >
          <Container maxWidth="100vw" sx={{ textAlign: 'center', mt: 4 }}>
            <Alert severity="error">{error}</Alert>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }

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
        <Navbar />

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
          <Box position="absolute" top={130} left={20}>
            <Button variant="contained" href="/">
              Back to Home
            </Button>
          </Box>

          {session.payment_status === 'paid' ? (
            <Paper
              elevation={24}
              sx={{
                p: 4,
                maxWidth: 'sm',
                width: '100%',
                backgroundColor: 'primary.main',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography color="text.light" fontWeight="bold" variant="h6">
                Thank you for your purchase!
                <br />
              </Typography>
              <Box mt={2}>
                <Typography color="text.light">
                  Your payment has been successfully processed.
                </Typography>
                <Typography color="primary.purple" m="5px">
                  🥳 Go Ace your Exams !📚
                </Typography>
              </Box>
            </Paper>
          ) : (
            <Paper
              elevation={24}
              sx={{
                p: 4,
                maxWidth: 'sm',
                width: '100%',
                backgroundColor: 'primary.main',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography color="text.light" variant="h6">
                Payment Failed <SentimentVeryDissatisfiedIcon />
              </Typography>
              <Box mt={2}>
                <Typography color="text.light">
                  Unfortunately, your payment could not be processed. Please,
                  try again later!
                </Typography>
              </Box>
            </Paper>
          )}
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default PaymentResultPage;
