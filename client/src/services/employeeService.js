// src/services/employeeService.js
import api from './api';

const ENDPOINT = '/employees';

export const getEmployees = async (params = {}) => {
  try {
    return await api.get(ENDPOINT, { params });
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const getEmployeeById = async (id) => {
  try {
    return await api.get(`${ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error fetching employee with ID ${id}:`, error);
    throw error;
  }
};

export const createEmployee = async (employeeData) => {
  try {
    return await api.post(ENDPOINT, employeeData);
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

export const updateEmployee = async (id, employeeData) => {
  try {
    return await api.put(`${ENDPOINT}/${id}`, employeeData);
  } catch (error) {
    console.error(`Error updating employee with ID ${id}:`, error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    return await api.delete(`${ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error deleting employee with ID ${id}:`, error);
    throw error;
  }
};
