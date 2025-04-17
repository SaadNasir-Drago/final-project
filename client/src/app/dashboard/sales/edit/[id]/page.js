"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../../../components/layout/DashboardLayout';
import OrderForm from '../../../../../components/sales/OrderForm';
import { getOrderById, updateOrder } from '../../../../../services/orderService';

export default function EditOrderPage({ params }) {
  const router = useRouter();
  const { id } = React.use(params);
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await getOrderById(id);
        
        // Transform order data for the form
        const formattedOrder = {
          ...data,
          items: data.items.map(item => ({
            product_id: item.product_id.toString(),
            quantity: item.quantity,
            product_details: item.product,
            subtotal: item.unit_price * item.quantity
          }))
        };
        
        setOrder(formattedOrder);
        setError(null);
      } catch (error) {
        console.error(`Error fetching order with ID ${id}:`, error);
        setError('Failed to fetch order details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchOrder();
    }
  }, [id]);
  
  const handleSubmit = async (orderData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const updatedOrderData = {
        ...orderData,
        // Pass the total amount directly from the form
        total_amount: orderData.items.reduce((total, item) => total + item.subtotal, 0)
      };
      
      console.log('Order Data:', updatedOrderData);
      
      await updateOrder(id, updatedOrderData);
      
      // Redirect to orders list page on success
      router.push('/dashboard/sales');
    } catch (error) {
      console.error('Error updating order:', error);
      setError(error.response?.data?.message || 'Failed to update order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <DashboardLayout title="Edit Order" description="Edit order details">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (error && !order) {
    return (
      <DashboardLayout title="Edit Order" description="Edit order details">
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
    <DashboardLayout title="Edit Order" description="Edit order details">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-medium text-gray-800">
            Edit Order: {order?.order_number}
          </h1>
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
          <OrderForm 
            onSubmit={handleSubmit} 
            initialData={order} 
            isSubmitting={isSubmitting} 
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
