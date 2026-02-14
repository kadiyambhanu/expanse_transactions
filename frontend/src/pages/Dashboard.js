import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../context/TransactionContext';
import { formatCurrency, formatDate, getCategoryColor, getMonthName } from '../utils/formatters';
import { CATEGORY_ICONS } from '../utils/categories';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { FiTrendingUp, FiDollarSign, FiShoppingCart } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
  const { getDashboardSummary, loading } = useTransactions();
  const [summary, setSummary] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummary = async () => {
      const result = await getDashboardSummary();
      if (result.success) {
        setSummary(result.data);
      }
    };
    
    fetchSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !summary) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const categoryData = summary.categoryBreakdown.map(cat => ({
    name: cat._id,
    value: cat.total,
    count: cat.count
  }));

  const monthlyData = summary.monthlyTrend.map(month => ({
    name: `${getMonthName(month._id.month)} ${month._id.year}`,
    amount: month.total,
    transactions: month.count
  }));

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <button 
          className="add-transaction-btn"
          onClick={() => navigate('/transactions')}
        >
          + Add Transaction
        </button>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card total">
          <div className="card-icon">
            <FiDollarSign />
          </div>
          <div className="card-content">
            <h3>Total Expenses</h3>
            <p className="amount">{formatCurrency(summary.totalExpenses)}</p>
          </div>
        </div>

        <div className="summary-card transactions">
          <div className="card-icon">
            <FiShoppingCart />
          </div>
          <div className="card-content">
            <h3>Total Transactions</h3>
            <p className="amount">
              {summary.categoryBreakdown.reduce((acc, cat) => acc + cat.count, 0)}
            </p>
          </div>
        </div>

        <div className="summary-card categories">
          <div className="card-icon">
            <FiTrendingUp />
          </div>
          <div className="card-content">
            <h3>Categories</h3>
            <p className="amount">{summary.categoryBreakdown.length}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Category Breakdown */}
        <div className="chart-card">
          <h2>Expenses by Category</h2>
          {categoryData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getCategoryColor(entry.name)} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
              <div className="category-list">
                {summary.categoryBreakdown.map((cat) => (
                  <div key={cat._id} className="category-item">
                    <div className="category-info">
                      <span className="category-icon">{CATEGORY_ICONS[cat._id]}</span>
                      <span className="category-name">{cat._id}</span>
                    </div>
                    <div className="category-stats">
                      <span className="category-amount">{formatCurrency(cat.total)}</span>
                      <span className="category-count">({cat.count} transactions)</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <p>No expenses recorded yet</p>
            </div>
          )}
        </div>

        {/* Monthly Trend */}
        {monthlyData.length > 0 && (
          <div className="chart-card">
            <h2>Monthly Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="amount" fill="#667eea" name="Amount" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Recent Transactions */}
      <div className="recent-transactions">
        <div className="section-header">
          <h2>Recent Transactions</h2>
          <button 
            className="view-all-btn"
            onClick={() => navigate('/transactions')}
          >
            View All
          </button>
        </div>
        {summary.recentTransactions.length > 0 ? (
          <div className="transactions-list">
            {summary.recentTransactions.map((transaction) => (
              <div key={transaction._id} className="transaction-item">
                <div className="transaction-icon">
                  {CATEGORY_ICONS[transaction.category]}
                </div>
                <div className="transaction-details">
                  <h4>{transaction.title}</h4>
                  <p>{transaction.category} • {formatDate(transaction.date)}</p>
                </div>
                <div className="transaction-amount">
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No transactions yet. Start tracking your expenses!</p>
            <button 
              className="primary-btn"
              onClick={() => navigate('/transactions')}
            >
              Add Your First Transaction
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
