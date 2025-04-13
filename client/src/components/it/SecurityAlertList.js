import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import Pagination from '../../components/common/Pagination';

export default function SecurityAlertList({ alerts = [], onDelete, pagination, onPageChange, isLoading = false }) {
  const getSeverityColor = (severity) => {
    const colors = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    return colors[severity?.toLowerCase()] || colors.low;
  };

  const getStatusColor = (status) => {
    const colors = {
      open: 'bg-gray-100 text-gray-800',
      in_progress: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-purple-100 text-purple-800'
    };
    return colors[status?.toLowerCase()] || colors.open;
  };

  const formatStatus = (status) => {
    if (!status) return 'Open';
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return 'Invalid date';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-md p-6 text-center text-gray-500">
        Loading security alerts...
      </div>
    );
  }

  // Empty state with more detailed message
  if (!Array.isArray(alerts) || alerts.length === 0) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="p-6 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Security Alerts Found</h3>
          <p className="text-gray-500 mb-4">There are currently no security alerts to display.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {alerts.map((alert) => (
          <li key={alert.id} className="hover:bg-gray-50">
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {alert.title || 'Untitled Alert'}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      {alert.severity && (
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1).toLowerCase()}
                        </p>
                      )}
                      {alert.status && (
                        <p className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(alert.status)}`}>
                          {formatStatus(alert.status)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {alert.description || 'No description provided'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    <span className="truncate">Reported by: {alert.reported_by || 'N/A'}</span>
                  </p>
                  {alert.assigned_to && (
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      <span className="truncate">Assigned to: {alert.assigned_to}</span>
                    </p>
                  )}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p className="flex items-center space-x-2">
                    <span>{formatDate(alert.created_at)}</span>
                    <Link
                      href={`/dashboard/it/edit/${alert.id}`}
                      className="text-indigo-600 hover:text-indigo-900 ml-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => onDelete(alert.id)}
                      className="text-red-600 hover:text-red-900 ml-2"
                      type="button"
                    >
                      Delete
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      
      {pagination && pagination.total > pagination.per_page && (
        <div className="px-4 py-3 border-t border-gray-200 sm:px-6">
          <Pagination
            currentPage={pagination.current_page}
            totalPages={Math.ceil(pagination.total / pagination.per_page)}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}