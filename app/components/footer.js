import { Box, Typography, ThemeProvider } from '@mui/material';

import theme from './theme';

const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          padding: '20px 0',
          textAlign: 'center',
          background: theme.custom.footergradient,
          color: 'text.light',
          // backgroundColor: 'primary.purple',
        }}
      >
        <Typography variant="body1" fontSize="16px">
          © 2024 CardCrafter. All rights reserved.
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
