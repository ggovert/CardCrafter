import { Box, Typography, Button, ThemeProvider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import theme from './theme';

const FeaturesSection = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          padding: '60px 20px',
          textAlign: 'center',
          backgroundColor: 'primary.light_purple',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontFamily: 'Mina',
            fontSize: '40px',
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          CardCrafter <br />
          is here to help you!
        </Typography>

        <StarIcon
          sx={{
            position: 'absolute',
            top: '20%',
            left: '60%',
            transform: 'rotate(-20deg)',
            fontSize: 100,
            color: 'primary.yellow',
          }}
        />
        <StarIcon
          sx={{
            position: 'absolute',
            top: '10%',
            left: '-10%',
            fontSize: 600,
            color: 'rgba(29, 22, 50, 0.05)',
            transform: 'rotate(25deg)',
            zIndex: 0,
          }}
        />
        <StarIcon
          sx={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            fontSize: 400,
            color: 'rgba(29, 22, 50, 0.06)',
            transform: 'rotate(-20deg)',
            zIndex: 0,
          }}
        />

        {/* Box 1 */}
        <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems="center"
            gap={10}
            mb={4}
          >
            {/* short description */}
            <Box sx={{ textAlign: 'left', maxWidth: '500px' }}>
              <Typography
                variant="h6"
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                  fontFamily: 'Lato',
                  fontSize: '30px',
                  fontWeight: 'bold',
                }}
              >
                Study Better
              </Typography>
              <Typography variant="body1">
                Our AI-driven system extracts key concepts from your reading
                materials and converts them into smart flashcards tailored for
                effective studying.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  marginTop: 2,
                  borderRadius: '16px',
                  bgcolor: 'primary.purple',
                  '&:hover': {
                    bgcolor: 'primary.purple',
                  },
                }}
                href="/sign-up"
              >
                TRY NOW
              </Button>
            </Box>
            {/* Image */}
            <Box
              component="img"
              src="/cards.png"
              sx={{
                width: { xs: '100%', sm: '400px' },
                height: 'auto',
                borderRadius: '10%',
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.45)',
              }}
            />
          </Box>

          {/* Box 2 */}
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems="center"
            gap={10}
            mb={4}
          >
            {/* Image */}
            <Box
              component="img"
              src="/simple.png"
              sx={{
                width: { xs: '100%', sm: '400px' },
                height: 'auto',
                borderRadius: '10%',
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.45)',
              }}
            />
            {/* short description */}
            <Box sx={{ textAlign: 'right', maxWidth: '500px' }}>
              <Typography
                variant="h6"
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                  fontFamily: 'Lato',
                  fontSize: '30px',
                  fontWeight: 'bold',
                }}
              >
                Simple Text Input
              </Typography>
              <Typography variant="body1">
                Just input your text and let CardCrafter handle the rest. Get
                high-quality flashcards instantly without the hassle of manual
                creation.
              </Typography>
              <Button
                variant="contained"
                href="/sign-up"
                sx={{
                  marginTop: 2,
                  borderRadius: '16px',
                  bgcolor: 'primary.purple',
                  '&:hover': {
                    bgcolor: 'primary.purple',
                  },
                }}
              >
                TRY NOW
              </Button>
            </Box>
          </Box>

          {/* Box 3 */}
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems="center"
            gap={10}
          >
            {/* short description */}
            <Box sx={{ textAlign: 'left', maxWidth: '500px' }}>
              <Typography
                variant="h6"
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                  fontFamily: 'Lato',
                  fontSize: '30px',
                  fontWeight: 'bold',
                }}
              >
                Accessible Anywhere
              </Typography>
              <Typography variant="body1">
                Study on-the-go from any device. Whether you're in the library
                or on the bus, your flashcards are always with you.
              </Typography>
              <Button
                variant="contained"
                href="/sign-up"
                sx={{
                  marginTop: 2,
                  borderRadius: '16px',
                  bgcolor: 'primary.purple',
                  '&:hover': {
                    bgcolor: 'primary.purple',
                  },
                }}
              >
                TRY NOW
              </Button>
            </Box>
            {/* Image */}
            <Box
              component="img"
              src="/person-with-phone.png"
              sx={{
                width: { xs: '100%', sm: '400px' },
                height: 'auto',
                borderRadius: '10%',
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.45)',
              }}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default FeaturesSection;
