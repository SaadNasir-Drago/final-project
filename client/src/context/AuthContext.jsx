'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { loginUser, registerUser, getCurrentUser } from '@/services/api';

// Create the context with default values
const AuthContext = createContext({
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  createUser: async () => {}, // Add this new function to the context defaults
  isAuthenticated: false,
});

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Handle client-side mounting to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First try to get user data from user_data cookie
        const userDataCookie = Cookies.get('user_data');
        
        if (userDataCookie) {
          // Parse the cookie data
          const userData = JSON.parse(userDataCookie);
          setUser(userData);
        } else {
          // If no user_data cookie, check for token and fetch from API
          const token = Cookies.get('token');
          if (token) {
            try {
              const userData = await getCurrentUser();
              setUser(userData);
              
              // Save user ID and role to cookie
              if (userData && userData.id && userData.role) {
                Cookies.set('user_data', JSON.stringify({
                  id: userData.id,
                  role: userData.role
                }), { 
                  expires: 7,
                  sameSite: 'strict',
                  secure: process.env.NODE_ENV === 'production'
                });
              }
            } catch (err) {
              console.error('Failed to fetch user data:', err);
              Cookies.remove('token');
              Cookies.remove('user_data');
            }
          }
        }
      } catch (err) {
        console.error('Error checking authentication:', err);
        Cookies.remove('token');
        Cookies.remove('user_data');
      } finally {
        setLoading(false);
      }
    };

    if (mounted) {
      checkAuth();
    }
  }, [mounted]);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { user, token } = await loginUser({ email, password });
      
      // Set token cookie
      Cookies.set('token', token, { 
        expires: 7,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });
      
      // Set user data cookie with ID and role
      if (user && user.id && user.role) {
        Cookies.set('user_data', JSON.stringify({
          id: user.id,
          role: user.role
        }), { 
          expires: 7,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production'
        });
      }
      
      setUser(user);
      
      // Redirect based on role
      if (user.role === 'Admin') {
        router.push('/dashboard');
      } else {
        router.push('/dashboard');
      }
      
      return user;
    } catch (err) {
      setError(err.message || 'Failed to login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Registering with data:', userData);
      const response = await registerUser(userData);
      console.log('Registration response:', response);
      
      // Check if response has the expected structure
      if (!response || !response.token) {
        throw new Error('Invalid response from server');
      }
      
      const { user, token } = response;
      
      // Set token cookie
      Cookies.set('token', token, { 
        expires: 7,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });
      
      // Set user data cookie with ID and role
      if (user && user.id && user.role) {
        Cookies.set('user_data', JSON.stringify({
          id: user.id,
          role: user.role
        }), { 
          expires: 7,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production'
        });
      }
      
      setUser(user);
      
      // Redirect based on role
      if (user.role === 'Admin') {
        router.push('/dashboard');
      } else {
        router.push('/dashboard');
      }
      
      return user;
    } catch (err) {
      setError(err.message || 'Failed to register');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
   // Add this new function for creating users without logging them in
   const createUser = async (userData) => {
    try {
      console.log('Creating new user:', userData);
      const response = await registerUser(userData);
      console.log('User creation response:', response);
      
      // Check if response has the expected structure
      if (!response || !response.user) {
        throw new Error('Invalid response from server');
      }
      
      // Return the created user without changing auth state or cookies
      return response.user;
    } catch (err) {
      console.error('Error creating user:', err);
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user_data'); // Also remove the user data cookie
    setUser(null);
    router.push('/login');
  };

  // Only render the provider when mounted on the client
  if (!mounted) {
    return null; // Or a simple loading indicator
  }

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    createUser, // Add the new function to the context value
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
