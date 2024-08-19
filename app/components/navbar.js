import { AppBar, Toolbar, Button, Box, ThemeProvider } from '@mui/material';
import theme from './theme';
import {
  SignedIn,
  SignedOut,
  UserButton,
  isSignedIn,
  useAuth,
} from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Navbar = () => {
  // ---------------------- event handler functions ----------------
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const handleRedirectLoginPage = () => {
    router.push('/sign-in');
  };
  const handleRedirectSingupPage = () => {
    router.push('/sign-up');
  };

  const handleRedirectViewCollections = () => {
    router.push('/view-collections');
  };

  const handleRedirectGenerateCards = () => {
    router.push('/generateCards');
  };
  const handleRedirectFeedback = () => {
    router.push('/feedback');
  };
  // ---------------------- redirect if signed in ------------------
  useEffect(() => {
    if (isSignedIn) {
      const hasRedirected = localStorage.getItem('hasRedirected');

      // ensure that redirection to gen page only happens for first time sign-in/up
      if (!hasRedirected) {
        router.push('/generateCards');
        localStorage.setItem('hasRedirected', 'true');
      }
    }
  }, [isSignedIn, router]);

  // ---------------------- Nav bar UI -----------------------
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box>
              <img
                src="/logo.png"
                width={207}
                height={71}
                alt="logo card crafter"
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              flexGrow={1}
              justifyContent="flex-end"
            >
              <SignedOut>
                <Button
                  variant="contained"
                  sx={{ borderRadius: '16px', boxShadow: 'none' }}
                  onClick={handleRedirectSingupPage}
                >
                  Sign up
                </Button>
                <Button onClick={handleRedirectLoginPage}>Log in</Button>
                {/* for visitors */}
                <Button href="/contact">Contact</Button>
              </SignedOut>

              {/* Show these buttons only when user  */}
              <SignedIn>
                <Button
                  variant="outlined"
                  sx={{ borderRadius: '16px', boxShadow: 'none' }}
                  onClick={handleRedirectGenerateCards}
                >
                  +Create
                </Button>
                <Button onClick={handleRedirectViewCollections}>
                  Flashcards
                </Button>
                <Button onClick={handleRedirectFeedback}>Feedback</Button>
                {/* If signed in, you wanna have user button */}
                <UserButton></UserButton>
              </SignedIn>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
