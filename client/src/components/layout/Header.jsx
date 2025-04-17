"use client";
import React from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext'; // Add this import!

const Header = ({ title = "Dashboard", description = "Welcome to Pharmacy ERP" }) => {
  // Move the useRouter hook inside the component
  const router = useRouter();
  const { logout } = useAuth();

  const handleSignOut = () => {
    // Use the logout function from AuthContext if available
    if (logout) {
      logout(); // This will handle cookie removal and redirect
    } else {
      // Fallback implementation
      console.log("User signed out");
      // Clear auth cookies
      Cookies.remove('user_data');
      Cookies.remove('token');
      // Redirect to login
      router.push("/login");
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-purple-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <h1 className="ml-2 text-lg font-medium">{title}</h1>
        <p className="ml-2 text-sm text-gray-500 hidden md:block">{description}</p>
      </div>

      <div className="flex items-center space-x-4">

        {/* Sign Out Button */}
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Header;
