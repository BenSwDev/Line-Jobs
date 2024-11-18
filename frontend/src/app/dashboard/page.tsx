// app/dashboard/page.tsx

'use client';

import React, { useContext } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';

const DashboardPage: React.FC = () => {
  const { logout, user, loading } = useContext(AuthContext);

  if (loading) {
    return null; // Optionally, render a loader here
  }

  return (
    <ProtectedRoute>
      <Container maxWidth="sm">
        <Box mt={5}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" gutterBottom>
            Welcome, {user?.email}!
          </Typography>
          <Button variant="contained" color="secondary" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Container>
    </ProtectedRoute>
  );
};

export default DashboardPage;
