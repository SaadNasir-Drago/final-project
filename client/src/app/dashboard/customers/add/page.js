// src/app/dashboard/customers/add/page.js
"use client";
import React from 'react';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import CustomerForm from '../../../../components/customers/CustomerForm';
import { createCustomer, uploadCustomerPhoto } from '../../../../services/customerService';
import { useRouter } from 'next/navigation';

export default function AddCustomer() {
  const router = useRouter();
  
  const handleSubmit = async (formData, photo) => {
    try {
      // First create the customer
      const response = await createCustomer(formData);
      
      // If photo exists and we have a customer ID, upload the photo
      if (photo && response.data && response.data.id) {
        await uploadCustomerPhoto(response.data.id, photo);
      }
      
      // Show success message or toast notification
      console.log('Customer added successfully');
      
      // Redirect to customers list
      router.push('/dashboard/customers');
    } catch (error) {
      console.error('Error adding customer:', error);
      throw error;
    }
  };
  
  return (
    <DashboardLayout title="Add Customer" description="Add a new customer to your database">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-medium text-gray-800">Add a New Customer</h1>
        </div>
        
        {/* Form Content */}
        <div className="p-6">
          <CustomerForm onSubmit={handleSubmit} />
        </div>
      </div>
    </DashboardLayout>
  );
}
