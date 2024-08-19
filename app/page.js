'use client';
import { Box, ThemeProvider } from '@mui/material';
import theme from './components/theme';
import Navbar from './components/navbar';
import HeroSection from './components/hero';
import FeaturesSection from './components/features';
import PricingSection from './components/pricing';
import Footer from './components/footer';
import Head from 'next/head';

//page
export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: theme.custom.gradientBackground,
        }}
        width="100%"
        height="100%"
      >
        <Head>
          <title>CardCrafter</title>
          <meta
            name="description"
            content="create flashcard from your text"
          ></meta>
        </Head>
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
