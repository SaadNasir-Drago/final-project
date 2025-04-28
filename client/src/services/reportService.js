// services/reportService.js
import api from './api';

export const getProductReport = async (params = {}) => {
  try {
    console.log('Calling API endpoint:', '/reports/products', 'with params:', params);
    return await api.get('/reports/products', { params });
  } catch (error) {
    console.error('Error fetching product report:', error);
    console.error('Error details:', error.response ? error.response.data : error.message);
    throw error;
  }
};
