// src/components/layout/DashboardLayout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children, title = "Dashboard", description = "Welcome to Pharmacy ERP" }) => {
  return (
    <div className="bg-gray-50 flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} description={description} />
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
