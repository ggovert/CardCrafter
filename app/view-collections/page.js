'use client';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/firebase';
import {
  doc,
  collection,
  getDoc,
  setDoc,
  writeBatch,
  getDocs,
} from 'firebase/firestore';
import theme from '../components/theme';
import Navbar from '@/app/components/navbar';
import {
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  Container,
  Card,
  ThemeProvider,
  Box,
  Divider,
  IconButton,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Footer from '../components/footer';

// ------------- page to view all flashcards saved----------------------
export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  // get all flashcards
  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, 'users'), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        // console.log(collections); testing
        setFlashcards(collections);
      } else {
        await setDoc[(docRef, { flashcards: [] })];
      }
    }
    getFlashcards();
  }, [user]);

  // check if user or page is loaded
  if (!isLoaded || !isSignedIn) {
    return <>loading...</>;
  }
  // -------------------- event handler------------------

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  // delete a flashcard collection
  const handleDeleteClick = async (flashcardName) => {
    const confirmed = confirm(
      `You are about to delete the collection: ${flashcardName}. Are you sure?`
    );

    if (!confirmed) return;

    try {
      const batch = writeBatch(db);
      // Reference to the user doc
      const userDocRef = doc(collection(db, 'users'), user.id);
      // Get the concerned doc snapshot
      const docSnap = await getDoc(userDocRef);

      // conditions of existence and actions
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];

        // Remove the collection
        const updatedCollections = collections.filter(
          (f) => f.name !== flashcardName
        );

        // Update the user document with the new collections
        batch.set(
          userDocRef,
          { flashcards: updatedCollections },
          { merge: true }
        );

        // Ref the col of flashcards within the user's document
        const colRef = collection(db, 'users', user.id, flashcardName);
        // Delete each flashcard in the col
        const flashcardDocs = await getDocs(colRef);
        flashcardDocs.forEach((doc) => {
          batch.delete(doc.ref);
        });

        // Commit the batch
        await batch.commit();

        // Update the Flashcards arr
        setFlashcards(updatedCollections);
        // alert('Collection deleted successfully!'); test
      }
    } catch (error) {
      console.error('Error deleting collection: ', error);
      alert('There was an error deleting the collection. Please try again.');
    }
  };

  // -------------------- ui------------------
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
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              fontFamily: 'Mina',
              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: 700,
              color: 'text.darker',
              mt: 2,
            }}
          >
            Your Flashcard Collections
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Divider sx={{ bgcolor: 'primary.main', width: 800 }} />
          </Box>
          {/* display collections */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardActionArea
                    onClick={() => {
                      handleCardClick(flashcard.name);
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant="h6">{flashcard.name}</Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            width: '100%',
                          }}
                        >
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent triggering card click
                              handleDeleteClick(flashcard.name);
                            }}
                          >
                            <DeleteForeverIcon sx={{ color: 'primary.main' }} />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
