// components/Navbar.tsx
'use client';

import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { AuthContext } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            LinesJobs
          </Link>
        </Typography>
        {user ? (
          <>
            <Button color="inherit" component={Link} href="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} href="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} href="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
