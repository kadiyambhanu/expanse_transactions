import React, { useEffect, useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import { CATEGORIES, CATEGORY_ICONS } from '../utils/categories';
import { FiSearch, FiFilter, FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import TransactionModal from '../components/TransactionModal';
import './Transactions.css';

const Transactions = () => {
  const { 
    transactions, 
    loading, 
    pagination, 
    fetchTransactions, 
    deleteTransaction 
  } = useTransactions();

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    category: '',
    startDate: '',
    endDate: '',
    minAmount: '',
    maxAmount: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const [showFilters, setShowFilters] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchTransactions(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
      page: 1 // Reset to first page when filters change
    });
  };

  const handleSearch = (e) => {
    handleFilterChange('search', e.target.value);
  };

  const clearFilters = () => {
    setFilters({
      page: 1,
      limit: 10,
      search: '',
      category: '',
      startDate: '',
      endDate: '',
      minAmount: '',
      maxAmount: '',
      sortBy: 'date',
      sortOrder: 'desc'
    });
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddTransaction = () => {
    setSelectedTransaction(null);
    setModalOpen(true);
  };

  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setModalOpen(true);
  };

  const handleDeleteTransaction = async (id) => {
    const result = await deleteTransaction(id);
    if (result.success) {
      setDeleteConfirm(null);
      fetchTransactions(filters);
    }
  };

  const handleModalClose = (shouldRefresh) => {
    setModalOpen(false);
    setSelectedTransaction(null);
    if (shouldRefresh) {
      fetchTransactions(filters);
    }
  };

  const hasActiveFilters = filters.search || filters.category || filters.startDate || 
                          filters.endDate || filters.minAmount || filters.maxAmount;

  return (
    <div className="transactions-page">
      <div className="page-header">
        <h1>Transaction Explorer</h1>
        <button className="add-btn" onClick={handleAddTransaction}>
          <FiPlus /> Add Transaction
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="search-filter-bar">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={handleSearch}
          />
        </div>
        
        <button 
          className={`filter-toggle ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <FiFilter /> Filters
        </button>

        {hasActiveFilters && (
          <button className="clear-filters" onClick={clearFilters}>
            <FiX /> Clear Filters
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Start Date</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>End Date</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Min Amount</label>
            <input
              type="number"
              placeholder="0"
              value={filters.minAmount}
              onChange={(e) => handleFilterChange('minAmount', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Max Amount</label>
            <input
              type="number"
              placeholder="10000"
              value={filters.maxAmount}
              onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="title">Title</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Order</label>
            <select
              value={filters.sortOrder}
              onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      )}

      {/* Results Summary */}
      {!loading && (
        <div className="results-summary">
          Showing {transactions.length} of {pagination.total} transactions
        </div>
      )}

      {/* Transactions List */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading transactions...</p>
        </div>
      ) : transactions.length > 0 ? (
        <>
          <div className="transactions-grid">
            {transactions.map((transaction) => (
              <div key={transaction._id} className="transaction-card">
                <div className="card-header">
                  <div className="transaction-icon">
                    {CATEGORY_ICONS[transaction.category]}
                  </div>
                  <div className="transaction-info">
                    <h3>{transaction.title}</h3>
                    <span className="category-badge">{transaction.category}</span>
                  </div>
                  <div className="transaction-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEditTransaction(transaction)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => setDeleteConfirm(transaction._id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="amount-display">
                    {formatCurrency(transaction.amount)}
                  </div>
                  <div className="date-display">
                    {formatDate(transaction.date)}
                  </div>
                  {transaction.notes && (
                    <div className="notes-display">
                      {transaction.notes}
                    </div>
                  )}
                </div>

                {/* Delete Confirmation */}
                {deleteConfirm === transaction._id && (
                  <div className="delete-confirm">
                    <p>Delete this transaction?</p>
                    <div className="confirm-actions">
                      <button 
                        className="confirm-yes"
                        onClick={() => handleDeleteTransaction(transaction._id)}
                      >
                        Yes
                      </button>
                      <button 
                        className="confirm-no"
                        onClick={() => setDeleteConfirm(null)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                disabled={pagination.page === 1}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                Previous
              </button>
              
              <div className="page-numbers">
                {[...Array(pagination.pages)].map((_, index) => {
                  const pageNum = index + 1;
                  // Show first, last, current, and adjacent pages
                  if (
                    pageNum === 1 ||
                    pageNum === pagination.pages ||
                    Math.abs(pageNum - pagination.page) <= 1
                  ) {
                    return (
                      <button
                        key={pageNum}
                        className={`page-btn ${pageNum === pagination.page ? 'active' : ''}`}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    pageNum === pagination.page - 2 ||
                    pageNum === pagination.page + 2
                  ) {
                    return <span key={pageNum} className="page-ellipsis">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                className="page-btn"
                disabled={pagination.page === pagination.pages}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h2>No transactions found</h2>
          <p>
            {hasActiveFilters 
              ? 'Try adjusting your filters or search terms'
              : 'Start tracking your expenses by adding your first transaction'
            }
          </p>
          <button className="primary-btn" onClick={handleAddTransaction}>
            <FiPlus /> Add Transaction
          </button>
        </div>
      )}

      {/* Transaction Modal */}
      {modalOpen && (
        <TransactionModal
          transaction={selectedTransaction}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Transactions;
