import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1D1632',
      background: '#C5B5FD',
      purple: '#724BFE',
      light_purple: '#E7E3F8',
      yellow: '#F6D717',
    },
    text: {
      dark: '#1D1632',
      light: '#E7E3F8',
    },
  },

  custom: {
    gradientBackground:
      'linear-gradient(27deg, #1D1632, #E7E3F8, #724BFE), linear-gradient(27.24deg, rgba(0, 0, 0, 0) 58.05%, rgba(63, 15, 255, 0.2) 81.43%)',

    footergradient:
      'linear-gradient(27deg, #1D1632, #724BFE), linear-gradient(27.24deg, rgba(0, 0, 0, 0) 58.05%, rgba(63, 15, 255, 0.2) 81.43%)',

    subpageBackground:
      ' linear-gradient(to right, #B5A5F0 0%, 43.03977191448212%, #B09EF2 86.07954382896423%, 93.03977191448212%, #C5B5FD 100%);',
  },

  typography: {
    fontFamily: 'Lato, Mina, Arial, sans-serif',
    h1: {
      fontFamily: 'Mina',
    },
    h2: {
      fontFamily: 'Mina',
    },
    h3: {
      fontFamily: 'Mina',
    },
    h4: {
      fontFamily: 'Mina',
    },
    h5: {
      fontFamily: 'Mina',
    },
    h6: {
      fontFamily: 'Mina',
    },
    body1: {
      fontFamily: 'Lato',
      fontSize: '24px',
    },
  },
});

export default theme;
