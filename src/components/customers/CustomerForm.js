// src/components/customers/CustomerForm.js
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CustomerForm = ({ onSubmit, initialData = {} }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: initialData.first_name || '',
    last_name: initialData.last_name || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    gender: initialData.gender || '',
    secondary_phone: initialData.secondary_phone || '',
    role: initialData.role || '',
    designation: initialData.designation || '',
    customer_id: initialData.customer_id || 'AUTO-GENERATED',
    official_email: initialData.official_email || 'AUTO-GENERATED',
  });
  
  const [photo, setPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user makes changes
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, photo: 'File size must be less than 2MB' }));
        return;
      }
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, photo: 'Only JPG, JPEG, and PNG files are allowed' }));
        return;
      }
      
      setPhoto(file);
      setErrors(prev => ({ ...prev, photo: null }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData, photo);
      router.push('/dashboard/customers');
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Handle validation errors from the server
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        // Set a general error
        setErrors({ general: error.message || 'Failed to save customer. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {errors.general && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {errors.general}
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Photo Upload */}
        <div className="w-full md:w-1/4 flex flex-col items-center">
          <div className="w-36 h-36 rounded-full bg-gray-100 flex items-center justify-center mb-4 overflow-hidden">
            {photo ? (
              <img 
                src={URL.createObjectURL(photo)} 
                alt="Customer preview" 
                className="h-full w-full object-cover"
              />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </div>
          <label className="cursor-pointer text-sm text-purple-600 mb-6">
            <input 
              type="file" 
              accept="image/jpeg,image/png,image/jpg" 
              className="hidden"
              onChange={handlePhotoChange}
            />
            Upload photo
          </label>
          
          {errors.photo && (
            <p className="text-sm text-red-600 mb-2">{errors.photo}</p>
          )}
          
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Allowed format</p>
            <p className="text-sm font-medium mb-4">JPG, JPEG, and PNG</p>
            
            <p className="text-sm text-gray-600 mb-1">Max file size</p>
            <p className="text-sm font-medium">2MB</p>
          </div>
        </div>
        
        {/* Right Column - Form Fields */}
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">First name</label>
              <input 
                type="text" 
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter first name"
                className={`w-full px-3 py-2 border ${errors.first_name ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600`}
              />
              {errors.first_name && (
                <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>
              )}
            </div>
            
            {/* Last Name */}
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
              <input 
                type="text" 
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter last name"
                className={`w-full px-3 py-2 border ${errors.last_name ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600`}
              />
              {errors.last_name && (
                <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>
              )}
            </div>
            
            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={`w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
              <input 
                type="tel" 
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
            
            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <div className="relative">
                <select 
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.gender ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 appearance-none`}
                >
                  <option value="" disabled>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                )}
              </div>
            </div>
            
            {/* Second Phone Number */}
            <div>
              <label htmlFor="secondary_phone" className="block text-sm font-medium text-gray-700 mb-1">Secondary phone</label>
              <input 
                type="tel" 
                id="secondary_phone"
                name="secondary_phone"
                value={formData.secondary_phone}
                onChange={handleChange}
                placeholder="Enter secondary phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
              />
            </div>
            
            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <div className="relative">
                <select 
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 appearance-none"
                >
                  <option value="" disabled>Select role</option>
                  <option value="regular">Regular Customer</option>
                  <option value="vip">VIP Customer</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="healthcare">Healthcare Provider</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Designation */}
            <div>
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <div className="relative">
                <select 
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 appearance-none"
                >
                  <option value="" disabled>Select designation</option>
                  <option value="individual">Individual</option>
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Nurse</option>
                  <option value="pharmacist">Pharmacist</option>
                  <option value="hospital">Hospital</option>
                  <option value="clinic">Clinic</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Customer ID */}
            <div>
              <label htmlFor="customer_id" className="block text-sm font-medium text-gray-700 mb-1">Customer ID</label>
              <input 
                type="text" 
                id="customer_id"
                name="customer_id"
                value={formData.customer_id}
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none"
                readOnly
              />
            </div>
            
            {/* Official Email */}
            <div>
              <label htmlFor="official_email" className="block text-sm font-medium text-gray-700 mb-1">Official email</label>
              <input 
                type="email" 
                id="official_email"
                name="official_email"
                value={formData.official_email}
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer with Button */}
      <div className="mt-8 flex justify-end">
        <button 
          type="button" 
          onClick={() => router.back()}
          className="px-6 py-2 mr-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition flex items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Add Customer'
          )}
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
