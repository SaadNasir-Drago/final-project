// src/components/layout/Sidebar.js
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAuth } from '@/context/AuthContext'; // Import useAuth if available

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState('User');
  
  // Get auth context if available
  const auth = useAuth ? useAuth() : { user: null };
  
  // Load user role from cookie or auth context on component mount
  useEffect(() => {
    const getUserData = () => {
      try {
        // First try to get from auth context
        if (auth && auth.user && auth.user.role) {
          setUserRole(auth.user.role);
          setUserName(auth.user.name || 'User');
          return;
        }
        
        // Otherwise try to get from cookie
        const userDataCookie = Cookies.get('user_data');
        if (userDataCookie) {
          const userData = JSON.parse(userDataCookie);
          setUserRole(userData.role);
          setUserName(userData.name || 'User');
        }
      } catch (error) {
        console.error('Error getting user role:', error);
      }
    };
    
    getUserData();
  }, [auth]);
  
  // Define all navigation items with their access roles
  const allNavigation = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      roles: ['Admin', 'Finance', 'HR', 'IT', 'Sales'] // All roles can access dashboard
    },
    { 
      name: 'Sales', 
      href: '/dashboard/sales', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      roles: ['Admin', 'Finance', 'Sales'] // Only Admin, Finance and Sales can access
    },
    { 
      name: 'Inventory', 
      href: '/dashboard/inventory', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      roles: ['Admin', 'Finance'] // Only Admin and Finance can access
    },
    { 
      name: 'Finance', 
      href: '/dashboard/finance', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      roles: ['Admin', 'Finance'] // Only Admin and Finance can access
    },
    { 
      name: 'HR', 
      href: '/dashboard/hr', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      roles: ['Admin', 'HR'] // Only Admin and HR can access
    },
    { 
      name: 'IT', 
      href: '/dashboard/it', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      roles: ['Admin', 'IT'] // Only Admin and IT can access
    },
  ];
  
  // Filter navigation items based on user role
  const navigation = allNavigation.filter(item => {
    // If no role is set yet or user is Admin, show all items
    if (!userRole) return true;
    
    // Otherwise, check if user's role is in the allowed roles for this item
    return item.roles.includes(userRole);
  });
  
  return (
    <div className={`bg-white border-r border-gray-200 ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 ease-in-out flex flex-col h-screen`}>
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center">
          <div className="h-8 w-8 bg-purple-600 rounded-md flex items-center justify-center text-white font-bold">
            P
          </div>
          {!isCollapsed && (
            <span className="ml-2 text-lg font-semibold text-gray-800">Pharmacy ERP</span>
          )}
        </Link>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          {isCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            
            return (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  className={`flex items-center px-2 py-2 rounded-md ${
                    isActive 
                      ? 'bg-purple-50 text-purple-700' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className={`${isActive ? 'text-purple-700' : 'text-gray-400'}`}>
                    {item.icon}
                  </div>
                  {!isCollapsed && (
                    <span className="ml-3 text-sm font-medium">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* User Profile */}
      <div className="border-t border-gray-200 p-4">
        <Link 
          href="/profile"
          className="flex items-center"
        >
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          {!isCollapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">
                {userName}
                {userRole && (
                  <span className="text-xs text-gray-500 block">{userRole}</span>
                )}
              </p>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
