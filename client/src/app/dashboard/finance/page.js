// pages/dashboard/finance/index.jsx
"use client";
import React, { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import ProductReportForm from '../../../components/finance/ProductReportForm';
import ProductReportTable from '../../../components/finance/ProductReportTable';
import { getProductReport } from '../../../services/reportService';

export default function FinancePage() {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [reportParams, setReportParams] = useState({});
  
  const handleGenerateReport = async (params) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getProductReport(params);
      setReportData(response.data || []);
      setReportParams(params);
      setReportGenerated(true);
    } catch (error) {
      console.error('Error generating report:', error);
      setError('Failed to generate report. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <DashboardLayout title="Financial Reports" description="Generate financial reports based on product data">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Product Financial Report</h2>
        <p className="text-gray-600 mt-1">Generate reports based on product sales for a specific date range</p>
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
      
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">Report Filters</h3>
        </div>
        <div className="p-6">
          <ProductReportForm onSubmit={handleGenerateReport} isSubmitting={loading} />
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : reportGenerated && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-800">
              Report Results: {reportParams.startDate} to {reportParams.endDate}
            </h3>
            <button 
              onClick={() => window.print()}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print
            </button>
          </div>
          <div className="p-6">
            <ProductReportTable reportData={reportData} />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
