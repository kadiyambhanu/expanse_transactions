// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Format date for input
export const formatDateForInput = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Get category color
export const getCategoryColor = (category) => {
  const colors = {
    Food: '#FF6B6B',
    Transport: '#4ECDC4',
    Rent: '#45B7D1',
    Entertainment: '#FFA07A',
    Healthcare: '#98D8C8',
    Shopping: '#F7DC6F',
    Utilities: '#BB8FCE',
    Education: '#85C1E2',
    Other: '#95A5A6'
  };
  return colors[category] || colors.Other;
};

// Get month name
export const getMonthName = (month) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return months[month - 1] || '';
};
