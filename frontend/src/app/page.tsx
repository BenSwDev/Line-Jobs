// app/page.tsx
'use client';

import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box mt={5} textAlign="center">
        <Typography variant="h3" gutterBottom>
          Welcome to LinesJobs
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Your platform to find the best jobs tailored for you.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
