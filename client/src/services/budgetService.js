// src/services/budgetService.js
import api from './api';

const ENDPOINT = '/budgets';

export const getBudgets = async (params = {}) => {
  try {
    return await api.get(ENDPOINT, { params });
  } catch (error) {
    console.error('Error fetching budgets:', error);
    throw error;
  }
};

export const getBudgetById = async (id) => {
  try {
    return await api.get(`${ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error fetching budget with ID ${id}:`, error);
    throw error;
  }
};

export const createBudget = async (budgetData) => {
  try {
    return await api.post(ENDPOINT, budgetData);
  } catch (error) {
    console.error('Error creating budget:', error);
    throw error;
  }
};

export const updateBudget = async (id, budgetData) => {
  try {
    return await api.put(`${ENDPOINT}/${id}`, budgetData);
  } catch (error) {
    console.error(`Error updating budget with ID ${id}:`, error);
    throw error;
  }
};

export const deleteBudget = async (id) => {
  try {
    return await api.delete(`${ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error deleting budget with ID ${id}:`, error);
    throw error;
  }
};
