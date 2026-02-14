import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const TransactionContext = createContext();

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  const fetchTransactions = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });

      const response = await axios.get(`/api/transactions?${params.toString()}`);
      setTransactions(response.data.data);
      setPagination(response.data.pagination);
      setLoading(false);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch transactions';
      setError(message);
      setLoading(false);
      return { success: false, message };
    }
  };

  const getTransaction = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/transactions/${id}`);
      setLoading(false);
      return { success: true, data: response.data.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch transaction';
      setError(message);
      setLoading(false);
      return { success: false, message };
    }
  };

  const createTransaction = async (transactionData) => {
    try {
      setError(null);
      const response = await axios.post('/api/transactions', transactionData);
      return { success: true, data: response.data.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create transaction';
      setError(message);
      return { success: false, message };
    }
  };

  const updateTransaction = async (id, transactionData) => {
    try {
      setError(null);
      const response = await axios.put(`/api/transactions/${id}`, transactionData);
      return { success: true, data: response.data.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update transaction';
      setError(message);
      return { success: false, message };
    }
  };

  const deleteTransaction = async (id) => {
    try {
      setError(null);
      await axios.delete(`/api/transactions/${id}`);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete transaction';
      setError(message);
      return { success: false, message };
    }
  };

  const getDashboardSummary = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/transactions/dashboard/summary');
      setLoading(false);
      return { success: true, data: response.data.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch dashboard summary';
      setError(message);
      setLoading(false);
      return { success: false, message };
    }
  };

  const value = {
    transactions,
    loading,
    error,
    pagination,
    fetchTransactions,
    getTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getDashboardSummary
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
