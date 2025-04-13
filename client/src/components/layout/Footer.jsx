// src/components/layout/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 p-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Pharmacy ERP. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="text-sm text-gray-600 hover:text-purple-600">Privacy Policy</a>
          <a href="#" className="text-sm text-gray-600 hover:text-purple-600">Terms of Service</a>
          <a href="#" className="text-sm text-gray-600 hover:text-purple-600">Contact Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
