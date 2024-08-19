'use client';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Box,
  ThemeProvider,
  Paper,
  TextField,
  Typography,
  Button,
  CardActionArea,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Card,
  Container,
  Divider,
} from '@mui/material';
import { db } from '@/firebase';
import { doc, collection, getDoc, writeBatch } from 'firebase/firestore';
import theme from '../components/theme';
import Navbar from '@/app/components/navbar';
import QuizIcon from '@mui/icons-material/Quiz';
import Footer from '../components/footer';

// Generate
export default function Generate() {
  // --------------------- State Management vars -----------------------------
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // --------------------- event handler functions -----------------------------
  const handleSubmit = async () => {
    if (!text.trim()) {
      alert('Please enter some text to generate flashcards.');
      return;
    }
    // fetch data from api
    try {
      const response = await fetch('api/generate', {
        method: 'POST',
        body: text,
      });

      if (!response.ok) {
        throw new Error(
          'Failed to generate flashcards. Make sure you entered a valid topic!'
        );
      }

      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      // console.error('Error generating flashcards:', error); //testing
      alert('An error occurred while generating flashcards. Please try again.');
    }
  };

  // click on card
  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev, // keep not concerned cards the same
      [id]: !prev[id], //target card flip it
    }));
  };

  // Handle saving card modal opening and closing
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle saving cards
  const saveFlashcards = async () => {
    // check if title entered for the col.
    if (!name) {
      alert('Please enter a name');
      return;
    }

    // One time writing with batch
    const batch = writeBatch(db);
    // Get the user document reference
    const userDocRef = doc(collection(db, 'users'), user.id);
    // Get the user document snapshot
    const docsnapshot = await getDoc(userDocRef);

    // Conditions to evaluate based on doc snap existence
    if (docsnapshot.exists()) {
      const collections = docsnapshot.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert('Flashcard collection with the same name already exists.');
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    // Set individual flashcard
    const colRef = collection(db, 'users', user.id, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });
    // Commit the batch after all operations are added
    await batch.commit();
    handleClose();
    // Redirect to flashcards Collections view
    router.push('/view-collections');
  };

  // ---------------- Check if user is signed in ---------------
  useEffect(() => {
    // Ensure the auth state is loaded before redirecting
    if (isLoaded && !isSignedIn) {
      alert('Please sign up or login to access this page!');
      router.push('/sign-in');
    }
  }, [isSignedIn, isLoaded, router]);
  // If the user is not signed in, do not render the page content
  if (!isSignedIn) {
    return null;
  }

  // --------------------- UI -----------------------------
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: theme.custom.subpageBackground,
          minHeight: '100vh',
        }}
      >
        <Navbar />
        <Container>
          {/* input field */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h4"
              mb="10px"
              sx={{
                textAlign: 'center',
                fontFamily: 'Mina',
                fontSize: '32px',
                fontStyle: 'normal',
                fontWeight: 700,
                color: 'text.darker',
              }}
            >
              Generate Flashcards
            </Typography>

            <Paper sx={{ p: 4, width: '100%', bgcolor: 'primary.main' }}>
              <TextField
                value={text}
                onChange={(e) => setText(e.target.value)}
                label="Enter your text"
                fullWidth
                multiline
                rows={10}
                variant="outlined"
                sx={{
                  mb: 2,
                  color: 'text.light',
                  // Root class for the input field
                  '& .MuiOutlinedInput-root': {
                    color: 'primary.light_purple',
                    fontFamily: 'Lato',
                    // Class for the border around the input field
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.light_purple',
                      borderWidth: '1px',
                    },
                    '&.Mui-focused': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.light_purple',
                      },
                    },
                    '&:hover:not(.Mui-focused)': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.purple',
                      },
                    },
                  },
                  // Class for the label of the input field
                  '& .MuiInputLabel-outlined': {
                    color: 'text.light',
                    '&.Mui-focused': {
                      color: 'primary.light_purple',
                    },
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  sx={{ bgcolor: 'primary.purple' }}
                  onClick={handleSubmit}
                >
                  Generate Flashcards
                </Button>
              </Box>
            </Paper>
          </Box>

          {/* display flashcards */}
          {flashcards.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  textAlign: 'center',
                  fontFamily: 'Mina',
                  fontSize: '40px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                }}
              >
                Preview
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Divider sx={{ bgcolor: 'primary.main', width: 800 }} />
              </Box>
              <Grid
                container
                spacing={4}
                justifyContent="center"
                sx={{
                  mt: 4,
                }}
              >
                {flashcards.map((flashcard, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card
                      sx={{
                        width: '100%',
                        aspectRatio: '1/1',
                        backgroundColor: 'primary.yellow',
                      }}
                    >
                      <CardActionArea onClick={() => handleCardClick(index)}>
                        <CardContent
                          sx={{
                            position: 'relative',
                            perspective: '1000px',
                            padding: 0,
                          }}
                        >
                          <Box
                            sx={{
                              width: '100%',
                              overflowY: 'auto',
                              // height: 0,
                              paddingBottom: '100%',
                              position: 'relative',
                              backgroundColor: 'primary.light_purple',
                              '& > div': {
                                transition: 'transform 0.6s',
                                transformStyle: 'preserve-3d',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.3)',
                                transform: flipped[index]
                                  ? 'rotateY(180deg)'
                                  : 'rotateY(0deg)',
                              },
                              '& > div > div': {
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backfaceVisibility: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '16px',
                                boxSizing: 'border-box',
                              },
                              '& > div > div:nth-of-type(2)': {
                                transform: 'rotateY(180deg)',
                              },
                            }}
                          >
                            <div>
                              <div>
                                <QuizIcon sx={{ alignSelf: 'flex-start' }} />
                                <Typography
                                  variant="h6"
                                  component="div"
                                  sx={{ fontFamily: 'Lato' }}
                                >
                                  {flashcard.front}
                                </Typography>
                              </div>
                              <div>
                                <Typography
                                  variant="h6"
                                  component="div"
                                  sx={{ fontFamily: 'Lato' }}
                                >
                                  {flashcard.back}
                                </Typography>
                              </div>
                            </div>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Save btn */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: 4,
                }}
              >
                <Button
                  variant="contained"
                  sx={{ bgcolor: 'primary.purple', mb: '20px' }}
                  onClick={handleOpen}
                >
                  Save Cards
                </Button>
              </Box>
            </Box>
          )}
        </Container>

        {/* Dialogue when save is clicked to allow user inputs*/}
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            '& .MuiDialog-paper': {
              backgroundColor: 'primary.main',
            },
          }}
        >
          <DialogTitle sx={{ color: 'primary.light_purple' }}>
            Save FlashCards
          </DialogTitle>
          <DialogContent sx={{ color: 'primary.light_purple' }}>
            <DialogContentText sx={{ color: 'primary.light_purple', mb: 4 }}>
              Please enter a name for your flashcard collection
            </DialogContentText>
            <TextField
              margin="dense"
              label="Collection Name"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'primary.light_purple',
                  fontFamily: 'Lato',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.light_purple',
                    borderWidth: '1px',
                  },
                  '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.light_purple',
                    },
                  },
                  '&:hover:not(.Mui-focused)': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.purple',
                    },
                  },
                },
                '& .MuiInputLabel-outlined': {
                  color: 'text.light',
                  '&.Mui-focused': {
                    color: 'primary.light_purple',
                  },
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              sx={{ color: 'primary.light_purple' }}
            >
              Cancel
            </Button>
            <Button
              onClick={saveFlashcards}
              sx={{ color: 'primary.light_purple' }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
