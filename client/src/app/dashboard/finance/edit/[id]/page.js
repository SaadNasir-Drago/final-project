"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../../../components/layout/DashboardLayout';
import TransactionForm from '../../../../../components/finance/TransactionForm';
import { getTransactionById, updateTransaction } from '../../../../../services/transactionService';

export default function EditTransactionPage({ params }) {
  const router = useRouter();
  const { id } = React.use(params);
  
  const [transaction, setTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setIsLoading(true);
        const data = await getTransactionById(id);
        setTransaction(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching transaction:', error);
        setError('Failed to load transaction data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTransaction();
  }, [id]);
  
  const handleSubmit = async (transactionData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      await updateTransaction(id, transactionData);
      
      // Redirect to transactions list page on success
      router.push('/dashboard/finance');
    } catch (error) {
      console.error('Error updating transaction:', error);
      setError(error.message || 'Failed to update transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <DashboardLayout title="Edit Transaction" description="Edit transaction information">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (error && !transaction) {
    return (
      <DashboardLayout title="Edit Transaction" description="Edit transaction information">
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
    <DashboardLayout title="Edit Transaction" description="Edit transaction information">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-medium text-gray-800">Edit Transaction</h1>
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
          <TransactionForm 
            initialData={transaction} 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
