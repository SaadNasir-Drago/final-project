"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import SecurityAlertList from '../../../components/it/SecurityAlertList';
import { getSecurityAlerts, deleteSecurityAlert } from '../../../services/securityAlertService';

export default function SecurityAlertsPage() {
  const router = useRouter();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total: 0,
    per_page: 10,
    total_pages: 0
  });
  
  const fetchAlerts = async (page = 1, params = {}) => {
    try {
      setLoading(true);
      // Combine page and search params
      const response = await getSecurityAlerts({ 
        page,
        ...params 
      });

      // Direct array response handling
      if (Array.isArray(response)) {
        setAlerts(response);
        return;
      }

      // Handle paginated response
      if (response.data) {
        setAlerts(response.data);
        // Update pagination if available
        if (response.meta || response.links) {
          setPagination({
            current_page: response.meta?.current_page || response.current_page,
            total: response.meta?.total || response.total,
            per_page: response.meta?.per_page || response.per_page,
            total_pages: response.meta?.last_page || response.last_page
          });
        }
      }

      setError(null);
    } catch (error) {
      console.error('Error fetching security alerts:', error);
      setError('Failed to fetch security alerts. Please try again.');
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAlerts(1);
  }, []);
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this security alert?')) {
      try {
        await deleteSecurityAlert(id);
        // Refresh the alerts list after successful deletion
        fetchAlerts(pagination.current_page);
      } catch (error) {
        console.error('Error deleting security alert:', error);
        alert('Failed to delete security alert. Please try again.');
      }
    }
  };
  
  const handleAddAlert = () => {
    router.push('/dashboard/it/add');
  };
  
  return (
    <DashboardLayout title="Security Alerts" description="Manage security alerts and incidents">
      <div className="mb-6 flex justify-between items-center">
  <h1 className="text-2xl font-semibold text-gray-800">Security Alerts</h1>
  <div className="flex space-x-4">
    <button
      onClick={() => router.push('/dashboard/it/create-user')}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
      Create User
    </button>
    <button
      onClick={handleAddAlert}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Add Alert
    </button>
  </div>
</div>
 
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
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
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <SecurityAlertList
          alerts={alerts}
          onDelete={handleDelete}
          pagination={pagination}
          onPageChange={(page) => fetchAlerts(page)}
        />
      )}
    </DashboardLayout>
  );
}