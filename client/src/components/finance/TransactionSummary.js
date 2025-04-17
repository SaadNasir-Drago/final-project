import React from 'react';

export default function TransactionSummary({ summary }) {
  if (!summary) {
    return (
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <p className="text-gray-500">Loading financial summary...</p>
      </div>
    );
  }

  const {
    total_income,
    total_expenses,
    net_profit,
    expenses_by_category,
    income_by_category,
    pending_transactions
  } = summary;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Get top expense categories
  const topExpenseCategories = Object.entries(expenses_by_category || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // Get top income categories
  const topIncomeCategories = Object.entries(income_by_category || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Financial Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Income Card */}
        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
          <h3 className="text-sm font-medium text-green-800">Total Income</h3>
          <p className="mt-2 text-2xl font-semibold text-green-900">
            {formatCurrency(total_income || 0)}
          </p>
        </div>
        
        {/* Expenses Card */}
        <div className="bg-red-50 rounded-lg p-4 border border-red-100">
          <h3 className="text-sm font-medium text-red-800">Total Expenses</h3>
          <p className="mt-2 text-2xl font-semibold text-red-900">
            {formatCurrency(total_expenses || 0)}
          </p>
        </div>
        
        {/* Net Profit Card */}
        <div className={`${net_profit >= 0 ? 'bg-blue-50 border-blue-100' : 'bg-orange-50 border-orange-100'} rounded-lg p-4 border`}>
          <h3 className={`text-sm font-medium ${net_profit >= 0 ? 'text-blue-800' : 'text-orange-800'}`}>
            Net Profit
          </h3>
          <p className={`mt-2 text-2xl font-semibold ${net_profit >= 0 ? 'text-blue-900' : 'text-orange-900'}`}>
            {formatCurrency(net_profit || 0)}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Expense Categories */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Top Expense Categories</h3>
          {topExpenseCategories.length > 0 ? (
            <ul className="space-y-2">
              {topExpenseCategories.map(([category, amount]) => (
                <li key={category} className="flex justify-between">
                  <span className="text-gray-600">{category}</span>
                  <span className="font-medium text-gray-900">{formatCurrency(amount)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No expense data available</p>
          )}
        </div>
        
        {/* Top Income Categories */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Top Income Categories</h3>
          {topIncomeCategories.length > 0 ? (
            <ul className="space-y-2">
              {topIncomeCategories.map(([category, amount]) => (
                <li key={category} className="flex justify-between">
                  <span className="text-gray-600">{category}</span>
                  <span className="font-medium text-gray-900">{formatCurrency(amount)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No income data available</p>
          )}
        </div>
      </div>
      
      {/* Pending Transactions */}
      {pending_transactions > 0 && (
        <div className="mt-6 bg-yellow-50 border border-yellow-100 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Attention needed
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  You have {pending_transactions} pending {pending_transactions === 1 ? 'transaction' : 'transactions'} that require attention.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
