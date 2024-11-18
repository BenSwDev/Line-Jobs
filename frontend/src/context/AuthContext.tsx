// src/context/AuthContext.tsx

'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from '../utils/axios';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  email: string;
}

interface DecodedToken {
  id: string;
  exp: number;
}

interface AuthResponse {
  token: string;
  _id: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean; // Added loading state
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  loading: true, // Initialize as loading
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Manage loading state
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token);
          if (decoded.exp * 1000 < Date.now()) {
            logout();
          } else {
            // Set axios default headers
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Fetch user data from backend
            const res = await axios.get<User>('/auth/me');
            setUser(res.data);
          }
        } catch (error) {
          console.error('Invalid token or error fetching user:', error);
          logout();
        }
      }
      setLoading(false);
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post<AuthResponse>('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser({ _id: res.data._id, email: res.data.email });
      router.push('/dashboard');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const res = await axios.post<AuthResponse>('/auth/register', { email, password });
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser({ _id: res.data._id, email: res.data.email });
      router.push('/dashboard');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
