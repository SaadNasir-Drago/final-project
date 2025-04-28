"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../../../components/layout/DashboardLayout';
import SecurityAlertForm from '../../../../../components/it/SecurityAlertForm';
import { getSecurityAlertById, updateSecurityAlert } from '../../../../../services/securityAlertService';

export default function EditSecurityAlertPage({ params }) {
  const router = useRouter();
  const { id } = React.use(params);
  
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchAlert = async () => {
      try {
        setIsLoading(true);
        const data = await getSecurityAlertById(id);
        console.log('Raw data received in component:', data);
        
        if (!data) {
          throw new Error('No data received from service');
        }
        
        setAlert(data);
        setError(null);
      } catch (error) {
        console.error('Error in fetchAlert:', error);
        setError(error.message || 'Failed to load security alert data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAlert();
  }, [id]);
  
  
  const handleSubmit = async (alertData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      await updateSecurityAlert(id, alertData);
      
      // Redirect to security alerts list page on success
      router.push('/dashboard/it');
    } catch (error) {
      console.error('Error updating security alert:', error);
      setError(error.message || 'Failed to update security alert. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <DashboardLayout title="Edit Security Alert" description="Edit security alert information">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (error && !alert) {
    return (
      <DashboardLayout title="Edit Security Alert" description="Edit security alert information">
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
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout title="Edit Security Alert" description="Edit security alert information">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-medium text-gray-800">Edit Security Alert</h1>
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
        {console.log('Alert dataaaaaaaaaaaaaa:', alert)}
          <SecurityAlertForm 
            initialData={alert} 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
          />
        </div>
      </div>
    </DashboardLayout>
  );
}