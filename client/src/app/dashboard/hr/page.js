"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import EmployeeList from '../../../components/hr/EmployeeList';
import { getEmployees, deleteEmployee } from '../../../services/employeeService';

export default function HRPage() {
  const router = useRouter();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total: 0,
    per_page: 10,
    total_pages: 0
  });
  
  const fetchEmployees = async (page = 1, params = {}) => {
    try {
      setLoading(true);
      const response = await getEmployees({ page, ...params });
      
      setEmployees(response.data || []);
      setPagination({
        current_page: response.current_page || 1,
        total: response.total || 0,
        per_page: response.per_page || 10,
        total_pages: response.last_page || 0
      });
      
      setError(null);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError('Failed to fetch employees. Please try again.');
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchEmployees(1, searchParams);
  }, []);
  
  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      // Refresh the employee list
      fetchEmployees(pagination.current_page, searchParams);
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  };
  
  const handleAddEmployee = () => {
    router.push('/dashboard/hr/add');
  };
  
  return (
    <DashboardLayout title="HR Management" description="Manage employees and human resources">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Employees</h1>
        <button
          onClick={handleAddEmployee}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Employee
        </button>
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
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <EmployeeList employees={employees} onDelete={handleDelete} />
      )}
    </DashboardLayout>
  );
}
