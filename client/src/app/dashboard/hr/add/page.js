"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import EmployeeForm from '../../../../components/hr/EmployeeForm';
import { createEmployee } from '../../../../services/employeeService';

export default function AddEmployeePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = async (employeeData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      await createEmployee(employeeData);
      
      // Redirect to employees list page on success
      router.push('/dashboard/hr');
    } catch (error) {
      console.error('Error creating employee:', error);
      setError(error.message || 'Failed to create employee. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <DashboardLayout title="Add Employee" description="Add a new employee to the system">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-medium text-gray-800">Add New Employee</h1>
        </div>
        
        {error && (
          <div className="px-6 pt-4">
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="p-6">
          <EmployeeForm 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
