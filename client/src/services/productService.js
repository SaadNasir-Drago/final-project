// src/services/productService.js
import api from './api';

const ENDPOINT = '/products';

export const getProducts = async (params = {}) => {
  try {
    return await api.get(ENDPOINT, { params });
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    return await api.get(`${ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    return await api.post(ENDPOINT, productData);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    return await api.put(`${ENDPOINT}/${id}`, productData);
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    return await api.delete(`${ENDPOINT}/${id}`);
  } catch (error) {
    throw error;
  }
};
