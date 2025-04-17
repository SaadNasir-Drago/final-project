"use client";
import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/productService';

const OrderForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    items: initialData?.items || [{ product_id: '', quantity: 1, product_details: null }],
    notes: initialData?.notes || '',
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts({ active: true });
        setProducts(response.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    
    if (field === 'product_id') {
      const selectedProduct = products.find(p => p.id === parseInt(value));
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value, // Ensure this is treated as a string
        product_details: selectedProduct
      };
    } else {
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value
      };
    }
    
    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };
  
  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { product_id: '', quantity: 1, product_details: null }
      ],
    }));
  };
  
  const removeItem = (index) => {
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    
    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };
  
  const calculateTotal = () => {
    return formData.items.reduce((total, item) => {
      const product = item.product_details;
      if (product && item.quantity) {
        return total + (parseFloat(product.price) * parseInt(item.quantity));
      }
      return total;
    }, 0);
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (formData.items.length === 0) {
      newErrors.items = 'At least one item is required';
    } else {
      formData.items.forEach((item, index) => {
        if (!item.product_id) {
          newErrors[`items[${index}].product_id`] = 'Product is required';
        }
        if (!item.quantity || item.quantity < 1) {
          newErrors[`items[${index}].quantity`] = 'Quantity must be at least 1';
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Prepare data for submission
      const orderData = {
        items: formData.items.map(item => ({
          product_id: item.product_id,
          quantity: parseInt(item.quantity),
          subtotal: parseFloat(item.product_details?.price) * parseInt(item.quantity) // Calculate subtotal
        })),
        notes: formData.notes
      };
      
      onSubmit(orderData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order Items */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
        
        {formData.items.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-4 mb-4 p-4 border border-gray-200 rounded-md">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product
              </label>
              <select
                value={item.product_id}
                onChange={(e) => handleItemChange(index, 'product_id', e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                disabled={loading}
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} - ${parseFloat(product.price).toFixed(2)} ({product.quantity} in stock)
                  </option>
                ))}
              </select>
              {errors[`items[${index}].product_id`] && (
                <p className="mt-1 text-sm text-red-600">{errors[`items[${index}].product_id`]}</p>
              )}
            </div>
            
            <div className="w-full md:w-32">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
              {errors[`items[${index}].quantity`] && (
                <p className="mt-1 text-sm text-red-600">{errors[`items[${index}].quantity`]}</p>
              )}
            </div>
            
            <div className="w-full md:w-32 flex items-end">
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="mb-1 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        
        {errors.items && (
          <p className="mt-1 text-sm text-red-600">{errors.items}</p>
        )}
        
        <button
          type="button"
          onClick={addItem}
          className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Item
        </button>
      </div>
      
      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Order Summary</h3>
        <div className="flex justify-between items-center">
          <span className="font-medium">Total Amount:</span>
          <span className="text-xl font-bold">${calculateTotal().toFixed(2)}</span>
        </div>
      </div>
      
      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows="3"
          value={formData.notes}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          placeholder="Add any special instructions or notes for this order"
        ></textarea>
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          {initialData ? 'Update Order' : 'Create Order'}
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
