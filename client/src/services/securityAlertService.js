import api from './api';

const ENDPOINT = '/security-alerts';

export const getSecurityAlerts = async (params = {}) => {
  try {
    const response = await api.get(ENDPOINT, { params });
    return response.data; // The entire pagination response
  } catch (error) {
    console.error('Error fetching security alerts:', error);
    throw error;
  }
};

export const getSecurityAlertById = async (id) => {
  try {
    console.log(`Fetching security alert with ID ${id}`);
    const response = await api.get(`${ENDPOINT}/${id}`);
    console.log('Raw API Response:', response);
    console.log('Response data:', response.data);
    
    if (!response.data) {
      throw new Error('No data received from API');
    }
    
    return response.data.data || response.data; // Try both possibilities
  } catch (error) {
    console.error(`Error fetching security alert with ID ${id}:`, error);
    throw error;
  }
};



export const createSecurityAlert = async (alertData) => {
  try {
    const response = await api.post(ENDPOINT, alertData);
    return response.data;
  } catch (error) {
    console.error('Error creating security alert:', error);
    throw error;
  }
};

export const updateSecurityAlert = async (id, alertData) => {
  try {
    const response = await api.patch(`${ENDPOINT}/${id}`, alertData); // Change from put to patch
    
    
    return response.data; // Match your Laravel response structure
  } catch (error) {
    console.error(`Error updating security alert with ID ${id}:`, error);
    throw new Error(error.response?.data?.message || 'Failed to update security alert');
  }
};


export const deleteSecurityAlert = async (id) => {
  try {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting security alert with ID ${id}:`, error);
    throw new Error(error.response?.data?.message || 'Failed to delete security alert');
  }
};
