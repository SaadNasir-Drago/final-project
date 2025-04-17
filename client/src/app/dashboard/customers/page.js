// src/app/dashboard/customers/page.js
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import CustomerList from '../../../components/customers/CustomerList';
import { getCustomers, deleteCustomer } from '../../../services/customerService';

export default function Customers() {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    fetchCustomers();
  }, []);
  
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data.data || []);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
      setError('Failed to load customers. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setFilter(filterValue);
    
    // Filter customers based on status
    if (filterValue === 'all') {
      fetchCustomers();
    } else {
      // You might need to adjust this to match your API's filtering capability
      const filteredCustomers = customers.filter(customer => 
        customer.status === filterValue
      );
      setCustomers(filteredCustomers);
    }
  };
  
  const handleDeleteCustomer = async (customerId) => {
    try {
      await deleteCustomer(customerId);
      // Refresh customer list after deletion
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  };
  
  const navigateToAddCustomer = () => {
    router.push('/dashboard/customers/add');
  };
  
  // For demo purposes, let's use mock data if API call hasn't completed or failed
  const mockCustomers = [
    { id: 1, first_name: 'John', last_name: 'Smith', email: 'john@example.com', phone: '(123) 456-7890', status: 'active', last_order: '2023-03-15' },
    { id: 2, first_name: 'Sarah', last_name: 'Johnson', email: 'sarah@example.com', phone: '(234) 567-8901', status: 'active', last_order: '2023-03-12' },
    { id: 3, first_name: 'Michael', last_name: 'Brown', email: 'michael@example.com', phone: '(345) 678-9012', status: 'inactive', last_order: '2023-02-28' },
    { id: 4, first_name: 'Emily', last_name: 'Davis', email: 'emily@example.com', phone: '(456) 789-0123', status: 'active', last_order: '2023-03-10' },
    { id: 5, first_name: 'David', last_name: 'Wilson', email: 'david@example.com', phone: '(567) 890-1234', status: 'active', last_order: '2023-03-05' },
  ];
  
  // Use real data if available, otherwise use mock data
  const displayCustomers = customers.length > 0 ? customers : (error ? mockCustomers : []);
  
  return (
    <DashboardLayout title="Customers" description="Manage your customer database">
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <select 
              value={filter}
              onChange={handleFilterChange}
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Customers</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <button 
            onClick={navigateToAddCustomer}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Customer
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Customers</p>
              <h3 className="text-xl font-bold text-gray-800">{displayCustomers.length}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Customers</p>
              <h3 className="text-xl font-bold text-gray-800">
                {displayCustomers.filter(c => c.status === 'active').length}
              </h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">New This Month</p>
              <h3 className="text-xl font-bold text-gray-800">
                {/* This would need actual logic to determine new customers this month */}
                {Math.floor(displayCustomers.length * 0.1)}
              </h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Customer Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <CustomerList 
          customers={displayCustomers} 
          onDelete={handleDeleteCustomer}
        />
      )}
    </DashboardLayout>
  );
}
