// components/finance/ProductReportTable.jsx
import React from "react";

export default function ProductReportTable({ reportData }) {
  if (!reportData || reportData.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg">
        <p className="text-gray-500">
          No data available for the selected criteria.
        </p>
      </div>
    );
  }

  // Fixed calculation: ensure numeric values
  const totalSum = reportData.reduce((sum, item) => {
    // Convert to number and add
    return sum + (parseFloat(item.total) || 0);
  }, 0);

  // Format numbers with 2 decimal places
  const formatCurrency = (value) => {
    return Number(value).toFixed(2);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Item Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Quantity
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Total
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reportData.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${formatCurrency(item.price)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${formatCurrency(item.total)}
              </td>
            </tr>
          ))}
          <tr className="bg-gray-50">
            <td
              colSpan="3"
              className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right"
            >
              Total:
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              ${formatCurrency(totalSum)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
