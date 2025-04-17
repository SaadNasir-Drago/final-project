// src/services/customerService.js
import api from './api';

// Assuming customers are part of the sales module or have their own endpoint
// Adjust the endpoints based on your actual API structure
const ENDPOINT = '/customers'; // Change this to match your API

export const getCustomers = async () => {
  try {
    return await api.get(ENDPOINT);
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const getCustomerById = async (id) => {
  try {
    return await api.get(`${ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error fetching customer with ID ${id}:`, error);
    throw error;
  }
};

export const createCustomer = async (customerData) => {
  try {
    return await api.post(ENDPOINT, customerData);
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

export const updateCustomer = async (id, customerData) => {
  try {
    return await api.put(`${ENDPOINT}/${id}`, customerData);
  } catch (error) {
    console.error(`Error updating customer with ID ${id}:`, error);
    throw error;
  }
};

export const deleteCustomer = async (id) => {
  try {
    return await api.delete(`${ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error deleting customer with ID ${id}:`, error);
    throw error;
  }
};

export const uploadCustomerPhoto = async (id, photoFile) => {
  try {
    const formData = new FormData();
    formData.append('photo', photoFile);
    
    return await api.post(`${ENDPOINT}/${id}/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error(`Error uploading photo for customer with ID ${id}:`, error);
    throw error;
  }
};
