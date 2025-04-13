// src/app/dashboard/customers/edit/[id]/page.js
"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '../../../../../components/layout/DashboardLayout';
import CustomerForm from '../../../../../components/customers/CustomerForm';
import { getCustomerById, updateCustomer, uploadCustomerPhoto } from '../../../../../services/customerService';

export default function EditCustomer() {
  const params = useParams();
  const router = useRouter();
  const { id } = React.use(params);
  
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);
        const data = await getCustomerById(id);
        setCustomer(data.data || {});
        setError(null);
      } catch (error) {
        console.error(`Failed to fetch customer with ID ${id}:`, error);
        setError('Failed to load customer data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchCustomer();
    }
  }, [id]);
  
  const handleSubmit = async (formData, photo) => {
    try {
      // Update customer data
      await updateCustomer(id, formData);
      
      // If photo exists, upload it
      if (photo) {
        await uploadCustomerPhoto(id, photo);
      }
      
      // Redirect to customers list
      router.push('/dashboard/customers');
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  };
  
  if (loading) {
    return (
      <DashboardLayout title="Edit Customer" description="Update customer information">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (error) {
    return (
      <DashboardLayout title="Edit Customer" description="Update customer information">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
              <p>{error}</p>
              <button 
                onClick={() => router.push('/dashboard/customers')}
                className="mt-2 text-sm font-medium text-red-700 hover:text-red-900"
              >
                Return to Customers
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout title="Edit Customer" description="Update customer information">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-medium text-gray-800">
            Edit Customer: {customer?.first_name} {customer?.last_name}
          </h1>
        </div>
        
        {/* Form Content */}
        <div className="p-6">
          <CustomerForm 
            onSubmit={handleSubmit} 
            initialData={customer} 
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

