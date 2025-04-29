// src/app/dashboard/page.js
// src/app/dashboard/page.js
"use client";
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Link from 'next/link';
import api from '../../services/api';
import Cookies from 'js-cookie';
import { useAuth } from '@/context/AuthContext'; // Import useAuth
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const router = useRouter();
  
  // Properly use the useAuth hook
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  
  // Check authentication first
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      // If not authenticated, redirect to login
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);
  
  // Load user role from auth context on component mount
  useEffect(() => {
    const getUserData = () => {
      try {
        // Get from auth context
        if (user && user.role) {
          setUserRole(user.role);
          return;
        }
        
        // Fallback: try to get from cookie
        const userDataCookie = Cookies.get('user_data');
        if (userDataCookie) {
          try {
            const userData = JSON.parse(userDataCookie);
            if (userData && userData.role) {
              setUserRole(userData.role);
            }
          } catch (e) {
            console.error('Failed to parse user data cookie:', e);
          }
        }
      } catch (error) {
        console.error('Error getting user role:', error);
      }
    };
    
    getUserData();
  }, [user]);
  
  // Only fetch dashboard data if we're authenticated
  useEffect(() => {
    // Don't fetch if still checking authentication or not authenticated
    if (authLoading || !isAuthenticated) return;
    
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/dashboard');
        setDashboardData(response);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [isAuthenticated, authLoading]);
  
  // Don't render anything if still checking auth or not authenticated
  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
  // Define component visibility based on user role
  // Remove the '!userRole ||' part that was causing issues
  const canViewUserStats = userRole === 'Admin';
  const canViewEmployeeStats = ['Admin', 'HR'].includes(userRole);
  const canViewInventoryStats = ['Admin', 'Finance'].includes(userRole);
  const canViewOrderStats = ['Admin', 'Finance', 'Sales'].includes(userRole);
  const canViewFinanceStats = ['Admin', 'Finance'].includes(userRole);
  const canViewSecurityStats = ['Admin', 'IT'].includes(userRole);
  
  // Define quick action visibility based on user role
  // Remove the '!userRole ||' part that was causing issues
  const canAddEmployee = ['Admin', 'HR'].includes(userRole);
  const canAddProduct = ['Admin', 'Finance'].includes(userRole);
  const canCreateOrder = ['Admin', 'Finance', 'Sales'].includes(userRole);
  const canCreateBudget = ['Admin', 'Finance'].includes(userRole);
  
  return (
    <DashboardLayout title="Dashboard" description="System Overview">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Users - Only Admin can see */}
            {canViewUserStats && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Users</p>
                    <h3 className="text-xl font-bold text-gray-800">
                      {dashboardData?.user_stats?.total.toLocaleString() || 0}
                    </h3>
                  </div>
                </div>
              </div>
            )}
            
            {/* Total Employees - Admin and HR can see */}
            {canViewEmployeeStats && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Employees</p>
                    <h3 className="text-xl font-bold text-gray-800">
                      {dashboardData?.employee_stats?.total.toLocaleString() || 0}
                    </h3>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/dashboard/hr" className="text-sm text-purple-600 hover:text-purple-800">
                    View all employees →
                  </Link>
                </div>
              </div>
            )}
            
            {/* Total Products - Admin and Finance can see */}
            {canViewInventoryStats && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Products</p>
                    <h3 className="text-xl font-bold text-gray-800">
                      {dashboardData?.inventory_stats?.total_products.toLocaleString() || 0}
                    </h3>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/dashboard/inventory" className="text-sm text-purple-600 hover:text-purple-800">
                    View all products →
                  </Link>
                </div>
              </div>
            )}
            
            {/* Total Orders - Admin, Finance and Sales can see */}
            {canViewOrderStats && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <h3 className="text-xl font-bold text-gray-800">
                      {dashboardData?.order_stats?.total.toLocaleString() || 0}
                    </h3>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/dashboard/sales" className="text-sm text-purple-600 hover:text-purple-800">
                    View all orders →
                  </Link>
                </div>
              </div>
            )}
            
            {/* Active Budgets - Admin and Finance can see */}
            {canViewFinanceStats && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active Budgets</p>
                    <h3 className="text-xl font-bold text-gray-800">
                      {dashboardData?.finance_stats?.active_budgets.toLocaleString() || 0}
                    </h3>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/dashboard/finance" className="text-sm text-purple-600 hover:text-purple-800">
                    View all budgets →
                  </Link>
                </div>
              </div>
            )}
            
            {/* Security Alerts - Admin and IT can see */}
            {canViewSecurityStats && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-700 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Open Security Alerts</p>
                    <h3 className="text-xl font-bold text-gray-800">
                      {dashboardData?.security_stats?.open_alerts || 0}
                    </h3>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/dashboard/it" className="text-sm text-purple-600 hover:text-purple-800">
                    View all alerts →
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* Recent Orders - Admin, Finance and Sales can see */}
          {canViewOrderStats && (
            <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-800">Recent Orders</h2>
                <Link href="/dashboard/sales" className="text-sm text-purple-600 hover:text-purple-800">
                  View all
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      {/* <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dashboardData?.order_stats?.recent?.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.user?.name || 'Unknown'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`#`} className="text-purple-600 hover:text-purple-900">
                            View
                          </Link>
                        </td> */}
                      </tr>
                    ))}
                    {(!dashboardData?.order_stats?.recent || dashboardData.order_stats.recent.length === 0) && (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                          No recent orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Recent Security Alerts - Admin and IT can see */}
          {canViewSecurityStats && (
            <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-800">Recent Security Alerts</h2>
                <Link href="/dashboard/it" className="text-sm text-purple-600 hover:text-purple-800">
                  View all
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Alert ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Severity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      {/* <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dashboardData?.security_stats?.recent_alerts?.map((alert) => (
                      <tr key={alert.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{alert.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {alert.title || 'Unnamed Alert'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            alert.severity === 'critical' ? 'bg-red-100 text-red-800' : 
                            alert.severity === 'high' ? 'bg-orange-100 text-orange-800' : 
                            alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {alert.status.replace('_', ' ').charAt(0).toUpperCase() + alert.status.replace('_', ' ').slice(1)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {/* <Link href={`#`} className="text-purple-600 hover:text-purple-900">
                            View
                          </Link> */}
                        </td>
                      </tr>
                    ))}
                    {(!dashboardData?.security_stats?.recent_alerts || dashboardData.security_stats.recent_alerts.length === 0) && (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                          No recent security alerts found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Add Employee - Admin and HR can see */}
              {canAddEmployee && (
                <Link 
                  href="/dashboard/hr/add"
                  className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
                >
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Add Employee</span>
                </Link>
              )}
              
              {/* Add Product - Admin and Finance can see */}
              {canAddProduct && (
                <Link 
                  href="/dashboard/inventory/add"
                  className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                >
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Add Product</span>
                </Link>
              )}
              
              {/* Create Order - Admin, Finance and Sales can see */}
              {canCreateOrder && (
                <Link 
                  href="/dashboard/sales/add"
                  className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition"
                >
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Create Order</span>
                </Link>
              )}
              
              {/* Create Budget - Admin and Finance can see */}
              {canCreateBudget && (
                <Link 
                  href="/dashboard/finance/add"
                  className="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition"
                >
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Create Budget</span>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
