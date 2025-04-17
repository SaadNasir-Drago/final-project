// src/services/orderService.js
import api from './api';

const ENDPOINT = '/orders';

export const getOrders = async (params = {}) => {
  try {
    return await api.get(ENDPOINT, { params });
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getOrderById = async (id) => {
  try {
    return await api.get(`${ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error fetching order with ID ${id}:`, error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    return await api.post(ENDPOINT, orderData);
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const updateOrder = async (id, orderData) => {
  try {
    return await api.put(`${ENDPOINT}/${id}`, orderData);
  } catch (error) {
    console.error(`Error updating order with ID ${id}:`, error);
    throw error;
  }
};

export const deleteOrder = async (id) => {
  try {
    return await api.delete(`${ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error deleting order with ID ${id}:`, error);
    throw error;
  }
};
