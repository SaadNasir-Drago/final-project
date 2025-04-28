'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import Button from '@/components/ui/Button';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const { login, loading } = useAuth(); // Destructure both login function and loading state

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await login(formData.email, formData.password);
      // Redirection is handled in the login function based on user role
    } catch (error) {
      setErrors({
        form: error.message || 'Failed to login. Please check your credentials.',
      });
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="px-8 py-8">
          <div className="text-center mb-6">
            <h2 className="text-gray-500 mb-1">Welcome back!</h2>
            <h1 className="text-2xl font-bold text-gray-800">Please Sign In</h1>
          </div>
          
          {errors.form && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-md text-sm">
              {errors.form}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <Input
              id="email"
              name="email"
              type="email"
              label="Email address"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              className="mb-4"
            />
            
            <PasswordInput
              id="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              className="mb-1"
            />
            
            <div className="flex justify-between items-center mb-6">
              {/* Remember me checkbox removed as per your code */}
            </div>
            
            <Button 
              type="submit" 
              variant="primary" 
              fullWidth
              disabled={loading}
              className="py-2.5"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
            
            <div className="mt-6 text-center">
              <span className="text-gray-600 text-sm">Don&apos;t have an account? </span>
              <Link href="/register" className="text-purple-600 text-sm font-medium hover:underline">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
