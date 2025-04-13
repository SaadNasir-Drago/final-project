import api from './api';

const ENDPOINT = '/budgets';

export const getTransactions = async (params = {}) => {
  try {
    return await api.get(ENDPOINT, { params });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const getTransactionById = async (id) => {
  try {
    return await api.get(`${ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error fetching transaction with ID ${id}:`, error);
    throw error;
  }
};

export const createTransaction = async (transactionData) => {
  try {
    return await api.post(ENDPOINT, transactionData);
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

export const updateTransaction = async (id, transactionData) => {
  try {
    return await api.put(`${ENDPOINT}/${id}`, transactionData);
  } catch (error) {
    console.error(`Error updating transaction with ID ${id}:`, error);
    throw error;
  }
};

export const deleteTransaction = async (id) => {
  try {
    return await api.delete(`${ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error deleting transaction with ID ${id}:`, error);
    throw error;
  }
};
